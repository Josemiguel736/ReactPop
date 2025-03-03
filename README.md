# Práctica Fundamentos de React

Para la práctica se ha usado como backend [esta API](https://github.com/davidjj76/nodepop-api)

He usado React junto a Redux para desarrollar todo el frontend.

## Start
>**⚠️ IMPORTANTE:**    
Instala las dependencias del repositorio.

```sh
npm install
```

### .env:

>**⚠️ IMPORTANTE:**   
En el primer deploy por favor crea el archivo .env.local y rellena los valores indicados en el .env.local.example

```sh
cp .env.local.example
```

## Run

Iniciar en modo desarrollo

```sh
npm run dev
```

Crear los archivos de distribución

```sh
npm run build
```

Iniciar en modo preview necesario los archivos de distribución

```sh
npm run preview
```

Test

```sh
npm run test
```

Coverage test

```sh
npm run coverage
```

Linter

```sh
npm run lint
```

Prettier

```sh
npm run format
```
## Estructura del estado  (`State`)

```ts
type State = {
  auth: boolean;
  adverts: {
    data: AdvertType[] | null;
    loaded: boolean;
  };
  tags: {
    data: string[] | null;
    loaded: boolean;
  };
  ui: {
    pending: boolean;
    error: Error | null;
    tagsError: Error | null;
  };
};

const defaultState: State = {
  auth: false,
  adverts: {
    data: null,
    loaded: false,
  },
  tags: {
    data: null,
    loaded: false,
  },
  ui: {
    pending: false,
    error: null,
    tagsError: null,
  },
};
```

## Funcionalidades

La aplicación se estructura en dos tipos de páginas

- Públicas : NO es necesario que el usuario esté autenticado.
- Privadas : Es necesario que el usuario esté autenticado.

## Páginas públicas:

### /login

- Permite loguear usuarios
- Permite que el usuario guarde su sesión o no

Si el usuario decide no recordar la sesión podrá usar la aplicación hasta que no cierre la página ya que no se guardará su token JWT

Si decide recordar la sesión su token se guardará en el local storage hasta que haga logout o el token expire (cada vez que intente acceder a la página se comprueba que tenga un token válido y se hace una petición a la API para validar que ese usuario realmente existe)

Siempre que se autentique correctamente cambiaremos en Redux el estado de autenticado a true

El formulario está validado con un Regext para el email además de que el botón estará deshabilitado si no hay contraseña y email valido.

### /404

- 404 : Cuando un usuario intente acceder a una página inexistente siempre lo remitiremos al 404

## Páginas protegidas

Si un usuario NO logueado intenta acceder a una página protegida y no está logueado sera directamente redireccionado a /login.

### /adverts

Desde adverts el usuario podrá visualizar todos los anuncios publicados en la página, tendrá a su disposición un filtro y un sistema de paginación.

Para prácticar más con React opte como sugirió el profesor, por traerme todos los productos en una sola petición y realizar el filtrado desde el frontend, en producción quizás no sea la mejor forma de gestionarlo, aún así si que es cierto que permite que al tener los productos en memoria la página necesita menos render para funcionar.

Al usar Redux decidí que guardaría los anuncios dentro del estado de Redux pudiendo así cargarlos en toda mi página con solo una petición

Se podrá filtrar por :

- Nombre
- Precio (Max, Min)
- Tags (solo buscará productos que contengan TODOS los tags elegidos)

Cada anuncio en la página de adverts contendrá :

- Nombre
- Precio
- Tags
- Si es compra o venta
- Si tiene foto saldrá la foto del producto si no tiene saldrá un placeholder

Cada anuncio tendrá un enlace a su página de detalle.

### /adverts:id

Desde está página el usuario puede ver el anuncio en profundidad además de borrarlo.

Este componente comprueba si existe el anuncio en el estado de Redux, si no lo encuentra realiza una petición a la Api para obtenerlo, si tampoco lo encuentra 
nos mandará a la página 404

Cada anuncio en la página de adverts:id contendrá :

- Nombre
- Precio
- Tags
- Si es compra o venta
- Si tiene foto saldrá la foto del producto si no tiene saldrá un placeholder
- Un botón para borrar el anuncio

Antes de borrar el anuncio la página pedirá una confirmación al usuario.

Una vez lo borre de la base de datos también lo borrará del estado de Redux

### /adverts/new

Desde esta página el usuario puede crear nuevos anuncios, se le requerirán todos los campos menos foto, si el usuario trata de crear el producto sin completar todos los campos requeridos no podrá crearlo.

He validado los input de dos formas, primero ayudandome del required de HTML, además de obligar a que cumplan con el formato que yo quiero, (no permito valores negativos y anuncios con menos de 4 letras)

En este caso preferí no desabilitar el boton de submit, pero no enviará el formulario a menos que cumpla mis requisitos, además dará feedback al usuario sobre qué errores ha cometido al rellenar el formulario.

Al crear el producto lo añadirá también al estado de Redux

## Header y footer

Quise mantener el header y el footer en toda mi página, incluso cuando el usuario no está logueado pero cambiar su diseño en función de si lo está o no.

Sí el usuario NO esta logueado : Mostraré unicamnete el logo de la página.

Sí el usuario ESTA logueado : Tendrá acceso a la opción de desloguearse, crear anuncios y ver los anuncios disponibles.

### Botón de logout

El botón de logout es el mismo componente que el de eliminar anuncio, al
pulsarlo pedirá una validación al usuario sobre si quiere o no desloguearse, en caso de que no quiera el botón volvera a su primer estado.

## Loading

El loading lo he tratado de cuatro maneras distintas:

Cree 3 formas de mostrar cargas en el frontend

- LoadingPage : muestra un svg y un texto que pone "cargando..." puede trabajar como página completa o como subcomponente en otra página

- gif : En peticiones como el login o crear nuevo producto quise añadir una imágen para dar un poco mas de feedback al usuario

- La página de /newAdvert la he tratado como lazy de forma que cuando se haga la build la separará del html y js principal como fallback use LoadingPage

## Errores

Los he gestionado de tres formas distintas diferenciando de si son errores provocados por el usuario o errores nativos de mi aplicación.

Si son errores del usuario en la misma página le dare feedback y bloqueare los sumbit en caso de que los haya tratando de evitar que ese error pueda escalar.

En caso de que sea un error de mi aplicación lo trataré de dos formas diferentes en función del problema.

- 501 : Mostrare una página 501 cuando se produzca un error que no permita una funcionalidad mínima en mi página o se produzca un error que pueda tirar la aplicación

La página 501 tiene un enlace al home además de un email de contacto incitando al usuario a ponerse en contacto con el servicio técnico si el problema persiste.

- Errores en el componente : Si la aplicación puede funcionar aunque sea con algun problema intentaré no lanzar un error 501, pero si darle feedback al usuario de que ha ocurrido un problema, esto lo uso por ejemplo en el componente de filtrado.

- Los errores de la API se cargan en el estado de Redux en dos campos:

Si es un error provocado desde adverts, o login lo trataré desde redux ui error en cambio si es un error al cargar los tags si que decidí que sería más comodo poder tratarlo a parte
ya que quería poder tratar ambos errores de forma distinta.

En caso de que sea un error de la aplicación también lanzare un console.warn indicando donde se produjo y adjuntando los datos del error.

Esto se ha hecho con la idea de representar y dejar preparada la página para poder trabajar con un servicio de logs al que poder enviar todos estos errores

## Peticiones

Las peticiones se realizan dentro de actions, permitiendo tener un código más limpio dentro de los componentes ya que ahora no se responsabilizan de llamar a la api, si no 
que reciben los datos necesarios del estado de redux.

>**⚠️ ATENCIÓN :**
>- Cada peticicíon a la API esta validada usando Zod, si no recibe los datos con el esquema correcto lanzara un Api Client Error


