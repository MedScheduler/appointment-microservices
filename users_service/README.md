# Serviço de usuários
Serviço NodeJS responsável pela gestão de usuários e autenticação

## Executar a app

```bash
$ pnpm install
```

## Compilar e executar o projeto

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Rodar testes

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Subir banco de dados
```bash
$ docker-compose up -d
```

## Executar migrations

```bash
$ pnpm knex migrate:latest
```

## Executar seeds

```bash
$ pnpm knex seed:run
```
