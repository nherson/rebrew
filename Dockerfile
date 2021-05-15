FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY server.js ./

EXPOSE 3000

CMD [ "node", "server.js" ]

