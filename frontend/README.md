## Frontend for PeerPrep

We are using React with TypeScript for building the frontend of the application. Additionally, we rely on Vite.js' tooling for achieving faster build times and improved development iterations.

### Basic Instructions

In order to replicate the development environment locally, one can start by installing the required packages. We recommend sticking with `npm` as the package manager. The installation can be done using the following command.

```
npm install
```

This should create a `node_modules` directory inside `frontend` that contains all the dependencies.
In order to start the development server, one can use the following command.

```
npm run dev
```

This calls the `vite` command internally and starts a localhost server on port 5173. If you want to allow others on the same subnet to access your development server, one can do so by using the following command.

```
npm run devh
```

Prettier has been set as the default formatter for the code in orde to stick to a standard code style for ease of readability and uniformity. The exact config can be found in `.prettierrc`. In order to format all the files, one can run the following command.

```
npm run format
```

### Directory Structure

This is the directory structure of the `frontend` directory.

```
.
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md           # You are currently here
```

### Managing Environment Variables 
Vite already provides good support for loading environment variables using the `dotenv` package. In order to create your own `.env` file, please ensure that the variables are prepended by `VITE_` to make them visible. An example is shown below. 
```
VITE_BACKEND_URL="..."   # Vite can see this 
SOME_IMPORTANT_VAR="..." # Vite cannot see this
```

With regards to the current version, the following environment variables are needed. 
```
VITE_USER_SERVICE_URL
```
