# 📊 Calculadora de Distribuciones Discretas

<div align="center">

![PyStat Calculator](https://img.shields.io/badge/PyStat-Distributions-2E74B5?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)

**Aplicación web para cálculo y visualización de distribuciones de probabilidad discretas**

[Características](#características) • [Instalación](#instalación) • [Uso](#uso) • [Distribuciones](#distribuciones-soportadas)

</div>

---

## 📋 Descripción

**PyStat Calculator** es una aplicación web moderna diseñada para calcular y visualizar distribuciones de probabilidad discretas con una interfaz intuitiva y profesional. Soporta cálculos de **Binomial** y **Poisson**, con integración opcional de **Gemini AI** para análisis interpretativos.

### Características Principales

✨ **Distribuciones Soportadas**

- 🎲 **Binomial**: Para experimentos con resultados binarios (éxito/fracaso)
- 📈 **Poisson**: Para eventos raros en intervalos de tiempo/espacio

📊 **Visualizaciones Interactivas**

- **PMF (Probability Mass Function)**: Gráfico de barras con probabilidades discretas
- **CDF (Cumulative Distribution Function)**: Función de distribución acumulada
- **Tabla de Probabilidades**: Vista tabular con primeros 15 valores

🧮 **Cálculos Precisos**

- Función factorial con memoización
- Coeficiente binomial optimizado
- Manejo numérico estable para valores grandes
- Estadísticas completas: μ, σ², σ

🤖 **IA Integrada (Opcional)**

- Análisis interpretativo con Gemini 2.0 Flash
- Casos de uso contextuales
- Recomendaciones sobre aplicabilidad

🎨 **Diseño Profesional**

- Estética minimalista con paleta azul (#2E74B5)
- Layout responsivo con Grid CSS
- Consola de logs estilo terminal
- Animaciones suaves y tooltips detallados

---

## 🚀 Instalación

### Prerrequisitos

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **npm** (incluido con Node.js)

### Pasos

```bash
# 1. Clonar el repositorio (o descargar)
cd PyStat

# 2. Instalar dependencias
npm install

# 3. (Opcional) Configurar API Key de Gemini
# Crear archivo .env.local en la raíz del proyecto
echo "GEMINI_API_KEY=tu_api_key_aqui" > .env.local

# 4. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000/**

---

## 📖 Uso

### 1. Seleccionar Distribución

En el **Panel de Control**, elige entre:

- **Binomial**: Para n ensayos independientes con probabilidad p
- **Poisson**: Para conteo de eventos raros con tasa λ

### 2. Ingresar Parámetros

#### Binomial

- **n** (ensayos): Número de experimentos [1-100]
- **p** (probabilidad): Probabilidad de éxito [0-1]
- **k** (opcional): Valor específico a calcular

#### Poisson

- **λ** (lambda): Tasa promedio de eventos [>0]
- **k** (opcional): Valor específico a calcular

### 3. Calcular y Visualizar

Presiona **"Calcular"** para:

- Ver estadísticas en la consola (μ, σ², σ)
- Visualizar gráfico PMF con distribución completa
- Explorar CDF acumulativa
- Consultar tabla de probabilidades

### 4. Explorar Visualizaciones

Usa los **tabs** en el panel de gráficos:

- **PMF**: Distribución de probabilidades
- **CDF**: Probabilidad acumulada
- **Tabla**: Vista tabular detallada

---

## 📐 Distribuciones Soportadas

### Distribución Binomial

**Fórmula PMF**:

```
P(X = k) = C(n,k) × p^k × (1-p)^(n-k)
```

**Parámetros**:

- `n`: Número de ensayos independientes
- `p`: Probabilidad de éxito en cada ensayo
- `k`: Número de éxitos deseados

**Estadísticas**:

- Media: `μ = n × p`
- Varianza: `σ² = n × p × (1-p)`

**Ejemplo de Uso**:

> Lanzar 10 monedas (n=10, p=0.5): ¿Cuál es la probabilidad de obtener exactamente 5 caras?

---

### Distribución de Poisson

**Fórmula PMF**:

```
P(X = k) = (λ^k × e^(-λ)) / k!
```

**Parámetros**:

- `λ` (lambda): Tasa promedio de ocurrencia
- `k`: Número de eventos observados

**Estadísticas**:

- Media: `μ = λ`
- Varianza: `σ² = λ`

**Ejemplo de Uso**:

> En promedio recibo 3 emails por hora (λ=3): ¿Cuál es la probabilidad de recibir exactamente 5 emails en la próxima hora?

---

## 🔧 Tecnologías

| Tecnología       | Versión | Uso             |
| ---------------- | ------- | --------------- |
| React            | 19.2.0  | Framework UI    |
| TypeScript       | 5.8.2   | Tipado estático |
| Vite             | 6.2.0   | Build tool      |
| Recharts         | 3.4.1   | Visualizaciones |
| Tailwind CSS     | 3.x     | Estilos         |
| Lucide React     | 0.554.0 | Iconos          |
| Google Gemini AI | 1.30.0  | Análisis IA     |

---

## 📁 Estructura del Proyecto

```
PyStat/
├── components/
│   ├── Sidebar.tsx           # Navegación lateral
│   ├── ConsolePanel.tsx      # Panel de logs
│   └── ChartsPanel.tsx       # Visualizaciones
├── services/
│   └── geminiService.ts      # Integración Gemini AI
├── utils/
│   └── mathUtils.ts          # Funciones matemáticas
├── types.ts                  # Interfaces TypeScript
├── App.tsx                   # Componente principal
├── index.html                # HTML base
├── vite.config.ts            # Configuración Vite
└── README.md                 # Este archivo
```

---

## 🎓 Casos de Uso

### Binomial

- 🎯 Control de calidad: productos defectuosos en lotes
- 🏥 Medicina: eficacia de tratamientos
- 📊 Encuestas: proporción de respuestas
- 🎲 Juegos de azar: tiradas de dados/monedas

### Poisson

- 📞 Call centers: llamadas por hora
- 🚗 Tráfico: accidentes en carreteras
- 🌐 Servidores web: visitas por minuto
- ☢️ Física: desintegración radiactiva

---

## 🔑 Configuración API Key (Opcional)

Para habilitar el análisis con IA:

1. Obtén una API Key de [Google AI Studio](https://ai.google.dev/)
2. Crea `.env.local` en la raíz:
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```
3. Reinicia el servidor: `npm run dev`

> **Nota**: La app funciona completamente sin API key, solo se deshabilitarán los insights de IA.

---

## 🏗️ Build para Producción

```bash
# Generar build optimizado
npm run build

# Preview del build
npm run preview
```

Los archivos optimizados se generarán en `/dist`.

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en el repositorio.

---

<div align="center">

**Hecho con ❤️ usando React + TypeScript + Vite**

![Version](https://img.shields.io/badge/version-2.0.0-blue)

</div>
