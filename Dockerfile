FROM node:10-alpine AS BUILD

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build


FROM nginx:stable-alpine AS SERVE

COPY --from=BUILD app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80