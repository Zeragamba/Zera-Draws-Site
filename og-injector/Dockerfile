FROM node:19.5.0

WORKDIR /opt/index

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production

COPY . .

CMD [ "yarn", "start" ]
