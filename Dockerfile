FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY src /app/src
COPY public /app/public
COPY tsconfig.json /app/tsconfig.json
COPY .env.production /app/.env.production

RUN npm install --silent
RUN npm install -g serve
RUN npm run build

EXPOSE 5000

CMD ["serve", "-s", "build"]