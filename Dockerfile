FROM node:14
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
COPY . .
RUN npm install
ENTRYPOINT["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
