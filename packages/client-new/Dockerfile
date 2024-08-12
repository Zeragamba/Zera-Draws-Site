FROM node:22.2.0
RUN corepack enable

WORKDIR /opt/client

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY ["packages/website/package.json", "./packages/website/"]

RUN --mount=type=cache,target=/root/.yarn \
    YARN_CACHE_FOLDER=/root/.yarn \
    yarn install --immutable

COPY . .

CMD [ "yarn", "build" ]
