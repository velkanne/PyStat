import React from 'react';
import { BookOpen, Calculator as CalcIcon, Sigma, TrendingUp } from 'lucide-react';

const ReferenceView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Referencia de Fórmulas</h1>
        <p className="text-gray-600 mb-8">Guía rápida de distribuciones discretas</p>

        {/* Binomial */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Distribución Binomial</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm font-semibold text-blue-900 mb-2">Función de Masa de Probabilidad (PMF)</p>
              <div className="font-mono text-lg text-blue-700">
                P(X = k) = C(n,k) × p<sup>k</sup> × (1-p)<sup>(n-k)</sup>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-xs font-semibold text-gray-600 mb-1">Parámetros</p>
                <ul className="text-sm text-gray-700 space-y-1 font-mono">
                  <li><strong>n</strong>: número de ensayos</li>
                  <li><strong>p</strong>: probabilidad de éxito</li>
                  <li><strong>k</strong>: número de éxitos</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-xs font-semibold text-gray-600 mb-1">Estadísticas</p>
                <ul className="text-sm text-gray-700 space-y-1 font-mono">
                  <li><strong>μ</strong> = n × p</li>
                  <li><strong>σ²</strong> = n × p × (1-p)</li>
                  <li><strong>σ</strong> = √(n × p × (1-p))</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm font-semibold text-green-900 mb-2">💡 Ejemplo de Uso</p>
              <p className="text-sm text-green-800">
                Lanzar 10 monedas (n=10, p=0.5): ¿Probabilidad de obtener exactamente 5 caras?
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-sm font-semibold text-yellow-900 mb-2">📋 Aplicaciones</p>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Control de calidad: productos defectuosos</li>
                <li>Medicina: eficacia de tratamientos</li>
                <li>Encuestas: proporción de respuestas</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Poisson */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Sigma className="text-purple-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Distribución de Poisson</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-md">
              <p className="text-sm font-semibold text-purple-900 mb-2">Función de Masa de Probabilidad (PMF)</p>
              <div className="font-mono text-lg text-purple-700">
                P(X = k) = (λ<sup>k</sup> × e<sup>-λ</sup>) / k!
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-xs font-semibold text-gray-600 mb-1">Parámetros</p>
                <ul className="text-sm text-gray-700 space-y-1 font-mono">
                  <li><strong>λ</strong>: tasa promedio de eventos</li>
                  <li><strong>k</strong>: número de eventos</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-xs font-semibold text-gray-600 mb-1">Estadísticas</p>
                <ul className="text-sm text-gray-700 space-y-1 font-mono">
                  <li><strong>μ</strong> = λ</li>
                  <li><strong>σ²</strong> = λ</li>
                  <li><strong>σ</strong> = √λ</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm font-semibold text-green-900 mb-2">💡 Ejemplo de Uso</p>
              <p className="text-sm text-green-800">
                Recibo 3 emails/hora en promedio (λ=3): ¿Probabilidad de recibir exactamente 5 emails en la próxima hora?
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-sm font-semibold text-yellow-900 mb-2">📋 Aplicaciones</p>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Call centers: llamadas por hora</li>
                <li>Tráfico: accidentes en carreteras</li>
                <li>Servidores web: visitas por minuto</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Factorial */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <CalcIcon className="text-orange-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Funciones Auxiliares</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-md">
              <p className="text-sm font-semibold text-orange-900 mb-2">Factorial</p>
              <div className="font-mono text-lg text-orange-700 mb-2">
                n! = n × (n-1) × (n-2) × ... × 2 × 1
              </div>
              <p className="text-sm text-orange-800">Ejemplo: 5! = 5 × 4 × 3 × 2 × 1 = 120</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-md">
              <p className="text-sm font-semibold text-orange-900 mb-2">Coeficiente Binomial</p>
              <div className="font-mono text-lg text-orange-700 mb-2">
                C(n,k) = n! / (k! × (n-k)!)
              </div>
              <p className="text-sm text-orange-800">Ejemplo: C(5,2) = 5! / (2! × 3!) = 120 / (2 × 6) = 10</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReferenceView;
