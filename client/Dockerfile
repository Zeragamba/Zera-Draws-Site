FROM node:20.11.1
RUN corepack enable

WORKDIR /opt/client

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --immutable

COPY . .

CMD [ "yarn", "build" ]
