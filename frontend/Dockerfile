FROM node:lts-buster as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY src src
COPY public public
RUN npm run build
RUN ls

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
