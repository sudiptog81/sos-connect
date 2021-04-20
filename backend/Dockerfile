FROM node:current-slim
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 5000
CMD [ "yarn", "start" ]
