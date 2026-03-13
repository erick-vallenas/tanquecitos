import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { generateOrderNumber } from '@/lib/generateOrderNumber'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, shipping, paymentMethod, subtotal, shippingCost, total } = body

    if (!items?.length || !shipping || !paymentMethod) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    // Find or create customer
    let customer: any = null
    const existingCustomers = await payload.find({
      collection: 'customers',
      where: { email: { equals: shipping.email } },
      limit: 1,
    })

    if (existingCustomers.docs.length > 0) {
      customer = existingCustomers.docs[0]
    } else {
      customer = await payload.create({
        collection: 'customers',
        data: {
          email: shipping.email,
          password: `temp_${Date.now()}`,
          name: shipping.name,
          phone: shipping.phone,
          dni: shipping.dni,
          addresses: [
            {
              label: 'Principal',
              address: shipping.address,
              district: shipping.district,
              city: shipping.city,
              reference: shipping.reference || '',
              isDefault: true,
            },
          ],
        },
      })
    }

    // Create order
    const order = await payload.create({
      collection: 'orders',
      data: {
        orderNumber: generateOrderNumber(),
        customer: customer.id,
        items: items.map((item: any) => ({
          product: item.productId,
          variant: item.variant || '',
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        subtotal,
        shippingCost,
        total,
        status: 'pending',
        paymentMethod,
        shippingAddress: {
          name: shipping.name,
          phone: shipping.phone,
          address: shipping.address,
          district: shipping.district,
          city: shipping.city,
          reference: shipping.reference || '',
        },
      },
    })

    // Update stock
    for (const item of items) {
      const product = await payload.findByID({ collection: 'products', id: item.productId })
      if (product) {
        const newStock = Math.max(0, (product as any).stock - item.quantity)
        await payload.update({
          collection: 'products',
          id: item.productId,
          data: { stock: newStock } as any,
        })
      }
    }

    return NextResponse.json({ success: true, orderNumber: (order as any).orderNumber, orderId: order.id })
  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Error al crear el pedido' }, { status: 500 })
  }
}
