// ============================================
// TIPOS DE DATOS PARA GRÁFICOS
// ============================================

export interface PMFPoint {
  k: number;
  probability: number;
  label: string;
}

export interface CDFPoint {
  k: number;
  cumulative: number;
  label: string;
}

export interface ProbabilityTableRow {
  k: number;
  pmf: number;
  cdf: number;
}

// ============================================
// PARÁMETROS DE DISTRIBUCIONES
// ============================================

export interface BinomialParams {
  n: number;      // número de ensayos
  p: number;      // probabilidad de éxito
  k?: number;     // valor específico (opcional)
}

export interface PoissonParams {
  lambda: number; // tasa promedio (λ)
  k?: number;     // valor específico (opcional)
}

export type DistributionParams = BinomialParams | PoissonParams;

// ============================================
// RESULTADO DE ANÁLISIS
// ============================================

export interface DistributionResult {
  type: 'binomial' | 'poisson';
  params: BinomialParams | PoissonParams;
  mean: number;
  variance: number;
  stdDev: number;
  pmfData: PMFPoint[];
  cdfData: CDFPoint[];
  tableData: ProbabilityTableRow[];
  specificProbability?: number;    // P(X=k) si k es especificado
  specificCumulative?: number;      // P(X≤k) si k es especificado
}

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

export enum AppStatus {
  IDLE = 'Esperando',
  PROCESSING = 'Calculando',
  READY = 'Listo',
  ERROR = 'Error',
}

export enum DistributionType {
  BINOMIAL = 'binomial',
  POISSON = 'poisson',
}

export enum ChartType {
  PMF = 'pmf',
  CDF = 'cdf',
  TABLE = 'table',
  COMPARISON = 'comparison',
}