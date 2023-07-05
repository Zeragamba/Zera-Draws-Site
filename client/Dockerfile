FROM node:18.16.1

WORKDIR /opt/client

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production

COPY . .

CMD [ "yarn", "build" ]
