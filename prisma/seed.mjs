import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const plans = [
  {
    id: "basico",
    name: "Básico",
    audience: "Independientes y emprendedores que recién inician.",
    monthlyPrice: 19900,
    semiannualPrice: 15920,
    semiannualTotal: 95520,
    annualPrice: 14900,
    annualTotal: 178800,
    popular: false,
    cta: "Comenzar Básico",
    sortOrder: 1,
    features: [
      "Hasta 25 facturas DIAN al mes",
      "1 usuario",
      "Punto de venta POS básico",
      "Firma digital incluida",
      "Soporte estándar",
    ],
  },
  {
    id: "pro",
    name: "PRO",
    audience: "Pymes, comercios y negocios en crecimiento que facturan todos los días.",
    monthlyPrice: 56250,
    semiannualPrice: 45000,
    semiannualTotal: 270000,
    annualPrice: 42000,
    annualTotal: 504000,
    popular: true,
    cta: "Empezar con PRO",
    sortOrder: 2,
    features: [
      "Facturación DIAN ilimitada",
      "Hasta 3 usuarios",
      "Subdominio personalizado tuempresa.invoix.co",
      "Gestión avanzada de inventarios y reportes",
      "Soporte prioritario",
    ],
  },
  {
    id: "elite",
    name: "Élite",
    audience: "Empresas establecidas que buscan la solución definitiva al mejor precio.",
    monthlyPrice: 55000,
    semiannualPrice: 44000,
    semiannualTotal: 264000,
    annualPrice: 40000,
    annualTotal: 480000,
    popular: false,
    cta: "Adquirir Élite",
    sortOrder: 3,
    features: [
      "Todo lo del plan PRO",
      "Usuarios ilimitados",
      "Soporte VIP directo por WhatsApp",
      "Configuración inicial DIAN llave en mano",
      "Precio congelado por 12 meses",
    ],
  },
];

const faqs = [
  {
    id: "firma",
    question: "¿Tengo que pagar por la firma digital?",
    answer:
      "No. Todos nuestros planes incluyen el certificado de firma digital requerido por la DIAN sin costo adicional.",
    sortOrder: 1,
  },
  {
    id: "ilimitada",
    question: "¿Qué pasa si uso el plan PRO y emito 1.000 facturas en un mes?",
    answer:
      "No pasa absolutamente nada malo. El plan PRO es verdaderamente ilimitado. Puedes facturar 100 o 10.000 veces y pagarás exactamente lo mismo.",
    sortOrder: 2,
  },
  {
    id: "dian",
    question: "¿Me ayudan con el proceso de la DIAN?",
    answer:
      "Sí. Contamos con tutoriales paso a paso y soporte en español para guiarte en tu habilitación como facturador electrónico. Si adquieres el plan Élite, nosotros hacemos la configuración por ti.",
    sortOrder: 3,
  },
  {
    id: "permanencia",
    question: "¿Tiene cláusulas de permanencia?",
    answer: "Ninguna. Eres libre de cancelar tu suscripción en cualquier momento.",
    sortOrder: 4,
  },
];

const testimonials = [
  {
    id: "andres",
    quote:
      "Antes pagaba recargos mensuales porque me pasaba de las 20 facturas. Con Invoix me pasé al plan semestral y me olvidé del problema. Súper recomendados.",
    name: "Andrés Molina",
    role: "Propietario de Ferretería El Roble",
    city: "Medellín",
    sortOrder: 1,
  },
  {
    id: "laura",
    quote:
      "El proceso con la DIAN me daba terror, pero el equipo de soporte me guió en todo. Además, que mi link sea midominio.invoix.co me hace ver muy profesional con mis clientes.",
    name: "Laura Vélez",
    role: "Contadora independiente",
    city: "Bogotá",
    sortOrder: 2,
  },
  {
    id: "juliana",
    quote:
      "Pasé el inventario y el POS al mismo lugar donde facturo. En la caja ya no perdemos tiempo y el cierre del día cuadra.",
    name: "Juliana Pardo",
    role: "Administradora de Mini Mercado La 80",
    city: "Barranquilla",
    sortOrder: 3,
  },
];

const posts = [
  {
    slug: "habilitarte-como-facturador-electronico",
    title: "Cómo prepararte para facturar electrónicamente ante la DIAN",
    excerpt: "Los pasos que sí importan antes de emitir la primera factura, sin perderte en el portal.",
    category: "DIAN",
    publishedAt: new Date("2026-03-12"),
    content: `La habilitación no empieza en el software. Empieza cuando tu negocio ya tiene NIT, responsabilidad de facturar y la decisión de dejar las cuentas de cobro sueltas.

## El orden que funciona

- Confirma en el RUT que debes facturar electrónicamente.
- Elige el software, en este caso tu espacio de Invoix.co.
- Completa la ficha de la empresa y activa la firma digital incluida.
- Haz el set de pruebas y, cuando la DIAN lo apruebe, pasa a producción.

## Dónde se atasca la mayoría

El tropiezo casi nunca es “el sistema no sirve”. Es un dato del RUT que no coincide, un correo de notificación mal escrito o una firma que alguien iba a comprar por fuera. En Invoix la firma va incluida para que ese trámite no te detenga.

Si eliges el plan Élite, esa configuración inicial la hacemos nosotros. En los demás planes te acompañamos paso a paso, en español.`,
  },
  {
    slug: "por-que-la-facturacion-ilimitada-importa",
    title: "Por qué cobrar por cada factura castiga a quien vende más",
    excerpt: "Un cupo de 20 o 30 documentos se acaba justo cuando el mes te está saliendo bien.",
    category: "Precios",
    publishedAt: new Date("2026-05-04"),
    content: `Hay plataformas que se ven baratas el primer mes. Después llega el recargo: te pasaste del cupo y cada factura extra tiene precio.

## Lo que eso le hace a la caja

El negocio que más crece es el que más paga. Una ferretería en temporada o un restaurante en fin de semana no debería calcular si “alcanza” el cupo antes de atender al siguiente cliente.

## Cómo lo resolvemos

El plan PRO de Invoix.co tiene un precio fijo. Factures 100 o 10.000 veces, la mensualidad no se mueve. El plan Básico existe para quien está arrancando y todavía no pasa de 25 facturas al mes. Cuando ese techo se queda corto, el salto a PRO es claro y sin letra pequeña.

El pago semestral baja cerca del 20%. El anual deja el mejor valor por mes y, en Élite, congela ese precio durante 12 meses.`,
  },
  {
    slug: "firma-digital-incluida",
    title: "La firma digital no tiene que ser un costo aparte",
    excerpt: "La DIAN la exige para facturar. En Invoix va dentro del plan, desde el primer día.",
    category: "Producto",
    publishedAt: new Date("2026-07-21"),
    content: `Sin firma digital no hay factura electrónica válida. Muchos negocios descubren ese requisito cuando ya quieren salir a vender y entonces aparece un certificado de un tercero, otro pago y otra espera.

## Qué incluye tu plan

Todos los planes de Invoix.co traen la firma digital que exige la DIAN, sin cobro adicional. La activas en tu espacio, junto con los datos de la empresa.

## Qué sigue después

Con la firma lista haces las pruebas, pasas a producción y el documento que ve tu cliente ya sale con el respaldo que corresponde. El soporte te guía. Si quieres que lo dejemos configurado, el plan Élite incluye la puesta en marcha llave en mano.`,
  },
];

const updates = [
  {
    id: "espacio",
    title: "Tu espacio con subdominio propio",
    body: "Los planes PRO y Élite pueden abrir tumarca.invoix.co en un entorno separado, para que tus clientes vean tu marca y no un panel genérico.",
    tag: "Plataforma",
    publishedAt: new Date("2026-08-02"),
  },
  {
    id: "pos",
    title: "Punto de venta listo para código de barras",
    body: "El POS ya contempla lectores de código y cajón monedero, para que la venta de mostrador y la factura salgan del mismo movimiento.",
    tag: "POS",
    publishedAt: new Date("2026-09-15"),
  },
  {
    id: "firma",
    title: "Firma digital incluida en todos los planes",
    body: "Dejamos de tratar el certificado como un extra. Quien abre una prueba de 15 días también tiene la firma necesaria para arrancar la habilitación.",
    tag: "DIAN",
    publishedAt: new Date("2026-10-01"),
  },
];

async function main() {
  for (const plan of plans) {
    const { id, ...data } = plan;
    await prisma.plan.upsert({ where: { id }, update: data, create: { id, ...data } });
  }

  for (const faq of faqs) {
    const { id, ...data } = faq;
    await prisma.faq.upsert({ where: { id }, update: data, create: { id, ...data } });
  }

  for (const item of testimonials) {
    const { id, ...data } = item;
    await prisma.testimonial.upsert({ where: { id }, update: data, create: { id, ...data } });
  }

  for (const post of posts) {
    const { slug, ...data } = post;
    await prisma.post.upsert({ where: { slug }, update: data, create: { slug, ...data } });
  }

  for (const note of updates) {
    const { id, ...data } = note;
    await prisma.updateNote.upsert({ where: { id }, update: data, create: { id, ...data } });
  }

  const password = await bcrypt.hash("Invoix2026!", 10);
  const demo = await prisma.user.upsert({
    where: { email: "demo@invoix.co" },
    update: {},
    create: {
      name: "Ana Gómez",
      email: "demo@invoix.co",
      password,
      company: "Comercial Andina",
      phone: "3001234567",
      planInterest: "pro",
      role: "client",
      status: "pendiente",
      profile: {
        create: {
          tradeName: "Comercial Andina S.A.S.",
          nit: "900482110-4",
          city: "Bogotá",
          address: "Cra. 15 # 93-47",
        },
      },
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL || "admin@invoix.co";
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "InvoixAdmin2026!", 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "admin" },
    create: {
      name: "Administrador",
      email: adminEmail,
      password: adminPassword,
      company: "Invoix.co",
      role: "admin",
      status: "habilitado",
      planInterest: "elite",
    },
  });

  const existingInvoices = await prisma.invoice.count({ where: { userId: demo.id } });
  if (existingInvoices === 0) {
    await prisma.invoice.createMany({
      data: [
        { userId: demo.id, number: "FV-10421", customer: "Café Altura", total: 1280000, status: "Aceptada", issuedAt: new Date("2026-10-18") },
        { userId: demo.id, number: "FV-10422", customer: "Droguería Nova", total: 860000, status: "Aceptada", issuedAt: new Date("2026-10-20") },
        { userId: demo.id, number: "FV-10423", customer: "Taller Rueda Sur", total: 445000, status: "Borrador", issuedAt: new Date("2026-10-24") },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
