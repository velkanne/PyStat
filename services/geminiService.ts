import { GoogleGenAI } from "@google/genai";
import { DistributionResult } from "../types";

// API Key de desarrollo para localhost (gratuita)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Verificar si estamos en localhost
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

/**
 * Genera análisis interpretativo de distribuciones usando Gemini 2.0 Flash
 * Modelo: gemini-2.0-flash-exp (gratuito)
 */
export const generateDataInsight = async (result: DistributionResult): Promise<string> => {
  // Si no hay API key
  if (!GEMINI_API_KEY) {
    if (isLocalhost) {
      return "⚠️ API Key no configurada. Obtén una gratis en https://aistudio.google.com/apikey y configúrala en .env.local";
    }
    return "API Key no disponible. Análisis IA deshabilitado.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    let summaryPrompt = '';

    if (result.type === 'binomial') {
      const params = result.params as any;
      summaryPrompt = `
        Actúa como un estadístico experto. Analiza esta distribución BINOMIAL:
        
        Parámetros:
        - n (ensayos): ${params.n}
        - p (probabilidad de éxito): ${params.p}
        ${params.k !== undefined ? `- k (valor específico consultado): ${params.k}` : ''}
        
        Estadísticas calculadas:
        - Media: ${result.mean.toFixed(4)}
        - Varianza: ${result.variance.toFixed(4)}
        - Desviación Estándar: ${result.stdDev.toFixed(4)}
        
        ${result.specificProbability !== undefined 
          ? `- P(X=${params.k}): ${(result.specificProbability * 100).toFixed(4)}%
        - P(X≤${params.k}): ${(result.specificCumulative! * 100).toFixed(4)}%` 
          : ''}
        
        Proporciona un análisis interpretativo breve (máximo 3 frases) que incluya:
        1. Interpretación práctica de los parámetros
        2. Si la distribución está sesgada o es simétrica
        3. Un ejemplo de aplicación real de estos parámetros
        
        Usa un tono técnico pero accesible en español.
      `;
    } else {
      const params = result.params as any;
      summaryPrompt = `
        Actúa como un estadístico experto. Analiza esta distribución de POISSON:
        
        Parámetros:
        - λ (lambda - tasa promedio): ${params.lambda}
        ${params.k !== undefined ? `- k (valor específico consultado): ${params.k}` : ''}
        
        Estadísticas calculadas:
        - Media: ${result.mean.toFixed(4)}
        - Varianza: ${result.variance.toFixed(4)}
        - Desviación Estándar: ${result.stdDev.toFixed(4)}
        
        ${result.specificProbability !== undefined 
          ? `- P(X=${params.k}): ${(result.specificProbability * 100).toFixed(4)}%
        - P(X≤${params.k}): ${(result.specificCumulative! * 100).toFixed(4)}%` 
          : ''}
        
        Proporciona un análisis interpretativo breve (máximo 3 frases) que incluya:
        1. Interpretación de lambda en contextos prácticos
        2. Características de esta distribución (dispersión, cola)
        3. Un ejemplo de aplicación real para este valor de lambda
        
        Usa un tono técnico pero accesible en español.
      `;
    }

    // Usar Gemini 2.0 Flash (gratuito)
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: summaryPrompt,
    });

    return response.text || "No se pudo generar el análisis.";
  } catch (error: any) {
    console.error("Error generating insight:", error);
    
    // Mensajes de error específicos
    if (error.message?.includes('API key')) {
      return "❌ API Key inválida. Verifica tu clave en .env.local";
    }
    if (error.message?.includes('quota')) {
      return "⚠️ Límite de cuota excedido. Intenta más tarde o usa otra API Key.";
    }
    
    return `⚠️ Error de IA: ${error.message || 'No se pudo conectar con Gemini'}`;
  }
};

/**
 * Verifica si Gemini está disponible y listo para usar
 */
export const isGeminiAvailable = (): boolean => {
  return !!GEMINI_API_KEY;
};

/**
 * Obtiene información sobre el modelo actual
 */
export const getModelInfo = () => {
  return {
    model: 'Gemini 2.0 Flash',
    version: 'gemini-2.0-flash-exp',
    price: 'Gratuito',
    available: isGeminiAvailable(),
    localhost: isLocalhost
  };
};