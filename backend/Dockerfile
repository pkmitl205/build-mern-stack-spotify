FROM node:18-alpine3.19

WORKDIR /usr/src/app

# Set the timezone
ENV TZ=Asia/Bangkok
RUN apk add --update tzdata && \
  cp /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone

# Copy package.json and package-lock.json and install production dependencies
COPY package.json package-lock.json ./

# Install dependencies using npm ci for faster and reliable builds
RUN npm ci
# Or Install dependencies using npm
# RUN npm install

COPY . .

EXPOSE 8000
CMD [ "node", "server.js" ]