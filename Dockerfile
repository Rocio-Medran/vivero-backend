# Imagen base de Node
FROM node:18-alpine

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer el puerto
EXPOSE 4000

# Comando para arrancar
CMD ["npm", "run", "dev"]
