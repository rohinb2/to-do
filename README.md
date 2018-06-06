# To-Do

Welcome to To-Do! This is a simple MERN-stack (MongoDB, Express, Node.js, ReactJS) web application.

## Setting up on your own machine

To set up the development environment on your own machine, first make sure you have Node and npm set up (If not, you can install [here](https://nodejs.org/en/download/) or if you're on Mac, you can run `brew install node` instead). 

Then, open two separate instances of terminal in both the `backend` and `client` directories and run `npm install` in both. This will set up the necessary dependencies for the app to function.

Also, you'll have to set up your MongoDB instance to be able to develop with this application. Make sure MongoDB is set up (instructions are [here](https://nodejs.org/en/download/)) and set the environment variable `MONGODB_URI` equal to a link to your local MongoDB instance so that you can interface with it. If you wish to have a live database instead, you can setup your database on [mLab](https://mlab.com) instead.

Afterward, run `npm start` in both and you should be good to go! Visit `http://localhost:3000` to test out the app. 