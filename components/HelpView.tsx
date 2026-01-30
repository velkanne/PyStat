import React from 'react';
import { BookOpen, Code, FileText, ExternalLink, Github } from 'lucide-react';

const HelpView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Centro de Ayuda</h1>
        <p className="text-gray-600 mb-8">Guías, tutoriales y recursos para usar la calculadora</p>

        {/* Quick Start */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="mr-3 text-blue-600" size={24} />
            Inicio Rápido
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Selecciona una Distribución</h3>
                <p className="text-sm text-gray-600">
                  Elige entre <strong>Binomial</strong> (experimentos con éxito/fracaso) o <strong>Poisson</strong> (eventos raros).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Ingresa los Parámetros</h3>
                <p className="text-sm text-gray-600">
                  Para <strong>Binomial</strong>: n (ensayos) y p (probabilidad). Para <strong>Poisson</strong>: λ (tasa promedio).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Presiona Calcular</h3>
                <p className="text-sm text-gray-600">
                  Observa las estadísticas en la consola y explora los gráficos PMF, CDF y Tabla.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h2>

          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                ¿Cuál es la diferencia entre PMF y CDF?
              </summary>
              <p className="mt-2 text-sm text-gray-600 pl-4 border-l-2 border-blue-200">
                <strong>PMF</strong> (Probability Mass Function) muestra la probabilidad de cada valor específico: P(X=k).
                <strong> CDF</strong> (Cumulative Distribution Function) muestra la probabilidad acumulada hasta ese valor: P(X≤k).
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                ¿Cuándo usar Binomial vs Poisson?
              </summary>
              <p className="mt-2 text-sm text-gray-600 pl-4 border-l-2 border-blue-200">
                Usa <strong>Binomial</strong> cuando tienes un número fijo de ensayos (n) con dos resultados posibles.
                Usa <strong>Poisson</strong> cuando cuentas eventos raros en un intervalo continuo de tiempo/espacio.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                ¿Para qué sirve el parámetro k opcional?
              </summary>
              <p className="mt-2 text-sm text-gray-600 pl-4 border-l-2 border-blue-200">
                Si ingresas un valor <strong>k</strong>, la calculadora te mostrará la probabilidad exacta P(X=k) y P(X≤k) para ese valor específico,
                además de destacarlo en las visualizaciones.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                ¿Necesito una API Key de Gemini?
              </summary>
              <p className="mt-2 text-sm text-gray-600 pl-4 border-l-2 border-blue-200">
                No es obligatoria. La API Key permite obtener <strong>análisis interpretativos con IA</strong>, pero todos los cálculos matemáticos
                funcionan perfectamente sin ella.
              </p>
            </details>
          </div>
        </section>

        {/* Ejemplos */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Code className="mr-3 text-purple-600" size={24} />
            Ejemplos Prácticos
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">🎲 Lanzamiento de Monedas</h3>
              <p className="text-sm text-blue-800 mb-2">
                <strong>Problema:</strong> Si lanzo 20 monedas, ¿cuál es la probabilidad de obtener exactamente 10 caras?
              </p>
              <div className="bg-white p-3 rounded-md font-mono text-xs">
                <p>Distribución: <strong>Binomial</strong></p>
                <p>n = 20 (lanzamientos)</p>
                <p>p = 0.5 (moneda justa)</p>
                <p>k = 10 (caras deseadas)</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">📞 Centro de Llamadas</h3>
              <p className="text-sm text-purple-800 mb-2">
                <strong>Problema:</strong> Un call center recibe 5 llamadas/hora en promedio. ¿Probabilidad de recibir más de 7 llamadas?
              </p>
              <div className="bg-white p-3 rounded-md font-mono text-xs">
                <p>Distribución: <strong>Poisson</strong></p>
                <p>λ = 5 (promedio/hora)</p>
                <p>Calcular P(X≤7) y restar de 1</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FileText className="mr-3 text-green-600" size={24} />
            Recursos Adicionales
          </h2>

          <div className="space-y-3">
            <a
              href="https://es.wikipedia.org/wiki/Distribución_binomial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <ExternalLink size={16} className="text-gray-500 group-hover:text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Distribución Binomial - Wikipedia</span>
              </div>
            </a>

            <a
              href="https://es.wikipedia.org/wiki/Distribución_de_Poisson"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <ExternalLink size={16} className="text-gray-500 group-hover:text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Distribución de Poisson - Wikipedia</span>
              </div>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <Github size={16} className="text-gray-500 group-hover:text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Código Fuente - GitHub</span>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpView;
