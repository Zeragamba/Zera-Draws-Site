FROM node:18.16.1

WORKDIR /opt/index

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production

COPY . .

CMD [ "yarn", "start" ]
