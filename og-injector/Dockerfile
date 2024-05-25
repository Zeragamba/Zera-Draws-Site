FROM node:22.2.0
RUN corepack enable

WORKDIR /opt/index

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
RUN yarn install --immutable

COPY . .

CMD [ "node", "passenger.js" ]
