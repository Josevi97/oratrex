## Database connection
He decidido utilizar sequalizer como ORM para la base de datos.
En caso de querer cambiarlo en algún momento, he utilizado mi propia interfaz para encapsular el sequalizer.

## Architecture
Arquitectura en 3 capas: Controlador - Servicio - Repositorio

El sistema arranca en el index.ts. En este fichero creamos la conexión a la base de datos, así como el servidor, redirigiendo
las peticiones a los controladores pertinentes.

En el caso del controlador, servicio y repositorio, he creado los "makers" para poder crear una instancia mediante
inyección de dependencias para el testing.

Así pues, el flujo sería el siguiente =>
1. Index establece la conexión la base de datos
2. Index inicializa el servidor y establece las rutas
3. Cualquier petición, se redirige a su controlador pertinente.
4. Cada controlador tendrá un servicio, donde se encontrará toda la lógica de negocio.
5. Los servicios implementarán 1 o varios repositorios según hagan falta, los cuales serán la capa que se comunicará con la bbdd
