import { PMFPoint, CDFPoint } from '../types';

// ============================================
// FUNCIONES BÁSICAS
// ============================================

// Memoización para factorial
const factorialCache: Map<number, number> = new Map();

/**
 * Calcula el factorial de n con memoización
 * @param n - Número entero no negativo
 * @returns n!
 */
export const factorial = (n: number): number => {
  if (n < 0) throw new Error('Factorial no definido para números negativos');
  if (n === 0 || n === 1) return 1;
  
  if (factorialCache.has(n)) {
    return factorialCache.get(n)!;
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  factorialCache.set(n, result);
  return result;
};

/**
 * Calcula el coeficiente binomial C(n, k) = n! / (k! * (n-k)!)
 * @param n - Total de elementos
 * @param k - Elementos a elegir
 * @returns Coeficiente binomial
 */
export const combinatorial = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  // Optimización: C(n,k) = C(n, n-k)
  k = Math.min(k, n - k);
  
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  
  return Math.round(result);
};

// ============================================
// DISTRIBUCIÓN BINOMIAL
// ============================================

/**
 * Calcula la función de masa de probabilidad (PMF) de la distribución binomial
 * P(X = k) = C(n,k) * p^k * (1-p)^(n-k)
 * @param k - Número de éxitos
 * @param n - Número de ensayos
 * @param p - Probabilidad de éxito en cada ensayo
 * @returns Probabilidad P(X = k)
 */
export const binomialPMF = (k: number, n: number, p: number): number => {
  if (k < 0 || k > n) return 0;
  if (p < 0 || p > 1) throw new Error('La probabilidad p debe estar entre 0 y 1');
  
  const coef = combinatorial(n, k);
  const prob = coef * Math.pow(p, k) * Math.pow(1 - p, n - k);
  
  return prob;
};

/**
 * Calcula la función de distribución acumulada (CDF) de la distribución binomial
 * P(X ≤ k)
 * @param k - Valor máximo
 * @param n - Número de ensayos
 * @param p - Probabilidad de éxito
 * @returns Probabilidad acumulada P(X ≤ k)
 */
export const binomialCDF = (k: number, n: number, p: number): number => {
  let sum = 0;
  for (let i = 0; i <= k; i++) {
    sum += binomialPMF(i, n, p);
  }
  return sum;
};

/**
 * Genera el array completo de la distribución binomial
 * @param n - Número de ensayos
 * @param p - Probabilidad de éxito
 * @returns Array de puntos PMF
 */
export const generateBinomialDistribution = (n: number, p: number): PMFPoint[] => {
  const distribution: PMFPoint[] = [];
  
  for (let k = 0; k <= n; k++) {
    const probability = binomialPMF(k, n, p);
    distribution.push({
      k,
      probability,
      label: k.toString()
    });
  }
  
  return distribution;
};

/**
 * Calcula la media de la distribución binomial
 * @param n - Número de ensayos
 * @param p - Probabilidad de éxito
 * @returns Media = n * p
 */
export const binomialMean = (n: number, p: number): number => {
  return n * p;
};

/**
 * Calcula la varianza de la distribución binomial
 * @param n - Número de ensayos
 * @param p - Probabilidad de éxito
 * @returns Varianza = n * p * (1-p)
 */
export const binomialVariance = (n: number, p: number): number => {
  return n * p * (1 - p);
};

// ============================================
// DISTRIBUCIÓN DE POISSON
// ============================================

/**
 * Calcula la función de masa de probabilidad (PMF) de la distribución de Poisson
 * P(X = k) = (λ^k * e^(-λ)) / k!
 * @param k - Número de eventos
 * @param lambda - Tasa promedio de ocurrencia
 * @returns Probabilidad P(X = k)
 */
export const poissonPMF = (k: number, lambda: number): number => {
  if (k < 0) return 0;
  if (lambda <= 0) throw new Error('Lambda debe ser mayor que 0');
  
  // Evitar overflow usando logaritmos para valores grandes
  if (k > 170) {
    // log(P(X=k)) = k*log(λ) - λ - log(k!)
    const logProb = k * Math.log(lambda) - lambda - logFactorial(k);
    return Math.exp(logProb);
  }
  
  const prob = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
  return prob;
};

/**
 * Logaritmo de factorial para cálculos numéricos estables
 */
const logFactorial = (n: number): number => {
  if (n <= 1) return 0;
  let sum = 0;
  for (let i = 2; i <= n; i++) {
    sum += Math.log(i);
  }
  return sum;
};

/**
 * Calcula la función de distribución acumulada (CDF) de la distribución de Poisson
 * P(X ≤ k)
 * @param k - Valor máximo
 * @param lambda - Tasa promedio
 * @returns Probabilidad acumulada P(X ≤ k)
 */
export const poissonCDF = (k: number, lambda: number): number => {
  let sum = 0;
  for (let i = 0; i <= k; i++) {
    sum += poissonPMF(i, lambda);
  }
  return sum;
};

/**
 * Genera el array de la distribución de Poisson hasta un valor máximo k
 * @param lambda - Tasa promedio
 * @param maxK - Valor máximo de k (por defecto hasta percentil 99.9%)
 * @returns Array de puntos PMF
 */
export const generatePoissonDistribution = (lambda: number, maxK?: number): PMFPoint[] => {
  const distribution: PMFPoint[] = [];
  
  // Si no se especifica maxK, calcular hasta que la probabilidad acumulada sea > 0.999
  const max = maxK || Math.max(Math.ceil(lambda + 4 * Math.sqrt(lambda)), 20);
  
  for (let k = 0; k <= max; k++) {
    const probability = poissonPMF(k, lambda);
    
    // Salir si la probabilidad es despreciable
    if (k > lambda * 2 && probability < 1e-6) break;
    
    distribution.push({
      k,
      probability,
      label: k.toString()
    });
  }
  
  return distribution;
};

/**
 * Calcula la media de la distribución de Poisson
 * @param lambda - Tasa promedio
 * @returns Media = lambda
 */
export const poissonMean = (lambda: number): number => {
  return lambda;
};

/**
 * Calcula la varianza de la distribución de Poisson
 * @param lambda - Tasa promedio
 * @returns Varianza = lambda
 */
export const poissonVariance = (lambda: number): number => {
  return lambda;
};

// ============================================
// GENERACIÓN DE DATOS CDF
// ============================================

/**
 * Genera datos de CDF a partir de datos PMF
 * @param pmfData - Array de puntos PMF
 * @returns Array de puntos CDF
 */
export const generateCDFData = (pmfData: PMFPoint[]): CDFPoint[] => {
  const cdfData: CDFPoint[] = [];
  let cumulative = 0;
  
  for (const point of pmfData) {
    cumulative += point.probability;
    cdfData.push({
      k: point.k,
      cumulative,
      label: point.label
    });
  }
  
  return cdfData;
};