FROM node:19.7-alpine AS sk-build
WORKDIR /usr/src/app


COPY . /usr/src/app
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["node", "build/index.js"]
