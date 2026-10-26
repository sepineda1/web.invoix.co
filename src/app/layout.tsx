import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invoix.co"),
  title: {
    default: "Invoix.co | Facturación electrónica sin límites",
    template: "%s | Invoix.co",
  },
  description:
    "Facturación electrónica ilimitada para tu negocio en Colombia. Precio fijo, firma digital incluida y tu propio espacio en invoix.co.",
  openGraph: {
    title: "Invoix.co | Facturación electrónica sin límites",
    description: "Cumple con la DIAN sin pagar por cada factura. Prueba 15 días gratis.",
    locale: "es_CO",
    siteName: "Invoix.co",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}
