## Introduction
Prueba técnica de frontend para ORATREX.

## Api communication
La comunicación de la api ocurre mediante la capa api.service. Esta ofrece aquellos endpoints básicos y necesarios de la aplicación (GET, POST).
Todas las comunicaciones se hacen desde aquí.

## Authentication
Para la autenticación, he creado un provider superior el cual controla todo el proceso de login y logout. Al entrar en la aplicación,
comprueba que exista la cookie auth. De ser así, significa que hay sesión. En este caso de uso, ante un token autorizado,
navego al usuario a la página principal. En caso contrario, las rutas están protegidas, de manera que le llevaría a la pantalla
de "login".

## Session
Una vez tenemos login, hacemos una api call (GET) de la sesión. De esta forma conseguimos los datos del usuario de la sesión.

## Architecture
Arquitectura en 3 capas: Componente => Hook/Context => Services.
De esta manera, aseguro el principio de responsabilidad.
Cada funcionalidad de la aplicación se divide en features, salvo aquellas estrictamentes necesarias como las api calls
y el sistema para el CSRF

## Patterns
He hecho uso de los componentes "Guards", los cuales son los encargados de permitirme entrar o no a una vista en concreto.

## Tests
