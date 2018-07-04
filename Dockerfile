FROM node:10-alpine
LABEL name "starwars-graphql"
ARG app_path=/opt/local/app
COPY . $app_path
WORKDIR $app_path

RUN npm install

EXPOSE 80

CMD ["npm", "start"]
