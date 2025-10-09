# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Etapa de ejecución
FROM node:20-alpine
WORKDIR /app

# Copiamos el contenido necesario
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Puerto de la app
EXPOSE 3000

# Ejecuta el servidor standalone
CMD ["node", "server.js"]
