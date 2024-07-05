## Introduction
Prueba técnica de backend para ORATREX.

## Database connection
Para los datos de la conexión, he utilizado dotenv, por lo que el archivo .env no está incluido en el repositorio. Solo estarán
aquellos datos dependientes de la máquina host. El puerto del servidor está establecido por defecto en el archivo config.ts.
La existencia de este archivo es para tener los datos del .env tipados, además de un facil acceso a los mismos.

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

## Patterns
He utilizado High order functions según veía necesario, para tratar de "decorar" las funciones con propiedades específicas.
Un ejemplo de ello sería csv.middleware y encrypt.middleware, aunqeu este último he decidido no utilizarlo finalmente.

Por otro lado, he centralizado todo lo posible, aquellos modelos del sequalize, dentro de la capa repositorio.
Importante, el código QR se está inyectando directamente en endpoint "session". En este caso no existe un endpoint para
ver un usuario únicamente. La idea sería poder escalar esto, de forma que se pueda elegir si se necesita el código QR según
convenga (/users, /users/:id, /auth/session, etc...)

También he utilizado programación funcional todo lo que he podido. He intentado evitar mutar datos ya existentes, además de
evitar posibles side effect.

## Tests
Las funcionalidades mas importantes a mi modo de ver son el procesado del csv, como asegurarme de que se guarda la
contraseña hasheada en bbdd.

Por ello, he añadido 2 pruebas unitarias: csv.middleware.processCsv, users.service.encryptUsers
