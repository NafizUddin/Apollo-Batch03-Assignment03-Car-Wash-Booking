
# :ledger: Project: Car Wash Booking

**Project Name:** Car Wash Booking

**Project Task:** Building the backend for a Car Washing System.

**Project Motive:** Creating a backend system for a car care platform, including user logins, managing car services, scheduling appointments, and booking services.

## :computer: Server Live Link
Click here to see the Server Side Repository: [https://assignment-03-no-sql-backend-car-washing-booking-system.vercel.app/](https://assignment-03-no-sql-backend-car-washing-booking-system.vercel.app/)

## :computer: Project Overview Video
Click here to see the project overview video: [https://drive.google.com/file/d/1EYDLXq_teLSNf5rEzp69fKAOQleaxSba/view?usp=sharing](https://drive.google.com/file/d/1EYDLXq_teLSNf5rEzp69fKAOQleaxSba/view?usp=sharing)

## :sparkle: Project Features

1. **User logins:** Secure authentication for users to access the platform.
2. **Managing car services:** Administering various car maintenance and cleaning services, including adding new services, getting services, updating service details and deleting services.
3. **Scheduling slot appointments:** Allowing admins to select convenient service times, with options for viewing available slots for users.
4. **Booking services:** Facilitating straightforward booking of chosen car services.

## :keyboard: Technologies

* TypeScript
* Express
* Mongoose
* Zod
* jsonwebtoken
* dotenv
* http-status
* eslint
* prettier
* vercel

## :link: How to run the application locally

### :arrow_forward: Step 1: Clone the Repository
Firstly, we have to clone the repository to our local machine using Git.

```node
git clone <repository-url>
```

### :arrow_forward: Step 2: Navigate to the Project Directory
We need to navigate to the cloned repository directory.

```node
cd <repository-name>
```

### :arrow_forward: Step 3: Install Dependencies
Then we have to install the project's dependencies using npm.

```node
npm install
```

This command reads the package.json file in the project directory and installs all the required packages from the npm registry. With this command, node_modules will be installed.

### :arrow_forward: Step 4: Set up the `.env` File
Next, we will create a .env file in the root directory of our project. This file will hold the environment variables. `.env` file will look like this:

```node
PORT=5000
DATABASE_URL=mongodb://localhost:27017/mydatabase
```
We need to ensure that these variables are correctly referenced in our application, typically in a configuration file which is under `./src/config` folder named as `index.ts`.

### :arrow_forward: Step 5: Start the Server
To run our Express.js application, we will use the following command:

```node
npm run start:dev
```
In our package.json file, we have a script defined as `npm run start:dev` to run the server.
```node
"scripts": {
    "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
    "start:prod": "node ./dist/server.js",
    //...more scripts
  }
```

### :arrow_forward: Step 6: Access the Application
Once the server is running, we can access the application by navigating to `http://localhost:<port>` in web browser. We have to replace the `<port>` with the port number specified in the .env file.

***
So, these are the steps to run an expressJs application locally.
