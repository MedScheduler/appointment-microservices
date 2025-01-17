FROM node:20.15.1

WORKDIR /app

COPY package*.json ./

RUN corepack enable

RUN pnpm install

COPY . .

CMD [ "pnpm", "run", "start:dev" ]