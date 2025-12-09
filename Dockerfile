FROM node:20.19.6 AS build
WORKDIR /cloudship-999

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /cloudship-999/dist /usr/share/nginx/html