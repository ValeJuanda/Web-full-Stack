Sistema Web Full Stack - Matricula
- Este proyecto es una aplicacion web full satck desarrollado con:
Frontend:React + vite
Backend: Node.js + Express.js
Base de datos: MySQL
El sistema permite gestionar usutenticacion mediante tokens JWT Y operaciones relacionada con estudiantes, 
cursos y matriculas.

Instalacion del proyecto
1. Creacion de carpetas
   - mkdir Web Full Stack
   - mkdir backend
   - mkdir frontend
2. Instalar dependecias backend
   - cd backend
   - npm install
3. Instalar dependecias frontend
   - cd frontend
   - npm install
4. Inicializar Servidor y aplicacion
   - EN EL BACKEND
     - npm run dev
   - EN RL FRONTED
     - npm run dev

Puertos Utilizados
- Frontend ->  5173
- Backend	 ->  3001

Arquitectura del proyecto:
<img width="203" height="532" alt="image" src="https://github.com/user-attachments/assets/b65a3770-74eb-4431-9d1d-dd1e8c09fc3b" />

Tecnologías Utilizadas Backend:
1. Node.js
2. Express.js
3. MySQL
4. JSON Web Token
5. bcrypt
6. CORS
7. dotenv

Tecnologías Utilizadas Frontend:
1. React
2. Vite
3. Axios

Funcionamiento General:
El sistema funciona bajo una arquitectura cliente-servidor.

Flujo de autenticación 
1. El usuario inicia sesión desde el frontend.
2. El backend valida las credenciales.
3. La contraseña se compara usando bcrypt.
4. Se genera un token JWT.
5. El token se almacena en localStorage.
6. El frontend envía el token en cada petición protegida.
7. El middleware verifica el token antes de permitir acceso.

 -- Backend: -- 
1. Server.js
En el backend encontramos un archivo llamado server.js este archivo es el archivo principal del backend
sus funciones principales son:
- Inicializar Express
- Configurar middlewares
- Habilitar CORS
- Registrar rutas
- Iniciar el servidor

2. Routes
La carpeta routes como su nombre lo indica contiene las rutas de la API:
-> EJEMPPLO: routes/auth.js
   esta maneja Maneja: Login - Registro - Autenticación

3. Controllers
Aqui contenemos lo que es la logica del negocio y su funcion es:
- Validar usuarios
- Generar JWT
- Registrar usuarios
- Responder solicitudes

4. Models
Esta se encarga de la comunicacion con MySQL
Funciones:
- Consultas SQL
- Inserciones
- Actualizaciones
- Eliminaciones

5. Middleware
Contiene funciones intermedias de seguridad.
Ejemplo:
middleware/auth.js
Funciones:
- Verificar token JWT
- Proteger rutas privadas
- Validar permisos de administrador

6. Config
Configuraciones globales del proyecto.
Ejemplo:
config/db.js
Se encarga de:Crear conexión con MySQL - Manejar pool de conexiones

-- Frontend: --
El frontend es la parte visual del sistema, es decir, la interfaz con la que interactua el usuario
esta fue desarrollada usando
1. REACT
2. vite
3. axios

Estructura:
<img width="152" height="216" alt="image" src="https://github.com/user-attachments/assets/a6b62dfb-4154-49ca-947b-ae12fb24f6f2" />

El main.jsx archivo principal del frontend.
Funciones principales
- Renderizar la aplicación React
- Cargar el componente principal
- Conectar React con el HTML

1. App,jsx
Es el componente principal de la aplicación.
- Funciones
  - Definir rutas
  - Mostrar páginas
  - Organizar la estructura general
    - Ejemplo: Login - Dashboard - Cursos - Matrículas - Usuarios

2. Pages
Contiene las páginas principales del sistema.
 - Ejemplos: Login.jsx - Dashboard.jsx - Cursos.jsx - Matriculas.jsx
Su función es que cada archivo representa una vista diferente de la aplicación.

3. Components
Contiene componentes reutilizables.
 - Ejemplos: Navbar.jsx - Sidebar.jsx - Tabla.jsx - Formulario.jsx - Función
Permite reutilizar código visual para mantener el proyecto organizado.

4. Services
Contiene la configuración de conexión con el backend.
- Ejemplo: api.js
Configura Axios para consumir la API REST.
Ejemplo:
<img width="286" height="73" alt="image" src="https://github.com/user-attachments/assets/c47c0d9c-bd80-4d17-b99d-6db6b25bed15" />

Que hace axios en este proyecto ?
Axios nos permite:
1. Enviar peticiones HTTP
2. Recibir respuestas del backend
3. Consumir la API RESST

Flujo del Frontend:
- Inicio de sesión
- Usuario escribe credenciales.
- React captura los datos.
- Axios envía petición al backend.
- Backend valida usuario.
- Se recibe el token JWT.
- El token se guarda en localStorage.
- React mantiene la sesión activa.

Características Principales:
- Autenticación JWT
- Contraseñas cifradas
- Arquitectura modular
- API REST
- Protección de rutas
- Comunicación frontend-backend
- Gestión de usuarios

Proyecto desarrollado usando React, Express y MySQL bajo arquitectura Full Stack.
