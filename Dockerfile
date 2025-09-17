# Usa una imagen oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias (mejor en producción usar --omit=dev)
RUN npm install --omit=dev

# Copia el código fuente
COPY src ./src

# Expone el puerto que usará la app
EXPOSE 3000

# Comando de inicio
CMD ["node", "src/server.js"]
