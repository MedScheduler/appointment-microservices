FROM node:20.15.1-alpine

WORKDIR /app

COPY package*.json ./

RUN corepack enable

RUN pnpm install

COPY . .

RUN pnpm build

CMD [ "pnpm", "run", "start:dev" ]