FROM node:22.2.0
RUN corepack enable

WORKDIR /opt/client

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
RUN yarn install --immutable

COPY . .

CMD [ "yarn", "build" ]
