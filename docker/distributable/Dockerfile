FROM node:9.6-alpine AS buildAgent
WORKDIR /app/
COPY . .
RUN yarn run build:production

FROM keymetrics/pm2:8-alpine
COPY --from=buildAgent /app/dist/ /dist/
COPY ./pm2.json /
EXPOSE 80
ENTRYPOINT [ "pm2-runtime", "start", "pm2.json" ]