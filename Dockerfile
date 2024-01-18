# Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set environment variables
ENV PORT=4000
ENV REDIS_PASSWORD=lXar62Wf4u1akkNXRLwhSm4YtFTwQJwH
ENV REDIS_HOST=redis-19522.c322.us-east-1-2.ec2.cloud.redislabs.com

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
