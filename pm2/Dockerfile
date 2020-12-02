FROM keymetrics/pm2:12-alpine

# Bundle APP files
COPY pm2.json .
COPY static static/
COPY package.json .
COPY src src/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn install --production

CMD [ "pm2-runtime", "start", "pm2.json" ]
