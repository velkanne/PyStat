# 🚀 Ejecutar PyStat Calculator

## Ruta del Proyecto

```
c:\Users\ttvga\OneDrive\Escritorio\vel\Estadistica\PyStat
```

---

## Inicio Rápido

### Opción 1: Desde Terminal

1. Abrir PowerShell o CMD
2. Navegar al proyecto:
   ```powershell
   cd "c:\Users\ttvga\OneDrive\Escritorio\vel\Estadistica\PyStat"
   ```
3. Ejecutar servidor de desarrollo:
   ```powershell
   npm run dev
   ```
4. Abrir navegador en: **http://localhost:3000/**

---

### Opción 2: Desde VS Code

1. Abrir VS Code
2. **File** → **Open Folder**
3. Seleccionar: `c:\Users\ttvga\OneDrive\Escritorio\vel\Estadistica\PyStat`
4. Abrir terminal integrada (`Ctrl + ñ` o `Ctrl + ~`)
5. Ejecutar:
   ```bash
   npm run dev
   ```
6. Click en el link `http://localhost:3000/` que aparece en la terminal

---

### Opción 3: Script PowerShell (Crear archivo .ps1)

Crear archivo `ejecutar.ps1` en el escritorio con:

```powershell
Set-Location "c:\Users\ttvga\OneDrive\Escritorio\vel\Estadistica\PyStat"
npm run dev
Start-Process "http://localhost:3000/"
```

Hacer doble click en `ejecutar.ps1` para:

- Ir a la carpeta del proyecto
- Iniciar el servidor
- Abrir el navegador automáticamente

---

## Comandos Útiles

| Comando           | Descripción                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Iniciar servidor de desarrollo  |
| `npm run build`   | Compilar para producción        |
| `npm run preview` | Preview del build de producción |
| `npm install`     | Instalar dependencias           |

---

## Parar el Servidor

- En la terminal presionar: `Ctrl + C`
- Confirmar con `S` o `Y`

---

## Verificar Estado

**Si el servidor ya está corriendo**, simplemente abrir:

- **Local**: http://localhost:3000/
- **Red**: http://192.168.56.1:3000/

---

## Troubleshooting

### ❌ Puerto 3000 ocupado

```powershell
# Encontrar proceso usando puerto 3000
netstat -ano | findstr :3000

# Matar proceso (reemplazar PID)
taskkill /PID <numero_pid> /F
```

### ❌ Error de dependencias

```powershell
# Limpiar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
npm install
```

### ❌ Página no carga

1. Verificar que el servidor esté corriendo
2. Revisar logs en la terminal
3. Limpiar caché del navegador (`Ctrl + Shift + R`)

---

## 📋 Checklist Pre-Ejecución

- [ ] Node.js instalado (verificar con `node --version`)
- [ ] Dependencias instaladas (`node_modules` existe)
- [ ] Puerto 3000 disponible
- [ ] (Opcional) API Key en `.env.local` para insights IA

---

## 🌐 URLs de Acceso

Una vez ejecutando, acceder a:

- **Calculadora**: http://localhost:3000/ (vista por defecto)
- **Referencia**: Sidebar → Referencia
- **Configuración**: Sidebar → Configuración
- **Ayuda**: Sidebar → Ayuda

---

## 📁 Estructura Recordatorio

```
PyStat/
├── components/          # Componentes React
├── services/           # Servicios (Gemini AI)
├── utils/              # Funciones matemáticas
├── App.tsx             # Componente principal
├── index.html          # HTML base
├── package.json        # Dependencias
└── README.md           # Documentación completa
```

---

> **💡 Tip**: Guardar este archivo como favorito para acceso rápido al proyecto.

**Última actualización**: 25/11/2025
