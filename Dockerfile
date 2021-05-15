FROM node:12-alpine

ENV NODE_ENV production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

COPY . /usr/src/app

RUN npm ci --only=production

RUN npm run build

EXPOSE 3000

CMD [ "node", "server.js" ]

