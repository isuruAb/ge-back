# ge-back
Simple JWT based authentication backend

## Deploy with Docker

- First, rename `.env-example` file to `.env` and ad `DB_STRING` and `JWT_SECRET`
- Build the docker image with this command `docker build -t emporio:docker-node .` 
- Run the docker image with this command `docker run -p 8000:5000 -d emporio:docker-node`
- You can use the API in this URL `http://localhost:8000/`

## Deploy without docker

- First, rename `.env-example` file to `.env` and ad `DB_STRING` and `JWT_SECRET`
- You should have node installed on your machine
- go into your project folder using terminal and install dependencies with this command `npm i`
- run `npm start` to start the API. You can access API in `http://localhost:5000/`

## Run test cases

- Run `npm run test` to run tests
