import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ConsolePanel from './components/ConsolePanel';
import ChartsPanel from './components/ChartsPanel';
import ReferenceView from './components/ReferenceView';
import SettingsView from './components/SettingsView';
import HelpView from './components/HelpView';
import { Play, CheckCircle, Calculator } from 'lucide-react';
import {
  binomialPMF,
  binomialCDF,
  binomialMean,
  binomialVariance,
  generateBinomialDistribution,
  poissonPMF,
  poissonCDF,
  poissonMean,
  poissonVariance,
  generatePoissonDistribution,
  generateCDFData,
  factorial
} from './utils/mathUtils';
import { DistributionResult, AppStatus, DistributionType } from './types';
import { generateDataInsight } from './services/geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('calculator');
  const [status, setStatus] = useState<AppStatus>(AppStatus.READY);
  const [logs, setLogs] = useState<string[]>([]);
  const [distributionType, setDistributionType] = useState<DistributionType>(DistributionType.BINOMIAL);
  const [result, setResult] = useState<DistributionResult | null>(null);

  // Parámetros Binomial
  const [n, setN] = useState<string>('10');
  const [p, setP] = useState<string>('0.5');
  const [kBinomial, setKBinomial] = useState<string>('');

  // Parámetros Poisson
  const [lambda, setLambda] = useState<string>('3');
  const [kPoisson, setKPoisson] = useState<string>('');

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const handleCalculate = async () => {
    setStatus(AppStatus.PROCESSING);
    setLogs([]);

    setTimeout(async () => {
      try {
        if (distributionType === DistributionType.BINOMIAL) {
          await calculateBinomial();
        } else {
          await calculatePoisson();
        }
      } catch (error: any) {
        addLog(`❌ Error: ${error.message}`);
        setStatus(AppStatus.ERROR);
      }
    }, 500);
  };

  const calculateBinomial = async () => {
    const nVal = parseInt(n);
    const pVal = parseFloat(p);
    const kVal = kBinomial ? parseInt(kBinomial) : undefined;

    // Validaciones
    if (isNaN(nVal) || nVal < 1 || nVal > 100) {
      throw new Error('n debe ser un entero entre 1 y 100');
    }
    if (isNaN(pVal) || pVal < 0 || pVal > 1) {
      throw new Error('p debe estar entre 0 y 1');
    }
    if (kVal !== undefined && (isNaN(kVal) || kVal < 0 || kVal > nVal)) {
      throw new Error('k debe ser un entero entre 0 y n');
    }

    addLog('═══════════════════════════════════════════');
    addLog('📊 DISTRIBUCIÓN BINOMIAL');
    addLog('═══════════════════════════════════════════');
    addLog(`Parámetros:`);
    addLog(`  n (ensayos): ${nVal}`);
    addLog(`  p (probabilidad éxito): ${pVal}`);
    if (kVal !== undefined) {
      addLog(`  k (valor específico): ${kVal}`);
    }

    const mean = binomialMean(nVal, pVal);
    const variance = binomialVariance(nVal, pVal);
    const stdDev = Math.sqrt(variance);

    addLog('');
    addLog('Estadísticas:');
    addLog(`  Media (μ): ${mean.toFixed(4)}`);
    addLog(`  Varianza (σ²): ${variance.toFixed(4)}`);
    addLog(`  Desviación Estándar (σ): ${stdDev.toFixed(4)}`);

    const pmfData = generateBinomialDistribution(nVal, pVal);
    const cdfData = generateCDFData(pmfData);

    const tableData = pmfData.slice(0, 15).map(point => ({
      k: point.k,
      pmf: point.probability,
      cdf: cdfData.find(c => c.k === point.k)?.cumulative || 0
    }));

    let specificProbability: number | undefined;
    let specificCumulative: number | undefined;

    if (kVal !== undefined) {
      specificProbability = binomialPMF(kVal, nVal, pVal);
      specificCumulative = binomialCDF(kVal, nVal, pVal);

      addLog('');
      addLog('Probabilidades específicas:');
      addLog(`  P(X = ${kVal}): ${(specificProbability * 100).toFixed(4)}%`);
      addLog(`  P(X ≤ ${kVal}): ${(specificCumulative * 100).toFixed(4)}%`);
      addLog(`  P(X > ${kVal}): ${((1 - specificCumulative) * 100).toFixed(4)}%`);
    }

    const distributionResult: DistributionResult = {
      type: 'binomial',
      params: { n: nVal, p: pVal, k: kVal },
      mean,
      variance,
      stdDev,
      pmfData,
      cdfData,
      tableData,
      specificProbability,
      specificCumulative
    };

    setResult(distributionResult);

    // Gemini Insight
    try {
      if (process.env.API_KEY) {
        addLog('');
        addLog('🤖 Solicitando análisis IA...');
        const insight = await generateDataInsight(distributionResult);
        addLog(`💡 ${insight}`);
      }
    } catch (e) {
      // Ignorar si falla
    }

    addLog('');
    addLog('✅ Cálculo finalizado con éxito');
    setStatus(AppStatus.READY);
  };

  const calculatePoisson = async () => {
    const lambdaVal = parseFloat(lambda);
    const kVal = kPoisson ? parseInt(kPoisson) : undefined;

    // Validaciones
    if (isNaN(lambdaVal) || lambdaVal <= 0) {
      throw new Error('λ (lambda) debe ser mayor que 0');
    }
    if (kVal !== undefined && (isNaN(kVal) || kVal < 0)) {
      throw new Error('k debe ser un entero no negativo');
    }

    addLog('═══════════════════════════════════════════');
    addLog('📊 DISTRIBUCIÓN DE POISSON');
    addLog('═══════════════════════════════════════════');
    addLog(`Parámetros:`);
    addLog(`  λ (lambda - tasa promedio): ${lambdaVal}`);
    if (kVal !== undefined) {
      addLog(`  k (valor específico): ${kVal}`);
    }

    const mean = poissonMean(lambdaVal);
    const variance = poissonVariance(lambdaVal);
    const stdDev = Math.sqrt(variance);

    addLog('');
    addLog('Estadísticas:');
    addLog(`  Media (μ): ${mean.toFixed(4)}`);
    addLog(`  Varianza (σ²): ${variance.toFixed(4)}`);
    addLog(`  Desviación Estándar (σ): ${stdDev.toFixed(4)}`);

    const pmfData = generatePoissonDistribution(lambdaVal);
    const cdfData = generateCDFData(pmfData);

    const tableData = pmfData.slice(0, 15).map(point => ({
      k: point.k,
      pmf: point.probability,
      cdf: cdfData.find(c => c.k === point.k)?.cumulative || 0
    }));

    let specificProbability: number | undefined;
    let specificCumulative: number | undefined;

    if (kVal !== undefined) {
      specificProbability = poissonPMF(kVal, lambdaVal);
      specificCumulative = poissonCDF(kVal, lambdaVal);

      addLog('');
      addLog('Probabilidades específicas:');
      addLog(`  P(X = ${kVal}): ${(specificProbability * 100).toFixed(4)}%`);
      addLog(`  P(X ≤ ${kVal}): ${(specificCumulative * 100).toFixed(4)}%`);
      addLog(`  P(X > ${kVal}): ${((1 - specificCumulative) * 100).toFixed(4)}%`);
    }

    const distributionResult: DistributionResult = {
      type: 'poisson',
      params: { lambda: lambdaVal, k: kVal },
      mean,
      variance,
      stdDev,
      pmfData,
      cdfData,
      tableData,
      specificProbability,
      specificCumulative
    };

    setResult(distributionResult);

    // Gemini Insight
    try {
      if (process.env.API_KEY) {
        addLog('');
        addLog('🤖 Solicitando análisis IA...');
        const insight = await generateDataInsight(distributionResult);
        addLog(`💡 ${insight}`);
      }
    } catch (e) {
      // Ignorar si falla
    }

    addLog('');
    addLog('✅ Cálculo finalizado con éxito');
    setStatus(AppStatus.READY);
  };

  // Renderizar vista según selección
  const renderMainContent = () => {
    switch (activeView) {
      case 'reference':
        return <ReferenceView />;
      case 'settings':
        return <SettingsView />;
      case 'help':
        return <HelpView />;
      case 'calculator':
      default:
        return (
          <>
            {/* Header */}
            <header className="bg-white px-8 py-5 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Calculadora de Distribuciones Discretas</h1>
                <p className="text-sm text-gray-500 mt-1">Binomial, Factorial y Poisson</p>
              </div>

              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                <div className={`w-2.5 h-2.5 rounded-full ${status === AppStatus.PROCESSING ? 'bg-yellow-400 animate-pulse' : 'bg-[#28A745]'}`}></div>
                <span className="text-sm font-semibold text-[#28A745]">{status === AppStatus.PROCESSING ? 'Calculando...' : 'Listo'}</span>
                {status === AppStatus.READY && <CheckCircle size={16} className="text-[#28A745] ml-1" />}
              </div>
            </header>

            {/* Main Content Grid */}
            <div className="flex-1 p-6 grid grid-cols-12 grid-rows-6 gap-6 overflow-hidden">

              {/* Control Panel */}
              <div className="col-span-5 row-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex flex-col h-full">
                <div className="mb-3 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-800">Panel de Control</h3>
                  <Calculator size={20} className="text-blue-600" />
                </div>

                <div className="flex-1 flex flex-col space-y-4">
                  {/* Distribution Type Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Tipo de Distribución</label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setDistributionType(DistributionType.BINOMIAL)}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${distributionType === DistributionType.BINOMIAL
                          ? 'bg-[#2E74B5] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        Binomial
                      </button>
                      <button
                        onClick={() => setDistributionType(DistributionType.POISSON)}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${distributionType === DistributionType.POISSON
                          ? 'bg-[#2E74B5] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        Poisson
                      </button>
                    </div>
                  </div>

                  {/* Binomial Inputs */}
                  {distributionType === DistributionType.BINOMIAL && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            n (ensayos)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={n}
                            onChange={(e) => setN(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            p (probabilidad)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="1"
                            step="0.01"
                            value={p}
                            onChange={(e) => setP(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          k (valor específico - opcional)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={kBinomial}
                          onChange={(e) => setKBinomial(e.target.value)}
                          placeholder="Dejar vacío para ver toda la distribución"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </>
                  )}

                  {/* Poisson Inputs */}
                  {distributionType === DistributionType.POISSON && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          λ (lambda - tasa promedio)
                        </label>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={lambda}
                          onChange={(e) => setLambda(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          k (valor específico - opcional)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={kPoisson}
                          onChange={(e) => setKPoisson(e.target.value)}
                          placeholder="Dejar vacío para ver toda la distribución"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </>
                  )}

                  <button
                    onClick={handleCalculate}
                    disabled={status === AppStatus.PROCESSING}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md bg-[#2E74B5] text-white font-medium hover:bg-blue-700 shadow-md transition-all active:transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-auto"
                  >
                    <Play size={18} fill="currentColor" />
                    <span>Calcular</span>
                  </button>
                </div>
              </div>

              <div className="col-span-7 row-span-2">
                <ConsolePanel logs={logs} />
              </div>

              {/* Charts Panel */}
              <div className="col-span-12 row-span-4 pb-2">
                <ChartsPanel data={result} />
              </div>

            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 font-sans">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <main className="w-4/5 h-full flex flex-col relative overflow-hidden">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default App;