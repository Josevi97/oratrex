## Database connection
Para los datos de la conexión, he utilizado dotenv, por lo que el archivo .env no está incluido en el repositorio. Solo estarán
aquellos datos dependientes de la máquina host. El puerto del servidor está establecido por defecto en el archivo .config.ts. La existencia
de este archivo es para tener los datos del .env tipados, además de un facil acceso a los mismos.
Si no me equivoco, existe una forma de crear la base de datos en tiempo de ejecución (desarrollo), pero no he mirado demasiado
sobre como hacerlo en nodejs.

He decidido utilizar sequalizer como ORM de la base de datos. En caso de querer cambiarlo en algún momento, he utilizado mi
propia interfaz para encapsular el sequalizer (minimamente).

## Architecture
Arquitectura en 3 capas: Controlador - Servicio - Repositorio

El sistema arranca en el index.ts. En este fichero creamos la conexión a la base de datos, así como el servidor, redirigiendo
las peticiones a los controladores pertinentes.

He creado los "makers" para cada tipo de archivo de un resource (controlador, servicio, repositorio...), para poder crear una instancia mediante
inyección de dependencias.

Así pues, el flujo sería el siguiente =>
1. Index establece la conexión a la base de datos
2. Index inicializa el servidor y establece las rutas
3. Cualquier petición, se redirige a su controlador pertinente. Por defecto, el prefijo de las rutas es /api
4. Cada controlador tendrá un servicio, donde se encontrará toda la lógica de negocio.
5. Los servicios implementarán 1 o varios repositorios según hagan falta, los cuales serán la capa que se comunicará con la bbdd.
