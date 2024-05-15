FROM node:20.12.2-alpine

WORKDIR /app

ARG NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY /src ./src

CMD [ "npm", "start" ]