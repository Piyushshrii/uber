FROM node:14 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM gcr.io/distroless/nodejs:14
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
RUN npm install --production
EXPOSE 8080
CMD ["index.js"]
