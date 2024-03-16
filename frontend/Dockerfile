# Development stage
FROM node:18-alpine3.19 AS development

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for leveraging Docker cache
COPY package.json package-lock.json ./
RUN npm ci

# Copy other project files and build React app
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.25-alpine3.18 AS production

# Set timezone if needed
ENV TZ=Asia/Bangkok
RUN apk add --update tzdata && \
  cp /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Create a new Nginx configuration file
RUN echo "server { \
  listen       80; \
  server_name  localhost; \
  location / { \
  root   /usr/share/nginx/html; \
  index  index.html index.htm; \
  try_files \$uri \$uri/ /index.html; \
  } \
  error_page   500 502 503 504  /50x.html; \
  location = /50x.html { \
  root   /usr/share/nginx/html; \
  } \
  }" > /etc/nginx/conf.d/default.conf

# Copy compiled build from development stage to nginx directory
COPY --from=development /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
