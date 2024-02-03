# Message Broker Application

This repository contains a simple message broker application built with Docker, Redis, and Node.js using TypeScript.

## Prerequisites
Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js installation)

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/muhannadsalkini/NodeJS-MessageBroker
   cd NodeJS-MessageBroker
   ```

2. **Set Up Environment Variables:**
   Create a `.env` file in the root of the project and set the following variables:
   ```env
   PORT=4000
   REDIS_PASSWORD=your_redis_password
   REDIS_HOST=your_redis_host
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Build TypeScript:**
   ```bash
   npm run build
   ```

5. **Start the Application:**
   ```bash
   npm start
   ```
   This will start the server at `http://localhost:4000`.

6. **Test Route:**
   Open your browser or a tool like [Postman](https://www.postman.com/) and visit `http://localhost:4000/`. You should see a test message.

## Development

For development, you can use the following command to run the application with hot-reloading:

```bash
npm run dev
```

This uses [nodemon](https://nodemon.io/) to automatically restart the server when changes are detected.

## API Endpoints

- **Producer Endpoint:**
  - **Path:** `/produce`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "message": "Your message here"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Message produced successfully"
    }
    ```

- **Consumer Endpoint:**
  - **Path:** `/consume`
  - **Method:** `GET`
  - **Response:**
    - If a message is available:
      ```json
      {
        "success": true,
        "message": "Your consumed message"
      }
      ```
    - If no messages are in the queue:
      ```json
      {
        "success": false,
        "message": "No messages in the queue"
      }
      ```

## Docker

To run the application using Docker, make sure Docker is installed and then execute the following commands:

1. **Set Up Doker File:**
 Edit the `DokerFile` file in the root of the project and set the following variables:
   ```DokerFile
   PORT=4000
   REDIS_PASSWORD=your_redis_password
   REDIS_HOST=your_redis_host
   ```
2. **Build The Image and Run**
    ```bash
    docker build -t message-broker .
    docker run -p 4000:4000 -d message-broker
    ```

This will build a Docker image and run the container on port 4000.

Feel free to customize the application or Docker settings based on your requirements. Happy coding!


