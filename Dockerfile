
FROM node:22-alpine as build-stage

WORKDIR /app

# Copy only the necessary files for npm install
COPY . . 

RUN npm install --force
RUN npm run build

# Copy the rest of the application code
COPY . .

# production stage
FROM nginx:1.27-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
