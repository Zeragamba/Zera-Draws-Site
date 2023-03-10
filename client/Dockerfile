FROM node:19.5.0

WORKDIR /opt/client

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production

COPY . .

CMD [ "yarn", "build" ]
