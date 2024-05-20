FROM node:22-alpine3.19
WORKDIR /app
COPY . /app
RUN yarn
EXPOSE 5000
CMD yarn start
