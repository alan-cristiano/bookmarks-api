# Bookmarks API

## Descrição

- API REST desenvolvida utilizando do framework NestJS com TypeScript que simula a funcionalidade de 'páginas favoritas' (bookmarks) nos navegadores da WEB. Após o registro e autenticação do usuário, é possível efetuar a criação, leitura, edição e remoção das páginas registradas;
- Projeto desenvolvido utilizando Docker e Docker Compose para criação dos bancos de dados PostgreSQL;
- A aplicação implementa a validação e serialização de dados utilizando das funcionalidades de Pipes, DTOs e Entities disponibilizadas pelo framework NestJS;
- Autenticação de usuário via JWT e proteção de rotas utilizando das funcionalidades de Guards disponibilizada pelo NestJS;
- Gerenciamento de banco de dados PostgreSQL com Prisma ORM;
- Projeto estruturado visando a escalabilidade e melhor manutenção do código. Para isso foi utilizado o padrão de design de software MVC (model-view-controller) e injeção de dependências;
- Implementação de testes End-to-End.

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/): Framework para criação de aplicações back-end;
- [Prisma](https://www.prisma.io/): ORM utilizado em conjunto do PostgreSQL;
- [PostgreSQL](https://www.postgresql.org/): Banco de dados SQL;
- [Docker](https://docs.docker.com/): Plataforma para criação e gerenciamento de aplicações em containers;
- [Docker Compose](https://docs.docker.com/compose/): Ferramenta para configurar e rodar múltiplos containers de forma simplificada;
- Passport: Middleware para implementação das funcionalidades de autenticação de usuário;
- Helmet: Middleware para implementação de segurança da aplicação;
- PactumJS: Testing tool para formulação dos testes End-to-End;
- TypeScript: Linguagem de programação utilizada.

## Funcionalidades da aplicação

1. Registro de usuários;
2. Após login e com usuário autenticado via JWT:
   - Listar e editar dados do usuário autenticado;
   - Registrar, listar, editar e excluir páginas favoritas (bookmarks) de propriedade do usuário autenticado;

### Diagrama entidade-relacionamento

![Diagrama entidade-relacionamento](./src/docs/bookmarks-api-diagram.png)

## Pré-requisitos

- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/)
- [Node.js](https://nodejs.org/en)

## Clonando o projeto

```bash
git clone <github template url> <project_name>
```

## Variáveis de ambiente

1. A aplicação utiliza dois bancos de dados PostgreSQL como contêineres Docker: Banco de dados de desenvolvimento e banco de dados de testes. Dessa forma, inicie substituindo os valores ilustrativos -presentes nas variáveis de ambiente de ambos bancos de dados PostgreSQL- existentes na propriedade `environment` do arquivo `docker-compose.yml` localizado na raiz do projeto;
2. Copie o arquivo `.env.example` e o renomeie para `.env`. Substitua o valor da variável de ambiente `DATABASE_URL` para os valores conforme configuração do banco de dados `dev-db` do arquivo `docker-compose.yml`;
3. Copie o arquivo `.env.example` e o renomeie para `.env.test`. Substitua o valor da variável de ambiente `DATABASE_URL` para os valores conforme configuração do banco de dados `test-db` do arquivo `docker-compose.yml`;
4. Substitua o valor da variável de ambiente `JWT_SECRET` de ambos os arquivos para o valor de suas credenciais;

Essa aplicação utiliza as seguintes variáveis de ambiente:

| Nome         | Descrição                                                      | Obrigatório |
| ------------ | -------------------------------------------------------------- | ----------- |
| DATABASE_URL | Connection string para conexão com o banco de dados PostgreSQL | [x]         |
| JWT_SECRET   | Chave secreta do Token                                         | [x]         |

## Inicializando testes end-to-end

```bash
cd <project_name>
npm run test:e2e
```

## Inicializando a aplicação

Inicializando o banco de dados:

```bash
cd <project_name>
npm run db:dev:restart
```

Inicializando o servidor:

```bash
cd <project_name>
npm run start:dev
```

Navegue até `http://localhost:3333` para acessar a URL base da API.

## Documentação

### Diagrama de rotas

![Diagrama de rotas](./src/docs/bookmarks-api-routes.png)

#### Endpoint POST /auth/signup

Registrar novo usuário.

Padrão de corpo da requisição:

```json
{
  "email": "mail@mail.com",
  "password": "password1234"
}
```

Padrão de resposta da requisição:

- Status 201 - CREATED:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

- Status 400 - BAD REQUEST:

```json
{
  "message": [
    "email should not be empty",
    "email must be an email",
    "password should not be empty",
    "password must be a string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

- Status 403 - FORBIDDEN:

```json
{
  "message": "Credentials taken",
  "error": "Forbidden",
  "statusCode": 403
}
```

#### Endpoint POST /auth/signin

Login de usuário.

Padrão de corpo da requisição:

```json
{
  "email": "mail@mail.com",
  "password": "password1234"
}
```

Padrão de resposta da requisição:

- Status 200 - OK:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

- Status 403 - FORBIDDEN:

```json
{
  "message": "Credentials incorrect",
  "error": "Forbidden",
  "statusCode": 403
}
```

#### Endpoint GET /users/me

Leitura de dados de usuário.

Autorização:

```json
{
  "headers": {
    "authorization": "Bearer {token}"
  }
}
```

Não há a necessidade de envio de corpo na requisição.

Padrão de resposta da requisição:

- Status 200 - OK:

```json
{
  "id": 1,
  "createdAt": "2024-01-01T21:03:44.711Z",
  "updatedAt": "2024-09-01T21:03:44.711Z",
  "email": "mail@mail.com"
}
```

- Status 401 - UNAUTHORIZED:

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

#### Endpoint PATCH /users

Edição de dados de usuário.

Autorização:

```json
{
  "headers": {
    "authorization": "Bearer {token}"
  }
}
```

Padrão de corpo da requisição:

```json
{
  "email": "mail2@mail.com",
  "password": "password12345"
}
```

_Ambos os campos são opcionais._

Padrão de resposta da requisição:

- Status 200 - OK:

```json
{
  "id": 1,
  "createdAt": "2024-01-01T21:03:44.711Z",
  "updatedAt": "2024-09-24T21:12:35.412Z",
  "email": "mail2@mail.com"
}
```

- Status 400 - BAD REQUEST:

```json
{
  "message": ["email must be an email"],
  "error": "Bad Request",
  "statusCode": 400
}
```

- Status 401 - UNAUTHORIZED:

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

- Status 403 - FORBIDDEN:

```json
{
  "message": "Credentials taken",
  "error": "Forbidden",
  "statusCode": 403
}
```

#### Endpoint GET /bookmarks

Listagem dos bookmarks vinculados ao usuário.

Autorização:

```json
{
  "headers": {
    "authorization": "Bearer {token}"
  }
}
```

Não há a necessidade de envio de corpo na requisição.

Padrão de resposta da requisição:

- Status 200 - OK:

```json
[
  {
    "id": 1,
    "createdAt": "2024-01-01T21:03:44.711Z",
    "updatedAt": "2024-09-24T21:12:35.412Z",
    "title": "bookmark_title_1",
    "description": "bookmark_description_1",
    "link": "bookmark_url_1",
    "userId": 2
  },
  {
    "id": 2,
    "createdAt": "2024-01-01T21:03:44.711Z",
    "updatedAt": "2024-09-24T21:12:35.412Z",
    "title": "bookmark_title_2",
    "description": "bookmark_description_2",
    "link": "bookmark_url_2",
    "userId": 2
  }
]
```

- Status 401 - UNAUTHORIZED:

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

#### Endpoint GET /bookmarks/{:id}

Listagem de bookmark por id.

Parâmetro da rota (obrigatório):

- id

Autorização:

```json
{
  "headers": {
    "authorization": "Bearer {token}"
  }
}
```

Não há a necessidade de envio de corpo na requisição.

Padrão de resposta da requisição:

- Status 200 - OK:

```json
{
  "id": 1,
  "createdAt": "2024-01-01T21:03:44.711Z",
  "updatedAt": "2024-09-24T21:12:35.412Z",
  "title": "bookmark_title_1",
  "description": "bookmark_description_1",
  "link": "bookmark_url_1",
  "userId": 2
}
```

- Status 401 - UNAUTHORIZED:

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

- Status 403 - FORBIDDEN:

```json
{
  "message": "Access to resources denied",
  "error": "Forbidden",
  "statusCode": 403
}
```

#### Endpoint POST /bookmarks

Criação de bookmark.

Autorização:

```json
{
  "headers": {
    "authorization": "Bearer {token}"
  }
}
```

Padrão de corpo da requisição:

```json
{
  "title": "bookmark_title",
  "link": "bookmark_url",
  "description":"bookmark_description" *
}
```

_\* Campo opcional_

Padrão de resposta da requisição:

- Status 201 - CREATED:

```json
{
  "id": 1,
  "createdAt": "2024-09-01T13:15:39.629Z",
  "updatedAt": "2024-09-01T13:15:39.629Z",
  "title": "Bookmark_title",
  "description": "Bookmark_description",
  "link": "Bookmark_URL",
  "userId": 1
}
```

- Status 400 - BAD REQUEST:

```json
{
  "message": [
    "title should not be empty",
    "title must be a string",
    "link should not be empty",
    "link must be a string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

- Status 401 - UNAUTHORIZED:

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

#### Endpoint PATCH /bookmarks/{:id}

Edição de bookmark por id.

Parâmetro da rota (obrigatório):

- id

Autorização:

```json
{
  "headers": {
    "authorization": "Bearer {token}"
  }
}
```

Padrão de corpo da requisição:

```json
{
  "title": "bookmark_title",
  "link": "bookmark_url",
  "description": "bookmark_description"
}
```

_\* Todos os campos são opcionais_

Padrão de resposta da requisição:

- Status 200 - OK:

```json
{
  "id": 1,
  "createdAt": "2024-09-25T13:15:39.629Z",
  "updatedAt": "2024-09-25T13:19:48.270Z",
  "title": "Bookmark_title",
  "description": "Bookmark_description",
  "link": "Bookmark_URL_updated",
  "userId": 1
}
```

- Status 400 - BAD REQUEST:

```json
{
  "message": ["link must be a string"],
  "error": "Bad Request",
  "statusCode": 400
}
```

- Status 401 - UNAUTHORIZED:

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

- Status 403 - FORBIDDEN:

```json
{
  "message": "Access to resources denied",
  "error": "Forbidden",
  "statusCode": 403
}
```

#### Endpoint DELETE /bookmarks/{:id}

Remoção de bookmark por id.

Parâmetro da rota (obrigatório):

- id

Autorização:

```json
{
  "headers": {
    "authorization": "Bearer {token}"
  }
}
```

Não há a necessidade de envio de corpo na requisição.

Padrão de resposta da requisição:

- Status 204 - NO CONTENT.

- Status 401 - UNAUTHORIZED:

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

- Status 403 - FORBIDDEN:

```json
{
  "message": "Access to resources denied",
  "error": "Forbidden",
  "statusCode": 403
}
```
