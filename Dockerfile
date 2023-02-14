FROM node:18.14.0-alpine
WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . /home/app

ENV EXCHANGE_API=https://api-coding-challenge.neofinancial.com
ENV SEED=93710

CMD ["npm", "run", "start"]
EXPOSE 3000