FROM node:14 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM gcr.io/distroless/nodejs:14
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
EXPOSE 8080
CMD ["npm", "start"]
