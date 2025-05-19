# Stage 1: Build
FROM node:21-slim AS backend-builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production image
FROM node:21-slim
WORKDIR /app

# Set default values (can be overridden in K8s)
ENV PORT=3000

COPY --from=backend-builder /app .

EXPOSE $PORT
CMD ["node", "server.js"]
