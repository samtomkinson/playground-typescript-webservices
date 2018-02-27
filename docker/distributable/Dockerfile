FROM node:9.6-alpine AS buildAgent
COPY package.json yarn.lock ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN yarn install && mkdir /app && cp -R ./node_modules ./app
WORKDIR /app/
COPY . .
RUN yarn run build:production

FROM keymetrics/pm2:8-alpine
COPY --from=buildAgent /app/dist/ /dist/
COPY ./pm2.json /
EXPOSE 80
ENTRYPOINT [ "pm2-runtime", "start", "pm2.json" ]