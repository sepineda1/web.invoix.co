import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacyPage() {
  return (
    <Legal
      title="Política de privacidad"
      intro="Aquí explicamos qué datos pedimos para crear tu cuenta y responder tus mensajes, y para qué los usamos."
    >
      <h2>Qué datos recogemos</h2>
      <p>
        Cuando te registras guardamos tu nombre, el nombre de tu negocio, tu correo, tu teléfono si lo escribes y la contraseña cifrada. Si nos escribes por el formulario de contacto, guardamos el mensaje. Dentro del panel puedes registrar datos de tu empresa y ventas de borrador.
      </p>
      <h2>Para qué los usamos</h2>
      <p>
        Usamos esos datos para crear tu espacio, autenticarte, responder soporte y operar la facturación que tú mismo registras. No vendemos tu base de clientes.
      </p>
      <h2>Cuánto tiempo los conservamos</h2>
      <p>
        Conservamos la cuenta mientras esté activa. Si pides la eliminación, borramos los datos que no debamos conservar por una obligación legal.
      </p>
      <h2>Tus solicitudes</h2>
      <p>
        Para acceder, actualizar o eliminar tus datos escribe a support@invoix.co. El detalle del tratamiento frente a la Ley 1581 de 2012 está en la página de tratamiento de datos personales.
      </p>
    </Legal>
  );
}
