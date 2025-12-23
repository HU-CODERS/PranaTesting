'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import VerificarToken from '@/components/verifiers/TokenVerify'; // si querés mover la lógica ahí

export default function VerificarCuentaPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
      <VerificarToken />
    </Suspense>
  );
}
