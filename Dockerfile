FROM node:18-alpine


RUN npm install -g serve 


WORKDIR /app 

COPY --from=build /app/build ./build 

EXPOSE 8080 

CMD [ "server", "-s", "build", "-1", "8080"]