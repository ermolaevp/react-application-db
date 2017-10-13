FROM node:8.1.4-alpine

RUN mkdir -p /usr/www
WORKDIR /usr/www

COPY package.json /usr/www/
RUN yarn install

COPY index.* webpack.* yarn.lock .babelrc postcss.config.js /usr/www/
COPY src /usr/www/src

CMD yarn build
