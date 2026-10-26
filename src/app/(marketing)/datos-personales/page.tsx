import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Tratamiento de datos personales" };

export default function DataPage() {
  return (
    <Legal
      title="Tratamiento de datos personales"
      intro="Política de tratamiento de datos personales de Invoix.co, elaborada con base en la Ley 1581 de 2012 y el Decreto 1377 de 2013."
    >
      <h2>Responsable</h2>
      <p>
        El responsable del tratamiento es Invoix.co. Canal de atención: support@invoix.co.
      </p>
      <h2>Datos y finalidades</h2>
      <ul>
        <li>Identificación y contacto: crear la cuenta, prestar soporte y enviar avisos del servicio.</li>
        <li>Datos del negocio: preparar la habilitación como facturador electrónico y el espacio de trabajo.</li>
        <li>Datos de facturación que tú registras: operar los borradores y, cuando actives la DIAN, emitir los documentos que solicites.</li>
      </ul>
      <h2>Derechos del titular</h2>
      <p>
        Puedes conocer, actualizar, rectificar y revocar la autorización, y solicitar la supresión de tus datos cuando no exista un deber legal de conservarlos. Para ejercerlos escribe a support@invoix.co con el asunto “Datos personales”.
      </p>
      <h2>Encargados y seguridad</h2>
      <p>
        Alojamos la información en infraestructura con acceso restringido. Cada espacio de trabajo se mantiene separado del de otros clientes. Las contraseñas se guardan cifradas.
      </p>
      <h2>Vigencia</h2>
      <p>
        Esta política rige desde 2026 y se actualiza cuando cambie la forma en que tratamos los datos. La versión publicada en este sitio es la vigente.
      </p>
    </Legal>
  );
}
