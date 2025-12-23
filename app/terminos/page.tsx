"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function TerminosPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-[#305891] mb-8">Términos y Condiciones</h1>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="prose max-w-none text-gray-700">
                <p className="mb-6">
                  <strong>Última actualización:</strong> 1 de Abril de 2023
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">1. Introducción</h2>
                <p className="mb-4">
                  Estos términos y condiciones rigen el uso de nuestro sitio web y servicios ofrecidos por Prana OM. Al
                  acceder a nuestro sitio web o utilizar nuestros servicios, usted acepta estos términos y condiciones
                  en su totalidad. Si no está de acuerdo con estos términos y condiciones o cualquier parte de ellos, no
                  debe utilizar nuestro sitio web o servicios.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">2. Uso del sitio web</h2>
                <p className="mb-4">
                  Nuestro sitio web está diseñado para proporcionar información sobre nuestros servicios de yoga y
                  permitir la reserva de clases y formaciones. Usted puede utilizar nuestro sitio web solo para fines
                  legales y de acuerdo con estos términos y condiciones.
                </p>
                <p className="mb-4">Usted acepta no utilizar nuestro sitio web:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    De cualquier manera que viole cualquier ley o regulación local, nacional o internacional aplicable.
                  </li>
                  <li>
                    De cualquier manera que sea ilegal o fraudulenta, o tenga cualquier propósito o efecto ilegal o
                    fraudulento.
                  </li>
                  <li>
                    Para transmitir, o procurar el envío de, cualquier material publicitario o promocional no solicitado
                    o no autorizado.
                  </li>
                  <li>
                    Para transmitir a sabiendas cualquier dato, enviar o cargar cualquier material que contenga virus,
                    troyanos, gusanos, bombas de tiempo, registradores de pulsaciones de teclas, spyware, adware o
                    cualquier otro programa dañino.
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">3. Reservas y pagos</h2>
                <p className="mb-4">
                  Al realizar una reserva a través de nuestro sitio web, usted garantiza que tiene al menos 18 años de
                  edad o que tiene el consentimiento de un padre o tutor.
                </p>
                <p className="mb-4">
                  Las reservas están sujetas a disponibilidad y aceptación. No se considerará que existe un contrato
                  entre usted y nosotros hasta que reciba una confirmación de reserva por correo electrónico.
                </p>
                <p className="mb-4">
                  Los precios mostrados en nuestro sitio web incluyen IVA y todos los cargos aplicables. Los pagos se
                  pueden realizar utilizando los métodos de pago indicados en nuestro sitio web. Al proporcionar los
                  detalles de su tarjeta de crédito/débito, usted confirma que está autorizado a utilizar la tarjeta y
                  autoriza a que se cargue en su tarjeta el costo total de su reserva.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">4. Cancelaciones y reembolsos</h2>
                <p className="mb-4">Nuestra política de cancelación es la siguiente:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Clases individuales:</strong> Las cancelaciones deben realizarse al menos 12 horas antes de
                    la clase programada para recibir un reembolso completo o un crédito para una clase futura.
                  </li>
                  <li>
                    <strong>Paquetes de clases:</strong> Los paquetes de clases no son reembolsables pero tienen una
                    validez de 3 a 6 meses dependiendo del paquete.
                  </li>
                  <li>
                    <strong>Membresías mensuales:</strong> Las membresías mensuales pueden cancelarse con un aviso de 15
                    días antes del próximo ciclo de facturación.
                  </li>
                  <li>
                    <strong>Formaciones y workshops:</strong> Las cancelaciones realizadas con más de 30 días de
                    anticipación recibirán un reembolso del 75%. Las cancelaciones realizadas entre 15-30 días antes
                    recibirán un reembolso del 50%. No se ofrecen reembolsos para cancelaciones realizadas con menos de
                    15 días de anticipación.
                  </li>
                </ul>
                <p className="mb-4">
                  Nos reservamos el derecho de cancelar o reprogramar clases, workshops o formaciones debido a
                  circunstancias imprevistas. En caso de cancelación por nuestra parte, se ofrecerá un reembolso
                  completo o la opción de reprogramar.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">5. Salud y seguridad</h2>
                <p className="mb-4">
                  Al participar en nuestras clases, workshops o formaciones, usted reconoce que el yoga implica
                  actividad física y acepta la responsabilidad de consultar con un médico antes de comenzar cualquier
                  programa de ejercicios.
                </p>
                <p className="mb-4">
                  Usted debe informar a su instructor sobre cualquier lesión, condición médica o embarazo antes de
                  comenzar cualquier clase. Nuestros instructores pueden sugerir modificaciones, pero usted es
                  responsable de practicar dentro de sus propias limitaciones.
                </p>
                <p className="mb-4">
                  Prana OM no se hace responsable de lesiones, enfermedades o daños que resulten de la participación en
                  nuestras clases, workshops o formaciones.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">6. Propiedad intelectual</h2>
                <p className="mb-4">
                  Todo el contenido publicado en nuestro sitio web, incluyendo pero no limitado a texto, gráficos,
                  logotipos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de
                  Prana OM o de nuestros proveedores de contenido y está protegido por las leyes de propiedad
                  intelectual.
                </p>
                <p className="mb-4">
                  Usted puede imprimir una copia y descargar extractos de cualquier página del sitio web para su uso
                  personal, pero no debe:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Modificar cualquier documento impreso o digital.</li>
                  <li>Usar cualquier ilustración, fotografía, video o audio por separado del texto que lo acompaña.</li>
                  <li>
                    Utilizar cualquier parte del contenido de nuestro sitio web para fines comerciales sin obtener una
                    licencia para hacerlo de nosotros o de nuestros licenciantes.
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">7. Limitación de responsabilidad</h2>
                <p className="mb-4">
                  En la medida permitida por la ley, excluimos todas las condiciones, garantías, representaciones u
                  otros términos que puedan aplicarse a nuestro sitio web o cualquier contenido en él, ya sea expreso o
                  implícito.
                </p>
                <p className="mb-4">
                  No seremos responsables ante ningún usuario por cualquier pérdida o daño, ya sea en contrato, agravio
                  (incluyendo negligencia), incumplimiento de deber legal, o de otra manera, incluso si es previsible,
                  que surja bajo o en conexión con el uso, o la imposibilidad de usar, nuestro sitio web o el uso o
                  dependencia de cualquier contenido mostrado en nuestro sitio web.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">8. Cambios a estos términos</h2>
                <p className="mb-4">
                  Podemos revisar estos términos y condiciones en cualquier momento modificando esta página. Por favor,
                  consulte esta página de vez en cuando para tomar nota de cualquier cambio que hayamos realizado, ya
                  que son vinculantes para usted.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">9. Ley aplicable</h2>
                <p className="mb-4">
                  Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Argentina, y cualquier
                  disputa relacionada con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los
                  tribunales de Buenos Aires, Argentina.
                </p>

                <h2 className="text-xl font-bold text-[#305891] mt-8 mb-4">10. Contacto</h2>
                <p className="mb-4">Si tiene alguna pregunta sobre estos términos y condiciones, contáctenos en:</p>
                <p className="mb-4">
                  <strong>Email:</strong> info@pranaomyoga.com
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
