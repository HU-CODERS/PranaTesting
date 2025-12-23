"use client"
import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Download, Link2 } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

// Declare global types for external libraries
declare global {
  interface Window {
    QRious?: any;
  }
}

const QRCodeGenerator = () => {
  const [urlInput, setUrlInput] = useState('');
  const [qrData, setQrData] = useState('');
  const qrContainerRef = useRef<HTMLDivElement>(null);

  // QR Code generation - Optimizado para escaneo
  const generateQRCode = (text: string) => {
    if (!text.trim() || !qrContainerRef.current) {
      if (qrContainerRef.current) {
        qrContainerRef.current.innerHTML = '';
      }
      return;
    }

    // Clear previous content
    qrContainerRef.current.innerHTML = '';

    // Create img element usando API más confiable
    const img = document.createElement('img');
    const encodedData = encodeURIComponent(text);

    // Usar tamaño más grande (500x500) y margen generoso para mejor escaneo
    // Color negro para máxima compatibilidad con lectores QR
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodedData}&format=png&margin=20&ecc=M`;
    img.alt = 'Código QR Generado';
    img.className = 'w-full h-auto rounded-xl';
    img.style.maxWidth = '320px';
    img.style.height = 'auto';

    // Mostrar mensaje de carga
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'text-center text-gray-500 text-sm';
    loadingDiv.textContent = 'Generando QR...';
    qrContainerRef.current.appendChild(loadingDiv);

    // Cuando la imagen carga, remover mensaje y mostrar QR
    img.onload = () => {
      if (qrContainerRef.current) {
        qrContainerRef.current.innerHTML = '';
        qrContainerRef.current.appendChild(img);
      }
    };

    // Si falla, intentar con Google Charts
    img.onerror = () => {
      console.log('Intentando con Google Charts...');
      // Google Charts con parámetros optimizados para escaneo
      img.src = `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${encodedData}&choe=UTF-8&chld=M|4`;

      // Si también falla Google Charts, mostrar error
      img.onerror = () => {
        if (qrContainerRef.current) {
          qrContainerRef.current.innerHTML = `
            <div class="text-center text-red-500 py-8">
              <p class="font-medium">Error al generar el código QR</p>
              <p class="text-sm mt-2">Por favor, verifica tu conexión a internet</p>
            </div>
          `;
        }
      };
    };
  };

  const formatUrl = (url: string) => {
    if (!url.trim()) return '';

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  useEffect(() => {
    const formattedUrl = formatUrl(urlInput);
    setQrData(formattedUrl);

    if (formattedUrl) {
      generateQRCode(formattedUrl);
    } else if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = '';
    }
  }, [urlInput]);

  const downloadQRCode = () => {
    if (!qrData) return;

    const canvas = qrContainerRef.current?.querySelector('canvas');
    const img = qrContainerRef.current?.querySelector('img');

    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qr-code-prana.png';
      link.href = canvas.toDataURL();
      link.click();
    } else if (img) {
      const link = document.createElement('a');
      link.download = 'qr-code-prana.png';
      link.href = img.src;
      link.click();
    }
  };

  const resetForm = () => {
    setUrlInput('');
    setQrData('');
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = '';
    }
  };

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-[#F6F4F1] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#5862f0] rounded-2xl mb-6 shadow-lg">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#5862f0] mb-4">
              Generador de Códigos QR
            </h1>
            <p className="text-lg text-gray-700 font-light">
              Crea códigos QR para tus enlaces de forma rápida y sencilla
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                      <Link2 className="w-5 h-5 text-[#5862f0]" />
                      Ingresa tu URL
                    </label>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="ejemplo.com o https://ejemplo.com"
                      className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5862f0] focus:border-[#5862f0] transition-all duration-200 outline-none"
                    />
                    <p className="text-sm text-gray-500 mt-3 font-light">
                      Si no incluyes http://, agregaremos https:// automáticamente
                    </p>
                  </div>

                  {urlInput && (
                    <button
                      onClick={resetForm}
                      className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* QR Code Display Section */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="bg-[#F6F4F1] rounded-2xl p-8 w-full">
                    {qrData ? (
                      <div className="text-center">
                        <div ref={qrContainerRef} className="flex justify-center mb-4">
                          {/* QR code will be dynamically inserted here */}
                        </div>
                        <p className="text-sm text-gray-600 font-light">
                          Escanea este código QR con tu dispositivo
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <QrCode className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-light">
                          Ingresa una URL para generar tu código QR
                        </p>
                      </div>
                    )}
                  </div>

                  {qrData && (
                    <button
                      onClick={downloadQRCode}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#5862f0] hover:bg-[#3c4ac6] text-white rounded-xl transition-all duration-300 hover:scale-[1.03] font-semibold shadow-lg text-lg"
                    >
                      <Download className="w-5 h-5" />
                      Descargar QR
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
};

export default QRCodeGenerator;