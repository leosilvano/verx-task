FROM node:20-alpine

WORKDIR /app/
ADD package.json /app/package.json
RUN npm install
ADD . /app/

CMD npm run dev