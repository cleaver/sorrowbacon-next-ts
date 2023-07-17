# Dockerfile for development
FROM node:16-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add  build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev \
  && apk add --no-cache libc6-compat
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock*  ./

WORKDIR /app

RUN yarn config set network-timeout 600000 -g && \
  npm_config_target_arch=x64 npm_config_target_platform=linuxmusl yarn install

COPY . .
# RUN npm_config_target_arch=x64 npm_config_target_platform=linuxmusl yarn

EXPOSE 3000

# Run yarn dev, as we would via the command line
CMD ["yarn", "dev"]