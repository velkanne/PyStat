import React, { useState } from 'react';
import { Settings as SettingsIcon, Palette, Zap, Globe } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [precision, setPrecision] = useState(4);
  const [theme, setTheme] = useState('blue');
  const [language, setLanguage] = useState('es');

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configuración</h1>
        <p className="text-gray-600 mb-8">Personaliza la apariencia y comportamiento de la calculadora</p>

        {/* Precisión */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Precisión Numérica</h2>
              <p className="text-sm text-gray-600">Decimales mostrados en resultados</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Decimales: {precision}
              </label>
              <input
                type="range"
                min="2"
                max="8"
                value={precision}
                onChange={(e) => setPrecision(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2 (bajo)</span>
                <span>8 (alto)</span>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Ejemplo:</strong> π = {Math.PI.toFixed(precision)}
              </p>
            </div>
          </div>
        </section>

        {/* Tema de Color */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Palette className="text-purple-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Tema de Color</h2>
              <p className="text-sm text-gray-600">Paleta de colores de la interfaz</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'blue', name: 'Azul', color: '#2E74B5' },
              { id: 'green', name: 'Verde', color: '#28A745' },
              { id: 'purple', name: 'Púrpura', color: '#7C3AED' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === t.id
                    ? 'border-gray-800 shadow-md'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div
                  className="w-full h-12 rounded-md mb-2"
                  style={{ backgroundColor: t.color }}
                ></div>
                <p className="text-sm font-medium text-gray-700">{t.name}</p>
              </button>
            ))}
          </div>

          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ Los cambios de tema se aplicarán en la próxima actualización
            </p>
          </div>
        </section>

        {/* Idioma */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="text-green-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Idioma</h2>
              <p className="text-sm text-gray-600">Idioma de la interfaz</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { code: 'es', name: 'Español', flag: '🇪🇸' },
              { code: 'en', name: 'English', flag: '🇺🇸' },
              { code: 'pt', name: 'Português', flag: '🇧🇷' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                  language === lang.code
                    ? 'bg-green-50 border-green-500'
                    : 'bg-white border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-green-600 text-xs font-semibold">✓ Activo</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* API Key (simulado) */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <SettingsIcon className="text-orange-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Gemini API Key</h2>
              <p className="text-sm text-gray-600">Configurar clave para análisis IA</p>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="Pega tu API Key aquí..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Guardar API Key
            </button>
            <p className="text-xs text-gray-500">
              📝 La API Key se guarda en variables de entorno locales (.env.local)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
