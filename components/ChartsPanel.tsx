import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Area, ComposedChart } from 'recharts';
import { DistributionResult, ChartType } from '../types';
import { BarChart3, TrendingUp, Table2 } from 'lucide-react';

interface ChartsPanelProps {
  data: DistributionResult | null;
}

const ChartsPanel: React.FC<ChartsPanelProps> = ({ data }) => {
  const [selectedChart, setSelectedChart] = useState<ChartType>(ChartType.PMF);

  const chartTabs = [
    { type: ChartType.PMF, label: 'PMF', icon: BarChart3 },
    { type: ChartType.CDF, label: 'CDF', icon: TrendingUp },
    { type: ChartType.TABLE, label: 'Tabla', icon: Table2 },
  ];

  const renderPMF = () => {
    if (!data?.pmfData) return null;

    // Destacar k específico si existe
    const specificK = data.type === 'binomial' 
      ? (data.params as any).k 
      : (data.params as any).k;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data.pmfData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="k"
            tick={{ fontSize: 10, fill: '#4B5563' }}
            label={{ value: 'k (número de eventos)', position: 'insideBottom', offset: -10, fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#4B5563' }}
            label={{ value: 'P(X = k)', angle: -90, position: 'insideLeft', fontSize: 12 }}
            tickFormatter={(value) => value.toFixed(3)}
          />
          <Tooltip
            cursor={{ fill: '#F3F4F6' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            formatter={(value: number) => [`${(value * 100).toFixed(4)}%`, 'Probabilidad']}
          />
          <Bar dataKey="probability" name="P(X=k)" radius={[4, 4, 0, 0]}>
            {data.pmfData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.k === specificK ? '#28A745' : '#2E74B5'}
                fillOpacity={entry.k === specificK ? 1 : 0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderCDF = () => {
    if (!data?.cdfData) return null;

    const specificK = data.type === 'binomial'
      ? (data.params as any).k
      : (data.params as any).k;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data.cdfData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="k"
            tick={{ fontSize: 10, fill: '#4B5563' }}
            label={{ value: 'k (número de eventos)', position: 'insideBottom', offset: -10, fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#4B5563' }}
            label={{ value: 'P(X ≤ k)', angle: -90, position: 'insideLeft', fontSize: 12 }}
            domain={[0, 1]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            formatter={(value: number) => [`${(value * 100).toFixed(4)}%`, 'Probabilidad Acumulada']}
          />
          <Area
            type="stepAfter"
            dataKey="cumulative"
            fill="#2E74B5"
            fillOpacity={0.3}
            stroke="#2E74B5"
            strokeWidth={2}
          />
          <Line
            type="stepAfter"
            dataKey="cumulative"
            stroke="#2E74B5"
            strokeWidth={3}
            dot={{ fill: '#2E74B5', r: 3 }}
            activeDot={{ r: 5, fill: '#28A745' }}
          />
          {specificK !== undefined && (
            <Line
              data={data.cdfData.filter(d => d.k === specificK)}
              dataKey="cumulative"
              stroke="#28A745"
              strokeWidth={0}
              dot={{ fill: '#28A745', r: 6, strokeWidth: 2, stroke: '#FFF' }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderTable = () => {
    if (!data?.tableData) return null;

    return (
      <div className="h-full overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#D6E6F2] sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">k</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">P(X = k)</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">P(X ≤ k)</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">%</th>
            </tr>
          </thead>
          <tbody>
            {data.tableData.map((row, index) => {
              const specificK = data.type === 'binomial'
                ? (data.params as any).k
                : (data.params as any).k;
              const isHighlighted = row.k === specificK;

              return (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${isHighlighted ? 'bg-green-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-4 py-2 font-mono font-semibold text-gray-800">{row.k}</td>
                  <td className="px-4 py-2 font-mono text-gray-700">{row.pmf.toFixed(6)}</td>
                  <td className="px-4 py-2 font-mono text-gray-700">{row.cdf.toFixed(6)}</td>
                  <td className="px-4 py-2 text-gray-600">{(row.pmf * 100).toFixed(4)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {data.tableData.length >= 15 && (
          <div className="text-center py-3 text-xs text-gray-500 italic">
            Mostrando primeros 15 valores. Ver gráficos para distribución completa.
          </div>
        )}
      </div>
    );
  };

  const renderChart = () => {
    if (!data) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
          <BarChart3 size={64} className="mb-4 opacity-30" />
          <p className="text-lg">Seleccione parámetros y presione Calcular</p>
        </div>
      );
    }

    switch (selectedChart) {
      case ChartType.PMF:
        return renderPMF();
      case ChartType.CDF:
        return renderCDF();
      case ChartType.TABLE:
        return renderTable();
      default:
        return renderPMF();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="bg-[#D6E6F2] px-6 py-3 border-b border-blue-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-blue-900">VISUALIZACIONES</h3>
          {data && (
            <p className="text-xs text-blue-700 mt-0.5">
              {data.type === 'binomial' ? 'Binomial' : 'Poisson'} | 
              μ = {data.mean.toFixed(2)} | 
              σ² = {data.variance.toFixed(2)}
            </p>
          )}
        </div>

        {/* Chart Type Selector Tabs */}
        <div className="flex space-x-1 bg-white/60 p-1 rounded-lg">
          {chartTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedChart === tab.type;
            return (
              <button
                key={tab.type}
                onClick={() => setSelectedChart(tab.type)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-700 hover:bg-white/80'
                  }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-6 relative">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartsPanel;