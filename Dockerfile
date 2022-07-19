# build stage
FROM node:16-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm config set strict-ssl false  && \
	npm config set proxy http://webdefence.global.blackspider.com:80  && \
	npm config set registry https://registry.npmjs.org/ && \
	yarn config set registry https://registry.npmjs.org/ && \
	yarn config set strict-ssl false && \
	yarn config set httpProxy http://webdefence.global.blackspider.com:80  && \
	yarn config set httpsProxy http://webdefence.global.blackspider.com:80  && \
	yarn config list  && \
	yarn && \
	yarn install

COPY . /app
RUN yarn build:preprod

# final stage
FROM nginx:1.21 as final
ENV http_proxy "http://webdefence.global.blackspider.com:80"
ENV https_proxy "http://webdefence.global.blackspider.com:80"
ENV no_proxy "dev-consul,integration,ocelot,sener,sercan,localhost"

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]