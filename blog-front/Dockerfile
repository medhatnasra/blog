#build stage
FROM node:22-alpine AS Build


WORKDIR /app



COPY package.json package-lock.json ./


RUN npm ci

COPY . .

RUN npm run build

# Serve Static Files with nginx 

FROM nginx:stable-alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=Build /app/build /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]



