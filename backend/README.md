## Database connection
Para los datos de la conexión, he utilizado dotenv, por lo que el archivo .env no está incluido en el repositorio. Solo estarán
aquellos datos dependientes de la máquina host. El puerto del servidor está establecido por defecto en el archivo config.ts. La existencia
de este archivo es para tener los datos del .env tipados, además de un facil acceso a los mismos.

He decidido utilizar sequalizer como ORM de la base de datos. Lo suyo sería crear una capa por encima para poder
reemplazar el ORM por cualquier otro.

## Architecture
Arquitectura en 3 capas: Controlador - Servicio - Repositorio

El sistema arranca en el index.ts. En este fichero creamos la conexión a la base de datos, así como poner el servidor a la escucha, redirigiendo
las peticiones a los controladores pertinentes.

He creado los "makers" para cada tipo de archivo de un resource (controlador, servicio, repositorio...), para poder crear una instancia mediante
inyección de dependencias.

Así pues, el flujo sería el siguiente =>
1. Index establece la conexión a la base de datos
2. Index inicializa el servidor y establece las rutas
3. Cualquier petición, se redirige a su controlador pertinente. Por defecto, el prefijo de las rutas es /api
4. Cada controlador tendrá un servicio, donde se encontrará toda la lógica de negocio.
5. Los servicios implementarán 1 o varios repositorios según hagan falta, los cuales serán la capa que se comunicará con la bbdd.
6. errores encapsulados en la capa de repositorios, de manera que las capas controlador/servicio no se deberían de ver afectadas por
ninǵun error inesperado.
