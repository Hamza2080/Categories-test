# from base image node
FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY ./package.json .

# install all dependencies
# RUN npm install --slient
# RUN npm install -g npm@7.23.0

# copy other files as well
COPY ./ .

#expose the port
EXPOSE 3003

RUN chmod +x docker/startup.sh
CMD [ "docker/startup.sh" ]