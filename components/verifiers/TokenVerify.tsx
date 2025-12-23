'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function VerificarToken() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [verificado, setVerificado] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) return;

      try {
        const res = await fetch(`https://pranabackend.onrender.com/api/auth/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          toast.success('Cuenta verificada con éxito.');
          setVerificado(true);
        } else {
          toast.error('Token inválido o expirado.');
        }
      } catch {
        toast.error('Error al verificar el token.');
      } finally {
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Verificando cuenta...</h1>
        <p className="text-gray-600">
          {verificado ? 'Redirigiendo a la página principal...' : 'Por favor, espera unos segundos.'}
        </p>
      </div>
    </div>
  );
}
