## Comandos

### Instalar dependencias
Utilizar el siguiente comando, instalará las dependencias del backend y del frontend
`npm install`

### Ejecutar tests
Utilizar el siguiente comando, ejecutará los tests
`npm test`

Solo he realizado los test del lado del backend. En el frontend no he conseguido configurarlo

### Arrancar las 2 aplicaciones
Utilizar el siguiente comando, arrancará los 2 proyectos
`npm run dev`


## Introducción
Prueba técnica de oratrex.

He utilizado el .env para cargar los datos de bbdd. Estos datos se cargan directamente en el archivo config.ts.
Modificar este archivo para consumir BBDD local.


## Flujo
Al arrancar la aplicación, no habrá ningún usuario registrado en la bbdd. Sin embargo, puedes navegar a la página de inicio.
Desde aquí, podrás cargar los datos del csv en el servidor. Se podrán ver 2 botones, uno para cargar el CSV y el otro para subir el archivo.
A falta de un diseño por establecer, la pantalla solo tiene esos 2 botones.

Una vez se hayan cargados los usuarios en bbdd, generados via CSV. Se podrá acceder a la pantalla de login desde el botón
que se encuentra arriba a la derecha, donde pone "Iniciar sesión".

Una vez aquí, se podrá modificar los inputs de usuario y contraseña para entrar con un usuario en concreto. He puesto el usuario
y la contraseña hardcodeados por comodidad.

Al autenticarse correctamente, se le llevará al usuario a la vista /user, donde podrá ver el código QR. La pantalla está
decorada un poco, a falta de un diseño por definir.

## Puntos a mejorar
#### CSRF
No he conseguido hacer que funcione la protección CSRF. Lo he dejado comentado tanto en el backend como en el frontend.
En postman parece funcionar correctamente al enviar el header 'CSRF-Token', pero desde react me tira error 403, ya sea
enviandolo manualmente, añadiendo el header en cada petición sensible, o mediante el uso de
axios.defaults.headers['X-CSRF-Token'] = token

#### TEST
Por otro lado, no he podido configurar jest en el frontend para realizar las pruebas. Por lo tanto, el comando
`npm test`
solo ejecutará las pruebas del lado del servidor.
Las pruebas del servidor testan únicamente aquellas funcionalidades que identifico como funcionalidades importantes:
1. La carga del CSV con headers funciona correctamente y reutilizable
2. Al persistir los usuarios en BBDD, no tienen la misma contraseña de entrada
3. Saneamiento de los datos del CSV

#### UI/UX
No soy experto en esto. Los diseños, así como la experiencia de usuario, se han desarrollado para dar funcionalidad a la prueba técnica.
No he utilizado Figma para hacer un boceo/mockup, puesto que no quería alargar demasiado la prueba.
