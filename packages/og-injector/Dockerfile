FROM node:22.2.0
RUN corepack enable

WORKDIR /opt/og-injector

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
RUN --mount=type=cache,target=/root/.yarn \
    YARN_CACHE_FOLDER=/root/.yarn \
    yarn install --immutable

COPY . .

CMD [ "node", "passenger.js" ]
