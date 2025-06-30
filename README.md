# Proyecto Pokémon

Este proyecto usa Next.js, Prisma, PostgreSQL y TailwindCSS.

Esta aplicacion usa la POKEAPI: https://pokeapi.co/:

- Te muestra los primeros 150 pokemones(nombre, imagen) paginados en 10 por vista.
- Tiene boton de agregar a favoritos(se guarda en base de datos postgresql) y te muestra una vista de todos tus favoritos tambien paginados.
- Tiene un boton de ver detalle, que muestra un modal del detalle del pokemon.

## Tecnologías utilizadas

- **Next.js 15+** — Framework para React con App Router
- **TypeScript** — Tipado estático
- **TailwindCSS 4+** — Estilos utilitarios
- **Prisma ORM** — Acceso a base de datos
- **PostgreSQL** — Base de datos relacional
- **Radix UI + Lucide React** — Para modales e íconos
- **Sonner** — Para notificaciones visuales
- **Jest** — Testing de funciones y endpoints

### Ejecutar el proyecto

1. Clona el repositorio:
   git clone https://github.com/Nemi28/ProyectoPokemon.git
   cd ProyectoPokemon
2. Instala las dependencias:
   npm install
3. Configura las variables de entorno(.env):
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/pokemon_db"
   Cambia Usurio y contraseña, por las tuyas.
   Crea una base de datos con el nombre: "pokemon_db"
4. Realiza las migraciones a la base de datos:
   npx prisma generate
   npx prisma migrate dev --name init
5. Ejecuta:
   npm run dev

#### Ejecucion de test

El proyecto incluye 2 test unitarias con JEST que lo puedes ejecutar de la siguiente manera:

1. Para validar el endpoint post de favoritos(agregar un pokemon a favoritos guardando en tu base de datos sin repetir si ya esta como favorito)
   en tu terminal ejecutar: npx jest src/test/favoritosApi.test.ts
   ![test1](public/capturas/testpostfavoritos.png)
2. Para validar la funcion de getPokemonList, si llama correctamente a la POKEAPI y recibe los datos para mostrar
   en tu terminal ejecutar: npx jest src/test/getPokemonList.test.ts
   ![test2](public/capturas/testgetpokemon.png)

##### Vistas del Proyecto

1. Vista principal:
   ![Inicio](public/capturas/PaginaPrincipal.png)
2. Vista favoritos:
   ![Inicio](public/capturas/PaginaFavoritos.png)
3. Detalle Pokemon:
   ![Inicio](public/capturas/VistaModalDetallePokemon.png)
