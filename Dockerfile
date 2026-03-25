# Usa una imagen oficial de Node.js
FROM node:24-bookworm-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias (mejor en producción usar --omit=dev)
RUN npm install --omit=dev

# Copia el código fuente
COPY src ./src

# Crear el usuario no privilegiado
RUN groupadd -r k-oso && useradd -r -g k-oso k-oso

USER k-oso

# Expone el puerto que usará la app
EXPOSE 3000/tcp

# Comando de inicio
CMD ["node", "src/server.js"]
