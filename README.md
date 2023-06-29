# bite_speed_task
 
# README

This README provides instructions for running the project locally or accessing the hosted server.

## Hosted Server

If you prefer to access the hosted server, follow the instructions below:

Server URL: http://52.66.132.135/identify

Note: Since the server is hosted, there is no need to perform the local setup steps mentioned below. You can directly access the server using the provided URL.

## Running Locally

To run the project locally, please follow the steps below:

### Prerequisites

Make sure you have the following software installed on your system:

- Node.js
- PostgreSQL

### Step 1: Clone the Repository

```bash
git clone https://github.com/SHAURYA369/bite_speed_task.git
```
### Step 2: Setup the environment variable

Create a .env file in the project root directory and set the following variables:

```bash
YOUR_DB_URI=<postgresql-uri>
PORT=<port-number>
```
Replace <postgresql-uri> with the URI for your PostgreSQL database, and <port-number> with the desired port number for the server.

### Step 3: Install Dependencies

In the project root directory, run the following command to install the required dependencies:

```bash
npm install
```

Step 4: Start the Server
To start the server, run the following command:

```bash
npm run start
```
The server will start running on the specified port.

## Support
For any issues or questions, please contact the project maintainer.
