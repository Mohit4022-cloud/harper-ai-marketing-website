# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Install Python and build dependencies for native modules
RUN apk add --no-cache python3 make g++ 

# Copy package files
COPY package*.json ./

# Install dependencies with verbose logging
RUN npm install --production=false --verbose

# Copy source files
COPY . .

# Build the Astro site
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name _;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip on;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_types text/css application/javascript application/json image/svg+xml;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_comp_level 6;' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header Cache-Control "public, max-age=31536000" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Create script to handle PORT environment variable
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'if [ -n "$PORT" ]; then' >> /docker-entrypoint.sh && \
    echo '    sed -i "s/listen 80/listen $PORT/g" /etc/nginx/conf.d/default.conf' >> /docker-entrypoint.sh && \
    echo 'fi' >> /docker-entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]