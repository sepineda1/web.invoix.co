import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function TermsPage() {
  return (
    <Legal
      title="Términos y condiciones"
      intro="Estas condiciones regulan el uso de la plataforma Invoix.co. Al crear una cuenta aceptas este documento."
    >
      <h2>La cuenta y la prueba</h2>
      <p>
        Puedes crear una prueba de 15 días sin tarjeta de crédito. La prueba sirve para conocer la plataforma y preparar tu habilitación. Al terminar, eliges un plan o dejas de usar el servicio.
      </p>
      <h2>Planes y facturación del servicio</h2>
      <p>
        Los precios se muestran en pesos colombianos, antes de empezar, y dependen del ciclo que elijas: mensual, semestral o anual. No hay cláusula de permanencia. Puedes cancelar cuando quieras y el periodo ya pagado corre hasta su fecha de corte.
      </p>
      <p>
        El plan PRO incluye facturación electrónica ilimitada: el valor no sube por la cantidad de facturas, notas crédito o notas débito que emitas. El plan Básico tiene un tope de 25 facturas DIAN al mes.
      </p>
      <h2>Tu espacio</h2>
      <p>
        Según el plan, Invoix.co te asigna un espacio de trabajo y puede incluir un subdominio personalizado. Eres responsable de la información de tus clientes, productos y documentos que cargues.
      </p>
      <h2>Uso aceptable</h2>
      <p>
        No uses la plataforma para emitir documentos falsos, suplantar negocios o intentar acceder al espacio de otro cliente. Podemos suspender una cuenta que ponga en riesgo el servicio o que incumpla la normativa tributaria.
      </p>
      <h2>Contacto</h2>
      <p>
        Para cualquier aviso sobre estos términos escribe a support@invoix.co.
      </p>
    </Legal>
  );
}
