FROM node:13.6.0

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN ["npm", "ci"]

COPY . .

EXPOSE 5000

CMD ["npm", "start"]