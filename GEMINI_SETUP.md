# 🔑 Configurar Gemini AI (Gratis)

## Obtener API Key Gratuita

1. Visita: **https://aistudio.google.com/apikey**
2. Inicia sesión con tu cuenta Google
3. Click en **"Get API Key"** o **"Create API Key"**
4. Copia la clave generada

---

## Configurar en el Proyecto

### Paso 1: Crear archivo `.env.local`

En la raíz del proyecto (`PyStat/`), crear archivo `.env.local`:

```env
GEMINI_API_KEY=tu_api_key_copiada_aqui
```

### Paso 2: Guardar y Reiniciar

1. Guardar el archivo `.env.local`
2. Detener servidor (`Ctrl + C`)
3. Reiniciar: `npm run dev`

---

## Verificar Configuración

Una vez configurado, al calcular distribuciones verás en la consola:

```
🤖 Solicitando análisis IA...
💡 [Análisis generado por Gemini 2.0 Flash]
```

Si no está configurado, verás:

```
⚠️ API Key no configurada. Obtén una gratis en https://aistudio.google.com/apikey
```

---

## Modelo Usado

- **Modelo**: Gemini 2.0 Flash Experimental
- **Costo**: **100% Gratuito** ✅
- **Límites**: 1,500 requests/día (más que suficiente)
- **Velocidad**: Respuestas en 1-2 segundos

---

## Características del Análisis IA

- Interpretación de parámetros (n, p, λ)
- Identificación de simetrías y sesgos
- Ejemplos de casos de uso reales
- Explicaciones en lenguaje técnico pero accesible
- Análisis contextual según distribución

---

## Troubleshooting

### ❌ Error: API Key inválida

**Solución**: Verificar que la clave esté correcta en `.env.local` (sin espacios ni comillas extra)

### ❌ Error: Límite de cuota excedido

**Solución**:

- Esperar 24 horas para que se reinicie el límite
- Crear otra API Key con otra cuenta Google (gratis)

### ⚠️ No aparece mensaje de IA

**Posibles causas**:

1. `.env.local` no existe o está mal nombrado
2. No reiniciaste el servidor después de crear `.env.local`
3. La variable se llama `API_KEY` en lugar de `GEMINI_API_KEY`

**Verificar**: El `vite.config.ts` mapea `GEMINI_API_KEY` → `API_KEY` internamente

---

## Funcionamiento sin API Key

La aplicación **funciona completamente** sin API Key:

- ✅ Todos los cálculos matemáticos
- ✅ Visualizaciones PMF/CDF
- ✅ Tablas de probabilidades
- ❌ Análisis IA (requiere API Key)

---

## Seguridad

- ✅ `.env.local` está en `.gitignore` (no se sube a GitHub)
- ✅ La API Key solo se usa en localhost
- ✅ No se expone en el código cliente

---

## Links Útiles

- **Obtener API Key**: https://aistudio.google.com/apikey
- **Documentación Gemini**: https://ai.google.dev/gemini-api/docs
- **Limits & Quotas**: https://ai.google.dev/pricing

---

> **💡 Tip**: La API Key es gratuita y se renueva automáticamente. No hay tarjeta de crédito requerida.

**Última actualización**: 25/11/2025
