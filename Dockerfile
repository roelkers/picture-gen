FROM node:16

ARG APP

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

#RUN npm ci --only=production

COPY . .

RUN npx nx build ${APP}

ENV APP $APP

CMD node dist/apps/${APP}/main.js --enable-source-maps
