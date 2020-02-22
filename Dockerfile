FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY build /app

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "."]