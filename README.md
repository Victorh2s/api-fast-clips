# Fast Clips

Um sistema para baixar clipes mais virais da Twitch de forma rápida e eficiente, com armazenamento local.

## Requisitos para Rodar o Projeto

- Node v20.10.0 instalado na sua máquina
- Credenciais obtidas na Twitch Developer
- Banco de dados PostgreSQL

## Iniciando o Projeto

1. Clone o repositório:
    ```sh
    git clone <URL-do-repositório>
    ```
2. Instale os pacotes necessários:
    ```sh
    npm install
    ```
3. Se você tiver o Docker instalado, crie e inicie o banco de dados PostgreSQL:
    ```sh
    docker-compose up --build
    ```
4. Preencha todas as credenciais no arquivo `.env.example` e renomeie para `.env`.
5. Estruture o banco de dados:
    ```sh
    npx prisma migrate dev
    ```
6. Inicie o projeto localmente:
    ```sh
    npm run dev
    ```

## Utilizando o Postman

- Use a coleção Postman disponível no projeto (`FastClips.postman_collection.json`) para acessar todas as rotas disponíveis.
- Todos os clipes baixados serão armazenados na pasta `uploads` dentro do projeto. Caso ela não exista, o sistema a criará automaticamente ao baixar o clipe.

## Principais Ferramentas Utilizadas

- Node.js
- TypeScript
- Docker
- Prisma ORM
- PostgreSQL
- Vitest
- Supertest
- Princípios SOLID
- Microsserviços

## Feito por DeVictor 👍😎👍
