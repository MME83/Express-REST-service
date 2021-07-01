# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)
- PostgreSQL (optional) - [Download & Install PostgreSQL](https://www.postgresql.org/download/)

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Starting application and database with Docker
Create docker-images and run docker-container (node/express app will run automatically)

```
docker-compose up -d
```
or
```
docker-compose build
docker-compose up
```

## Runing database migration & other commands
*after succeed migration - restart you docker-container
```
npm run migration:run
```

if the folder src/migration is empty - generate new migration
```
npm run migration:g
```

reverting migration
```
npm run migration:rev
```

## Local app start without Docker

1. `npm install`;
2. Install PostgreSQL, and run pgAdmin;
3. Create new database on DB_PORT:5432 with the name: `postgres1` | or use other data with a change to `.env`
4. `npm run dev`;
5. `npm run test`;
6. `npm run lint`;

--------------------------------

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docker

Install [Docker](https://docs.docker.com/engine/install/)

Run docker compose:

```
docker-compose up
```
Other commands:

```
docker-compose down
docker-compose build
docker scan <image name>
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
