# Megaverse

This repository has code to make use of the megaverse creator API to set a map of the 2D space compromised of astral objects.

## How to use

- Open a terminal in the folder root and run the command `yarn install` or `npm install`.
- Copy the `.env.example` into a new file called `.env` and fill in the variables.
- Run the code by running the script in the terminal `yarn start` or `npm start`, it will build the project into the dist folder and run it. If you want to debug or run in dev mode, you can run the script `yarn dev` or `npm run dev`.

## Dependencies

This code use different dependencies to achieve its goal.

- [Babel](https://babeljs.io/) to transpile the code, letting us use the latest js features.
- [Axios](https://axios-http.com/docs/intro) to make the request to the API.
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) to enforce good practices and styling in the code.
- [Nodemon](https://nodemon.io/) to run in dev mode.
