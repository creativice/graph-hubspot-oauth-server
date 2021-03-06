FROM node:lts-alpine

WORKDIR /app

ADD ./package*.json ./

RUN npm install
# Install
ADD ./src ./src

EXPOSE 3000
VOLUME ["/app/db"]

ENTRYPOINT [ "node", "./src/server.js" ]