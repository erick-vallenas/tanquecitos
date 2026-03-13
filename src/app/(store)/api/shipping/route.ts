import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const zones = await payload.find({
      collection: 'shipping-zones',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 100,
    })

    return NextResponse.json({ zones: zones.docs })
  } catch {
    return NextResponse.json({ zones: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { district, subtotal } = await req.json()
    const payload = await getPayloadClient()

    const zones = await payload.find({
      collection: 'shipping-zones',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 100,
    })

    let matchedZone = null
    for (const zone of zones.docs as any[]) {
      const districts = zone.districts.split('\n').map((d: string) => d.trim().toLowerCase())
      if (districts.includes(district.trim().toLowerCase())) {
        matchedZone = zone
        break
      }
    }

    if (!matchedZone) {
      return NextResponse.json({ cost: null, message: 'Distrito no disponible para envío' })
    }

    const cost = matchedZone.freeShippingMinimum && subtotal >= matchedZone.freeShippingMinimum
      ? 0
      : matchedZone.cost

    return NextResponse.json({
      cost,
      zoneName: matchedZone.name,
      estimatedDays: matchedZone.estimatedDays,
      freeShippingMinimum: matchedZone.freeShippingMinimum,
    })
  } catch {
    return NextResponse.json({ cost: null, message: 'Error calculando envío' })
  }
}
