# 🌿 Mirage by ReWear - Landing Page App

Landing page oficial de **Mirage by ReWear**, diseñada para presentar las funcionalidades de la plataforma, el equipo de trabajo y gestionar el formulario de contacto para comercios B2B.

---

## 🛠️ Tecnologías y Arquitectura

* **Frontend:** [Angular 22](https://angular.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) + TypeScript
* **Backend:** [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) + TypeScript
* **ORM:** [Prisma](https://www.prisma.io/)
* **Base de Datos:** [Neon PostgreSQL](https://neon.tech/) (Serverless Postgres)
* **Despliegue recomendado:** [Render](https://render.com/) (Backend Web Service + Frontend Static Site)

---

## 📁 Estructura del Proyecto

```text
mi-landing-app/
├── backend/                  # Servidor API REST en Node.js + Express + Prisma
│   ├── prisma/               # Schema y migraciones de la base de datos
│   ├── src/                  # Controladores, modelos y rutas de la API
│   ├── .env.example          # Plantilla de variables de entorno
│   └── package.json
├── frontend/                 # Aplicación cliente Angular SPA
│   ├── src/
│   │   ├── app/              # Componentes, servicios y modelos de Angular
│   │   └── environments/     # Configuración para local y producción
│   └── package.json
├── .gitignore                # Archivos y carpetas ignorados por Git
└── README.md                 # Documentación del proyecto
```

---

## ⚙️ Variables de Entorno (`.env`)

> ⚠️ **IMPORTANTE DE SEGURIDAD:** Nunca subas tus archivos `.env` a GitHub. Ya están incluidos en el `.gitignore`.

En la carpeta `backend/` debes tener un archivo `.env` (puedes guiarte de `backend/.env.example`):

```env
# Puerto del servidor backend (por defecto 3000)
PORT=3000

# Cadena de conexión de tu base de datos en Neon
DATABASE_URL="postgresql://usuario:password@ep-ejemplo.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

---

## 💻 Ejecución en Entorno Local

### 1. Iniciar el Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

El backend se iniciará en `http://localhost:3000`. Puedes verificar su estado en `http://localhost:3000/api/health`.

### 2. Iniciar el Frontend

En otra terminal:

```bash
cd frontend
npm install
npm start
```

Abre tu navegador en `http://localhost:4200`.

---

## 🚀 Guía de Despliegue en Render + Neon

Dado que tu base de datos **ya está activa en Neon**, sigue estos pasos para desplegar en Render:

### Paso 1: Subir el proyecto a GitHub

Desde la carpeta raíz del proyecto (`mi-landing-app`):

```bash
# 1. Inicializar repositorio Git en esta carpeta (si no está inicializado)
git init

# 2. Agregar los archivos al commit
git add .

# 3. Crear el primer commit
git commit -m "feat: setup landing page with angular, express and prisma"

# 4. Vincular a tu repositorio de GitHub (crea uno nuevo en github.com)
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 5. Subir los cambios
git push -u origin main
```

---

### Paso 2: Desplegar el Backend en Render (Web Service)

1. Ve a [dashboard.render.com](https://dashboard.render.com/) e inicia sesión.
2. Haz clic en **New +** > **Web Service**.
3. Conecta tu repositorio de GitHub.
4. Configura los siguientes campos:
   * **Name:** `mirage-landing-api` (o el nombre que prefieras)
   * **Root Directory:** `backend`
   * **Runtime:** `Node`
   * **Build Command:** `npm install && npm run build`
   * **Start Command:** `npm start`
   * **Instance Type:** `Free`
5. En la sección **Environment Variables**, agrega:
   * `DATABASE_URL`: Pega la URL de tu base de datos en **Neon**.
6. Haz clic en **Create Web Service**.
7. Una vez desplegado, copia la URL que te asigna Render (ejemplo: `https://mirage-landing-api.onrender.com`).

---

### Paso 3: Conectar el Frontend con la URL del Backend

1. Abre el archivo `frontend/src/environments/environment.ts`.
2. Actualiza la propiedad `apiUrl` con la URL de tu backend desplegado en Render:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://mirage-landing-api.onrender.com/api',
   };
   ```
3. Guarda el archivo, haz commit y sube los cambios a GitHub:
   ```bash
   git add frontend/src/environments/environment.ts
   git commit -m "chore: update production API URL"
   git push
   ```

---

### Paso 4: Desplegar el Frontend en Render (Static Site)

1. En Render, haz clic en **New +** > **Static Site**.
2. Conecta el mismo repositorio de GitHub.
3. Configura los siguientes campos:
   * **Name:** `mirage-landing`
   * **Root Directory:** `frontend`
   * **Build Command:** `npm install && npm run build`
   * **Publish Directory:** `dist/frontend/browser`
4. En la pestaña **Redirects/Rewrites** (en la configuración del Static Site):
   * **Source:** `/*`
   * **Destination:** `/index.html`
   * **Action:** `Rewrite`
5. Haz clic en **Create Static Site**.

¡Listo! Tu landing page estará 100% en vivo y conectada a tu base de datos en Neon. 🎉

