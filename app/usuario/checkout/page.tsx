'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Home, 
  ShoppingBag, 
  CreditCard,
  User,
  Calendar,
  Hash,
  DollarSign,
  FileText,
  Mail
} from 'lucide-react';

// Tipos TypeScript
interface PaymentData {
  payment_id?: string;
  status?: 'approved' | 'rejected' | 'pending' | 'cancelled';
  collection_id?: string;
  collection_status?: string;
  external_reference?: string;
  merchant_order_id?: string;
  preference_id?: string;
}

interface PlanData {
  id: string;
  name: string;
  amount: number;
  classes: number;
  description?: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface TicketData {
  planName: string;
  amount: number;
  classes: number;
  purchaseDate: string;
  userName: string;
  paymentId: string;
  orderId?: string;
}

type PaymentStatus = 'loading' | 'success' | 'failure';

// DATOS HARDCODEADOS PARA TESTING - FÁCIL DE REEMPLAZAR
const MOCK_DATA = {
  plans: [
    {
      id: 'plan_1',
      name: 'Plan Básico',
      amount: 5000,
      classes: 8,
      description: 'Plan perfecto para empezar'
    },
    {
      id: 'plan_2', 
      name: 'Plan Premium',
      amount: 8000,
      classes: 16,
      description: 'Para usuarios frecuentes'
    }
  ],
  users: [
    {
      id: 'user_1',
      name: 'Juan Pérez',
      email: 'juan@email.com'
    },
    {
      id: 'user_2',
      name: 'María González', 
      email: 'maria@email.com'
    }
  ],
  payments: [
    {
      id: 'pay_123',
      plan_id: 'plan_1',
      user_id: 'user_1',
      amount: 5000,
      status: 'approved',
      date_created: '2024-08-01T10:30:00Z'
    },
    {
      id: 'pay_456',
      plan_id: 'plan_2',
      user_id: 'user_2', 
      amount: 8000,
      status: 'approved',
      date_created: '2024-08-01T11:15:00Z'
    }
  ]
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('loading');
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentData>({});
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Extraer parámetros de la URL (MercadoPago format)
  useEffect(() => {
    if (searchParams) {
      const status = searchParams.get('collection_status'); // o searchParams.get('status')
      const payment_id = searchParams.get('payment_id');
      const collection_id = searchParams.get('collection_id');
      const collection_status = searchParams.get('collection_status');
      const external_reference = searchParams.get('external_reference');
      const merchant_order_id = searchParams.get('merchant_order_id');
      const preference_id = searchParams.get('preference_id');
      
      const data: PaymentData = {
        status: status === 'approved' || status === 'rejected' || status === 'pending' || status === 'cancelled' ? status : undefined,
        payment_id: payment_id || undefined,
        collection_id: collection_id || undefined,
        collection_status: collection_status || undefined,
        external_reference: external_reference || undefined,
        merchant_order_id: merchant_order_id || undefined,
        preference_id: preference_id || undefined,
      };
      
      setPaymentData(data);
      
      // Establecer estado inicial basado en el parámetro status de MercadoPago
      if (status === 'approved' && payment_id) {
        // AQUÍ SE HACE LA LLAMADA AL PROFILE DEL USUARIO PARA OBTENER LOS DATOS DEL PAGO, REGISTRADOS EN MEMBRERSHIP.
        verifyPaymentWithBackend(payment_id);
      } else if (status === 'rejected' || status === 'cancelled') {
        setPaymentStatus('failure');
        setIsVerifying(false);
        setErrorMessage('El pago fue rechazado o cancelado.');
      } else if (status === 'pending') {
        setPaymentStatus('loading'); // Mantener en loading para manejar pendientes
        setIsVerifying(false);
        setErrorMessage('El pago está siendo procesado. Esto puede tardar unos minutos.');
      } else {
        // Si no hay status válido o payment_id, redirigir a la tienda
        // router.push('/usuario/tienda');
      }
    }
  }, [searchParams, router]);

  // FUNCIÓN PARA LLAMADA AL BACKEND (COMENTADA Y PREPARADA)
  const verifyPaymentWithBackend = async (paymentId: string) => {
    try {
      setIsVerifying(true);
      
      /* 
      // DESCOMENTAR CUANDO SE INTEGRE EL BACKEND:
      const response = await fetch(`/api/payment/verify/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${getAuthToken()}`, // Implementar según tu sistema de auth
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        const { payment, plan, user } = result.data;
        
        // Procesar datos del backend
        setPlanData(plan);
        setUserData(user);
        setTicketData({
          planName: plan.name,
          amount: payment.amount,
          classes: plan.classes,
          purchaseDate: new Date(payment.date_created).toLocaleDateString('es-AR'),
          userName: user.name,
          paymentId: payment.id,
          orderId: payment.order_id,
        });
        
        setPaymentStatus('success');
        
        // Asignar membresía al usuario si es necesario
        await assignMembershipToUser(user.id, plan.id, payment.id);
        
      } else {
        throw new Error(result.message || 'Error verificando el pago');
      }
      */
      
      // SIMULACIÓN CON DATOS HARDCODEADOS (REMOVER CUANDO SE INTEGRE BACKEND)
      await simulateBackendCall(paymentId);
      
    } catch (error) {
      console.error('Error verificando el pago:', error);
      setPaymentStatus('failure');
      setErrorMessage('Error al verificar el pago. Contacta con soporte.');
    } finally {
      setIsVerifying(false);
    }
  };

  // SIMULACIÓN DE LLAMADA AL BACKEND (REMOVER CUANDO SE INTEGRE)
  const simulateBackendCall = async (paymentId: string) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Buscar datos mockeados basados en el payment_id de MercadoPago
    // En este caso, usar el primer pago como default para testing
    const mockPayment = MOCK_DATA.payments.find(p => p.id === paymentId) || MOCK_DATA.payments[0];
    const mockPlan = MOCK_DATA.plans.find(p => p.id === mockPayment.plan_id) || MOCK_DATA.plans[0];
    const mockUser = MOCK_DATA.users.find(u => u.id === mockPayment.user_id) || MOCK_DATA.users[0];
    
    // Usar el payment_id real de MercadoPago para el ticket
    const realPaymentId = paymentData.payment_id || mockPayment.id;
    
    // Simular respuesta exitosa
    setPlanData(mockPlan);
    setUserData(mockUser);
    setTicketData({
      planName: mockPlan.name,
      amount: mockPayment.amount,
      classes: mockPlan.classes,
      purchaseDate: new Date().toLocaleDateString('es-AR'), // Fecha actual para testing
      userName: mockUser.name,
      paymentId: realPaymentId,
      orderId: paymentData.merchant_order_id || `ORD_${Date.now()}`,
    });
    
    setPaymentStatus('success');
  };

  // Función para generar y descargar el ticket como imagen PNG
  const downloadTicketAsPNG = async () => {
    if (!ticketData) return;
    
    try {
      await generateTicketImage(ticketData);
    } catch (error) {
      console.error('Error generando imagen:', error);
      alert('Error al generar el ticket. Por favor, intenta nuevamente.');
    }
  };

  // Función para generar imagen del ticket usando canvas
  const generateTicketImage = async (data: TicketData) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = 600;
    canvas.height = 800;
    
    // Fondo blanco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Colores
    const primaryColor = '#2563eb';
    const textColor = '#1f2937';
    const subtextColor = '#6b7280';
    
    // Título principal
    ctx.fillStyle = primaryColor;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TICKET DE COMPRA', canvas.width / 2, 80);
    
    // Línea decorativa
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(400, 100);
    ctx.stroke();
    
    // Información de la empresa
    ctx.fillStyle = textColor;
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tu Empresa', canvas.width / 2, 140);
    ctx.font = '12px Arial';
    ctx.fillStyle = subtextColor;
    ctx.fillText('www.tuempresa.com | info@tuempresa.com', canvas.width / 2, 160);
    
    // Información del ticket
    const startY = 220;
    const lineHeight = 50;
    let currentY = startY;
    
    const ticketInfo = [
      { label: 'Plan adquirido:', value: data.planName },
      { label: 'Monto pagado:', value: `$${data.amount}` },
      { label: 'Clases incluidas:', value: `${data.classes} clases` },
      { label: 'Fecha de compra:', value: data.purchaseDate },
      { label: 'Usuario:', value: data.userName },
      { label: 'ID de pago:', value: data.paymentId },
    ];
    
    ticketInfo.forEach((info) => {
      // Label
      ctx.fillStyle = subtextColor;
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(info.label, 80, currentY);
      
      // Value
      ctx.fillStyle = textColor;
      ctx.font = 'bold 16px Arial';
      ctx.fillText(info.value, 80, currentY + 25);
      
      currentY += lineHeight;
    });
    
    // Línea separadora
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, currentY + 20);
    ctx.lineTo(520, currentY + 20);
    ctx.stroke();
    
    // Nota al pie
    currentY += 60;
    ctx.fillStyle = subtextColor;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Gracias por tu compra. Conserva este ticket como comprobante.', canvas.width / 2, currentY);
    ctx.fillText(`Generado el ${new Date().toLocaleString('es-AR')}`, canvas.width / 2, currentY + 20);
    
    // Convertir canvas a blob y descargar
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ticket-compra-${data.paymentId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  // Componente del spinner de carga
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-blue-600 font-medium">
        {isVerifying ? 'Verificando tu pago...' : 'Procesando...'}
      </p>
    </div>
  );

  // Componente del ticket de compra
  const TicketComponent = () => {
    if (!ticketData) return null;

    return (
      <div id="ticket" className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-blue-500">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Ticket de Compra</h3>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Plan adquirido</p>
                <p className="font-semibold text-gray-800">{ticketData.planName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Monto pagado</p>
                <p className="font-semibold text-gray-800">${ticketData.amount}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Clases incluidas</p>
                <p className="font-semibold text-gray-800">{ticketData.classes} clases</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Fecha de compra</p>
                <p className="font-semibold text-gray-800">{ticketData.purchaseDate}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Usuario</p>
                <p className="font-semibold text-gray-800">{ticketData.userName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">ID de pago</p>
                <p className="font-semibold text-gray-800 text-sm">{ticketData.paymentId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizado condicional basado en el estado
  if (paymentStatus === 'loading' || isVerifying) {
    return (
      <div className="min-h-screen  py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen  py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mensaje de éxito */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Pago Exitoso!</h1>
            <p className="text-gray-600 text-lg mb-6">
              Gracias por tu compra. Tu membresía ha sido activada exitosamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button
                onClick={downloadTicketAsPNG}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
              >
                <Download className="w-5 h-5" />
                <span>Descargar Ticket</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors shadow-md"
              >
                <FileText className="w-5 h-5" />
                <span>Imprimir</span>
              </button> */}
              <button
                onClick={() => router.push('/usuario/asisti-al-espacio')}
                className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Volver al Inicio</span>
              </button>
            </div>
          </div>

          {/* Ticket de compra */}
          {/* <TicketComponent /> */}
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failure') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Pago No Completado</h1>
            <p className="text-gray-600 text-lg mb-2">
              {errorMessage || 'Hubo un problema al procesar tu pago.'}
            </p>
            <p className="text-sm text-gray-500 mb-8">
              No te preocupes, no se realizó ningún cargo. Puedes intentar nuevamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/usuario/tienda')}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Intentar Nuevamente</span>
              </button>
              <button
                onClick={() => window.open('mailto:info@prana-om.com?subject=Problema con pago&body=ID de pago: ' + (paymentData.payment_id || 'N/A'), '_blank')}
                className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors shadow-md"
              >
                <Mail className="w-5 h-5" />
                <span>Contactar Soporte</span>
              </button>
              <button
                onClick={() => router.push('/usuario')}
                className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Ir al Inicio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CheckoutPage;