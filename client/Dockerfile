FROM node:18

WORKDIR /opt/client

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . .
