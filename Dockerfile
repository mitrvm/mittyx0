# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm ci --silent
COPY . /app

ENV PORT=3000

FROM development AS build
ARG VITE_API_HOST
ENV VITE_API_HOST=$VITE_API_HOST
RUN npm run build  # or "yarn build" if using Yarn


FROM development as dev-envs
RUN <<EOF
apk update
apk add --no-cache git
EOF

RUN <<EOF
adduser -s /bin/sh -D vscode
addgroup docker
adduser vscode docker
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
#CMD [ "npm", "start" ]

# 2. For Nginx setup
FROM nginx:alpine

# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]