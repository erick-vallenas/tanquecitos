import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding database...')

  // Create admin user
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@tanquecitos.com',
        password: 'admin123',
        name: 'Admin',
        role: 'admin',
      },
    })
    console.log('✅ Admin user created (admin@tanquecitos.com / admin123)')
  } catch {
    console.log('ℹ️ Admin user already exists')
  }

  // Create categories
  const categoriesData = [
    { name: 'Arneses', slug: 'arneses', description: 'Arneses resistentes para razas grandes', order: 1 },
    { name: 'Collares', slug: 'collares', description: 'Collares de alta calidad y resistencia', order: 2 },
    { name: 'Correas', slug: 'correas', description: 'Correas fuertes y cómodas', order: 3 },
    { name: 'Ropa', slug: 'ropa', description: 'Ropa para mascotas grandes', order: 4 },
    { name: 'Juguetes', slug: 'juguetes', description: 'Juguetes resistentes para mordidas fuertes', order: 5 },
    { name: 'Camas', slug: 'camas', description: 'Camas extra grandes y cómodas', order: 6 },
    { name: 'Alimentación', slug: 'alimentacion', description: 'Platos y accesorios de alimentación', order: 7 },
    { name: 'Higiene', slug: 'higiene', description: 'Productos de limpieza y cuidado', order: 8 },
  ]

  const categoryMap: Record<string, number> = {}
  for (const cat of categoriesData) {
    try {
      const created = await payload.create({
        collection: 'categories',
        data: { ...cat, isActive: true },
      })
      categoryMap[cat.slug] = Number(created.id)
      console.log(`✅ Category: ${cat.name}`)
    } catch {
      const existing = await payload.find({ collection: 'categories', where: { slug: { equals: cat.slug } }, limit: 1 })
      if (existing.docs[0]) categoryMap[cat.slug] = Number(existing.docs[0].id)
      console.log(`ℹ️ Category ${cat.name} already exists`)
    }
  }

  // Create products
  const productsData = [
    {
      name: 'Arnés Táctico XL para Pitbull',
      slug: 'arnes-tactico-xl-pitbull',
      shortDescription: 'Arnés táctico extra resistente con asa de agarre. Ideal para Pitbulls y American Bullies.',
      price: 89.90,
      compareAtPrice: 119.90,
      stock: 25,
      categories: [categoryMap['arneses']],
      tags: ['featured', 'sale', 'bestseller'],
      petSizes: ['L', 'XL', 'XXL'],
      sku: 'ARN-TAC-XL-001',
    },
    {
      name: 'Collar de Nylon Reforzado',
      slug: 'collar-nylon-reforzado',
      shortDescription: 'Collar de nylon con hebilla metálica. Resistente a tirones fuertes.',
      price: 45.00,
      stock: 40,
      categories: [categoryMap['collares']],
      tags: ['featured', 'new'],
      petSizes: ['L', 'XL'],
      sku: 'COL-NYL-REF-001',
    },
    {
      name: 'Correa Anti-Tirón para Razas Grandes',
      slug: 'correa-anti-tiron-razas-grandes',
      shortDescription: 'Correa con sistema anti-tirón y agarre acolchado. Para paseos seguros.',
      price: 65.00,
      compareAtPrice: 79.90,
      stock: 30,
      categories: [categoryMap['correas']],
      tags: ['featured', 'sale'],
      petSizes: ['L', 'XL', 'XXL'],
      sku: 'COR-AT-RG-001',
    },
    {
      name: 'Polera Abrigadora Talla XXL',
      slug: 'polera-abrigadora-xxl',
      shortDescription: 'Polera abrigadora de algodón para mascotas extra grandes. Ideal para invierno.',
      price: 55.00,
      stock: 15,
      categories: [categoryMap['ropa']],
      tags: ['new'],
      petSizes: ['XL', 'XXL'],
      sku: 'ROP-POL-XXL-001',
    },
    {
      name: 'Juguete Mordedor Indestructible',
      slug: 'juguete-mordedor-indestructible',
      shortDescription: 'Juguete de caucho natural ultra resistente. Para mascotas que muerden fuerte.',
      price: 35.00,
      stock: 50,
      categories: [categoryMap['juguetes']],
      tags: ['featured', 'bestseller'],
      petSizes: ['L', 'XL', 'XXL'],
      sku: 'JUG-MOR-IND-001',
    },
    {
      name: 'Cama Ortopédica XL',
      slug: 'cama-ortopedica-xl',
      shortDescription: 'Cama con espuma ortopédica de alta densidad. Para mascotas de +30kg.',
      price: 189.00,
      compareAtPrice: 229.00,
      stock: 10,
      categories: [categoryMap['camas']],
      tags: ['featured', 'sale'],
      petSizes: ['XL', 'XXL'],
      sku: 'CAM-ORT-XL-001',
    },
    {
      name: 'Plato Elevado Doble Acero Inoxidable',
      slug: 'plato-elevado-doble-acero',
      shortDescription: 'Plato elevado doble de acero inoxidable con base antideslizante.',
      price: 75.00,
      stock: 20,
      categories: [categoryMap['alimentacion']],
      tags: ['new'],
      petSizes: ['L', 'XL'],
      sku: 'ALI-PLA-DOB-001',
    },
    {
      name: 'Arnés Deportivo con Reflectante',
      slug: 'arnes-deportivo-reflectante',
      shortDescription: 'Arnés deportivo con bandas reflectantes para paseos nocturnos seguros.',
      price: 79.00,
      stock: 35,
      categories: [categoryMap['arneses']],
      tags: ['new', 'featured'],
      petSizes: ['M', 'L', 'XL'],
      sku: 'ARN-DEP-REF-001',
    },
  ]

  for (const product of productsData) {
    try {
      await payload.create({
        collection: 'products',
        data: { ...product, isActive: true } as any,
      })
      console.log(`✅ Product: ${product.name}`)
    } catch (e: any) {
      console.log(`ℹ️ Product ${product.name}: ${e.message?.slice(0, 50) || 'already exists'}`)
    }
  }

  // Create shipping zones
  const shippingZones = [
    {
      name: 'Lima Centro',
      districts: 'Miraflores\nSan Isidro\nSurco\nSan Borja\nBarranco\nLince\nJesús María\nMagdalena\nPueblo Libre\nSurquillo\nLa Molina\nSan Miguel\nBreña\nCercado de Lima\nRímac',
      cost: 10,
      freeShippingMinimum: 150,
      estimatedDays: '1-2 días hábiles',
      order: 1,
    },
    {
      name: 'Lima Norte',
      districts: 'Los Olivos\nSan Martín de Porres\nIndependencia\nComas\nCarabayllo\nPuente Piedra\nAncón\nSanta Rosa',
      cost: 15,
      freeShippingMinimum: 200,
      estimatedDays: '2-3 días hábiles',
      order: 2,
    },
    {
      name: 'Lima Sur',
      districts: 'Chorrillos\nVilla el Salvador\nVilla María del Triunfo\nSan Juan de Miraflores\nLurín\nPachacámac\nPunta Hermosa\nPunta Negra',
      cost: 15,
      freeShippingMinimum: 200,
      estimatedDays: '2-3 días hábiles',
      order: 3,
    },
    {
      name: 'Lima Este',
      districts: 'Ate\nSanta Anita\nEl Agustino\nSan Juan de Lurigancho\nChosica\nChaclacayo\nCieneguilla\nLa Victoria',
      cost: 15,
      freeShippingMinimum: 200,
      estimatedDays: '2-3 días hábiles',
      order: 4,
    },
    {
      name: 'Callao',
      districts: 'Callao\nBellavista\nLa Perla\nLa Punta\nCarmen de la Legua\nVentanilla',
      cost: 15,
      freeShippingMinimum: 200,
      estimatedDays: '2-3 días hábiles',
      order: 5,
    },
  ]

  for (const zone of shippingZones) {
    try {
      await payload.create({
        collection: 'shipping-zones',
        data: { ...zone, isActive: true } as any,
      })
      console.log(`✅ Shipping zone: ${zone.name}`)
    } catch {
      console.log(`ℹ️ Shipping zone ${zone.name} already exists`)
    }
  }

  console.log('\n🎉 Seed completed!')
  console.log('\n📋 Admin panel: http://localhost:3000/admin')
  console.log('📧 Admin login: admin@tanquecitos.com / admin123')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
