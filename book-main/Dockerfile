FROM node:20.12.2-alpine

WORKDIR /app

ARG NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "start" ]