# Usa una imagen oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias (mejor en producción usar --omit=dev)
RUN npm install --omit=dev

# Copia el código fuente
COPY src ./src

# Crear el usuario no privilegiado
RUN addgroup -S k-oso && adduser -S -G k-oso k-oso

USER k-oso

# Expone el puerto que usará la app
EXPOSE 3000/tcp

# Comando de inicio
CMD ["node", "src/server.js"]
