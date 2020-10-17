# Streams Explorer

Streams Explorer was built using Vue.js alongside Nuxt.js. For a detailed explanation on how things work with NuxtJS, check out [Nuxt.js docs](https://nuxtjs.org).

## Build Setup

Using npm:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

Or using yarn:

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

Create a `.env` file by renaming `.env.example`.

## Deploying to Production

1. SSH to the server, `cd` into the Streams-explorer directory.

2. Pull changes from `main` branch and check that a `.env` file exists on the root of the project (list with `ls -a` since it's hidden).

3. Run `yarn` to update dependencies and then `yarn build` to bundle the JS and create a static version in the /dist folder. Remember to check .env.example in case new environment variables were added.

4. Kill the `node` process that's serving the application (e.g.: `ps -e|grep node` and `kill -9 <pid>`).

5. In detached mode (`screen`), run `yarn start` to serve the newly built application, then exit with `Ctrl+A` and `Ctrl+D`.

That's it, your updated application should be available.

## Troubleshooting

### Infinite loading spinner, page never loads

Check the Developer Console to identify any failing requests.

If the application builds successfully but the served /index.html points to non existent `.js` files, then you forgot to stop the previous node server (Step 4) and start a new node server to serve files from the new `/dist` folder (Step 5).
