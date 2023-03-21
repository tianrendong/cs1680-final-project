# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install --silent

# add app and build
COPY . ./
RUN npm install && npm run build