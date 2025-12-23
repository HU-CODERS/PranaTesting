"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function PrivacidadPage() {
  // Función para manejar el scroll al inicio cuando se navega
  const handleNavigation = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col min-h-screen">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#305891] mb-8">Política de Privacidad</h1>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="prose max-w-none text-gray-700">
                <p className="mb-6">
                  <strong>Última actualización:</strong> 1 de Abril de 2023
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">1. Introducción</h2>
                <p className="mb-4">
                  En Prana OM ("nosotros", "nuestro", "nos"), respetamos su privacidad y nos comprometemos a proteger
                  sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos
                  personales cuando visita nuestro sitio web o utiliza nuestros servicios, y le informará sobre sus
                  derechos de privacidad y cómo la ley lo protege.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">2. Datos que recopilamos</h2>
                <p className="mb-4">
                  Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted, que
                  hemos agrupado de la siguiente manera:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Datos de identidad:</strong> incluye nombre, apellido, nombre de usuario o identificador
                    similar.
                  </li>
                  <li>
                    <strong>Datos de contacto:</strong> incluye dirección de facturación, dirección de entrega,
                    dirección de correo electrónico y números de teléfono.
                  </li>
                  <li>
                    <strong>Datos financieros:</strong> incluye detalles de tarjetas de pago (procesados por nuestros
                    proveedores de servicios de pago).
                  </li>
                  <li>
                    <strong>Datos de transacción:</strong> incluye detalles sobre pagos hacia y desde usted, y otros
                    detalles de productos y servicios que ha adquirido de nosotros.
                  </li>
                  <li>
                    <strong>Datos técnicos:</strong> incluye dirección de protocolo de Internet (IP), datos de inicio de
                    sesión, tipo y versión de navegador, configuración de zona horaria y ubicación, tipos y versiones de
                    complementos del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos
                    que utiliza para acceder a este sitio web.
                  </li>
                  <li>
                    <strong>Datos de perfil:</strong> incluye su nombre de usuario y contraseña, compras o pedidos
                    realizados por usted, sus intereses, preferencias, comentarios y respuestas a encuestas.
                  </li>
                  <li>
                    <strong>Datos de uso:</strong> incluye información sobre cómo utiliza nuestro sitio web, productos y
                    servicios.
                  </li>
                  <li>
                    <strong>Datos de marketing y comunicaciones:</strong> incluye sus preferencias para recibir
                    marketing de nuestra parte y de nuestros terceros, y sus preferencias de comunicación.
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">3. Cómo utilizamos sus datos</h2>
                <p className="mb-4">
                  Solo utilizaremos sus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos sus
                  datos personales en las siguientes circunstancias:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    Cuando necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado con usted.
                  </li>
                  <li>
                    Cuando sea necesario para nuestros intereses legítimos (o los de un tercero) y sus intereses y
                    derechos fundamentales no anulen esos intereses.
                  </li>
                  <li>Cuando necesitemos cumplir con una obligación legal o regulatoria.</li>
                  <li>Cuando haya dado su consentimiento.</li>
                </ul>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">4. Divulgación de sus datos personales</h2>
                <p className="mb-4">
                  Podemos compartir sus datos personales con las partes que se indican a continuación para los fines
                  establecidos en esta política de privacidad:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Proveedores de servicios que proporcionan servicios de TI y administración de sistemas.</li>
                  <li>Asesores profesionales, incluidos abogados, banqueros, auditores y aseguradoras.</li>
                  <li>Autoridades fiscales, reguladoras y otras autoridades.</li>
                  <li>
                    Terceros a quienes podemos elegir vender, transferir o fusionar partes de nuestro negocio o nuestros
                    activos.
                  </li>
                </ul>
                <p className="mb-4">
                  Requerimos que todos los terceros respeten la seguridad de sus datos personales y los traten de
                  acuerdo con la ley. No permitimos que nuestros proveedores de servicios externos utilicen sus datos
                  personales para sus propios fines y solo les permitimos procesar sus datos personales para fines
                  específicos y de acuerdo con nuestras instrucciones.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">5. Seguridad de datos</h2>
                <p className="mb-4">
                  Hemos implementado medidas de seguridad apropiadas para evitar que sus datos personales se pierdan,
                  utilicen o accedan de forma no autorizada, se modifiquen o divulguen accidentalmente. Además,
                  limitamos el acceso a sus datos personales a aquellos empleados, agentes, contratistas y otros
                  terceros que tengan una necesidad comercial de conocerlos. Solo procesarán sus datos personales según
                  nuestras instrucciones y están sujetos a un deber de confidencialidad.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">6. Sus derechos legales</h2>
                <p className="mb-4">
                  Bajo ciertas circunstancias, usted tiene derechos bajo las leyes de protección de datos en relación
                  con sus datos personales, incluyendo el derecho a:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Solicitar acceso a sus datos personales.</li>
                  <li>Solicitar la corrección de sus datos personales.</li>
                  <li>Solicitar la eliminación de sus datos personales.</li>
                  <li>Oponerse al procesamiento de sus datos personales.</li>
                  <li>Solicitar la restricción del procesamiento de sus datos personales.</li>
                  <li>Solicitar la transferencia de sus datos personales.</li>
                  <li>Retirar el consentimiento.</li>
                </ul>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">7. Cookies</h2>
                <p className="mb-4">
                  Nuestro sitio web utiliza cookies para distinguirlo de otros usuarios de nuestro sitio web. Esto nos
                  ayuda a brindarle una buena experiencia cuando navega por nuestro sitio web y también nos permite
                  mejorarlo. Para obtener información detallada sobre las cookies que utilizamos y los fines para los
                  que las utilizamos, consulte nuestra política de cookies.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">8. Cambios a esta política de privacidad</h2>
                <p className="mb-4">
                  Podemos actualizar esta política de privacidad de vez en cuando. Cualquier cambio que hagamos a
                  nuestra política de privacidad en el futuro se publicará en esta página y, cuando corresponda, se le
                  notificará por correo electrónico o mediante un aviso en nuestro sitio web.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">9. Contacto</h2>
                <p className="mb-4">
                  Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad,
                  contáctenos en:
                </p>
                <p className="mb-4">
                  <strong>Email:</strong> privacidad@pranaomyoga.com
                  <br />
                  <strong>Teléfono:</strong> +54 11 2345-6789
                  <br />
                  <strong>Dirección:</strong> Av. Libertador 1234, Piso 3, Buenos Aires, Argentina
                </p>
              </div>

              <div className="mt-8 text-center">
                <Link href="/" onClick={handleNavigation}>
                  <Button className="bg-[#305891] hover:bg-[#3D6CAC] group transition-all duration-300 hover:scale-[1.03] shadow-md">
                    <span>Volver al Inicio</span>
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
