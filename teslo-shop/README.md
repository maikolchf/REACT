# Descripcion

### Ejecutar en desarrollo
1. Clonar el repositorio
2. Copiar ```.env.template```y renombrarlo por ```.env```
3. Cambiar variables de entorno en el archivo ```.env```
4. Ejecutar ```npm install``` => Instalar dependencias
5. Ejecutar ```docker compose up -d```=> Levantar la base de datos
6. Ejecutar ```npx prisma migrate dev``` => Migramos la DB
7. Ejecutar ```npm run seed``` => Cargamos la data a la DB
8. Ejecutar ```npm run dev``` => Ejecutamos el proyecto

### 

### Ejecutar en produccion
