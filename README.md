[![Build Status](https://travis-ci.org/mz026/universal-redux-template.svg?branch=master)](https://travis-ci.org/mz026/universal-redux-template)

# Universal Redux Template
A boilerplate doing universal/isomorphic rendering with Redux + React-router + Express, based on [Redux-Realword-Example](https://github.com/reactjs/redux/tree/master/examples/real-world)

## Philosophy

To bootstrap a React app development environment is not an easy task, there are so many libraries to setup, including webpack, babel, testing stuff and others. I'd like this boilerplate to be a ready-to-use one *with the essential tools and the simplest logic that just work* to build a universal rendering React + Redux app. That's why there is no fancy stuff in this app, since it's a basis of your killer app rather than a showcase one.

## How to use this template?

- clone this app and name it as whatever your want:
`$ git clone https://github.com/mz026/universal-redux-template.git my-killer-app`

- remove the `.git` folder since you won't need the history of this boilerplate:
`$ cd my-killer-app; rm -rf .git`

- start out a new git history:
`$ git init`

- Install dependencies:
`$ yarn install`

- Host dev environment and start to build something changing the world!
`$ yarn start`

- To run the test with Mocha, Enzyme, Sinon and Chai:
`$ yarn test:ci`

- To generate a container/component/action and its tests:
`$ ./bin/generate <type> <path>`

eg: `$ ./bin/generate component myNamespace/MyComponent`


## Features:
- Universal rendering, with async data support
- Server side redirect
- Separate vendor and app js files
- Use [Immutable](https://facebook.github.io/immutable-js/) as store data
- Hot Reload on client side by Webpack
- Hot Reload on server side ([ref](https://medium.com/@kevinsimper/dont-use-nodemon-there-are-better-ways-fc016b50b45e))

## Stack:
- [react](https://github.com/facebook/react)@15.4.2
- [react-router](https://github.com/ReactTraining/react-router)@2.8.1
- [Immutable.js](https://facebook.github.io/immutable-js/)
- [Webpack](https://webpack.github.io/)@2.2
- [Babel](https://babeljs.io/)@6
- Express as isomorphic server
- `yarn` as package manager


## Testing:

### Tools:

- [Mocha](https://mochajs.org/) as testing framework
- [Chai](http://chaijs.com/) as assertion library
- [Rewire](https://github.com/speedskater/babel-plugin-rewire) and [Sinon](http://sinonjs.org/) to mock/stub
- [Enzyme](http://airbnb.io/enzyme/index.html) to do React rendering

### Development process:

When developing a feature,

* First run a separate process converting ES6 to ES5 lively:

```
$ yarn run test:watch
```

* Run the test case of a single file/directory by:

```
$ yarn test -- <the-file-path>
```

For example:

```
$ yarn test -- app/test/actions
```

* Before deployment, run all the test cases to make sure everything is fine by:

```
$ yarn test:ci
```

### Why

The way suggested by [babel's doc](https://babeljs.io/docs/setup/#installation) compiles the code on the fly, which is too slow, especially when the number of files grows:

```
//package.json

{
  "scripts": {
    "test": "mocha --compilers js:babel-register"
  }
}
```

So here we pre-compile the code, watch it, and maintain a cache to avoid repeated build of the files that doesn't change. After the pre-compile, the testing cycle can be *much faster* than before, especially when doing TDD.

### For ~Winners~ Vimmers:

For vim users, there's a plugin called [vim-test](https://github.com/janko-m/vim-test) binding tests with the editor. You can trigger a test "nearest the cursor", which is super handy when doing TDD.

To make `vim-test` work together with the pre-compile process,

1. copy the `editor_configs/vimrc` to `<project-root>/.vimrc`
2. make sure these two lines exist in your `~/.vimrc` to enable directory-based `.vimrc`:

```
set exrc
set secure
```

Then you can enjoy the fast feedback loop ~powered by the greatest editor on the planet~.


## Routes Draft:
- Intro page: `{base_url}`
- Questions Page: `{base_url}/questions`
- Question Detail Page: `{base_url}/questions/:id`

## How it works:

### Assets Management

When handling static assets, we want to achieve the following goals:

- Make assigning assets url a no-brainer
- Apply revision when deploying to production to integrate with CDN services easily

The usage example can be found in `[Intro Container](https://github.com/mz026/universal-redux-template/blob/master/app/containers/Intro.js)`


We achieve this by:

First, creating an assets container folder: `app/assets`

### In development mode:

Assign static folder linking `/assets` to the folder above

### In production mode:

Use a gulp task (`gulp build`) to handle it:

- A set of `[rev](https://github.com/smysnk/gulp-rev-all)-ed` assets with hash code appended would be built into `dist/public/assets`
- A static middleware mapping root url to the folder mentioned above is configured in `server.js`
- A set of `[revReplace](https://github.com/jamesknelson/gulp-rev-replace)-ed` server code would be built into `dist/server-build`, so that the rev-ed assets can be used when doing server rendering


### Redirect after API Calls

Under some cases, we'd like to do 302 redirect after fetching API. For example:

```
When users try to access a question page via an unexisting Id, redirect her to Index route.
```

In the code layer, we want the implementation to be shared on both client and server side.
This is achieved by passing a `history` instance to action creators, and use `history.push` whenever needed.

On the client side, `react-router` would then take care the rest of redirecting logic,
while on server side, we subscribe the url-chaning events on each request, and redirect requests to proper pages if needed.

Such implementation can be found in [`QuestionContainer`](https://github.com/mz026/universal-redux-template/blob/master/app/containers/Question.js),
[`questions action`](https://github.com/mz026/universal-redux-template/blob/master/app/actions/questions.js)


## Vendor Scripts:

Vendor related scripts are bundled into a `vendor.js`,
associated settings can be found in the `entry` field of `webpack.config.js`.

(thanks [@dlombardi](https://github.com/dlombardi) for pointing it out!)


## For Windows Users:

### `yarn test`:

The single quotes in `yarn test` script surrounding path do not work on Windows, while [they're necessary on unix-like machines](https://github.com/mochajs/mocha/issues/1115).
Please remove them in `scripts.test` section in `package.json` like this:

```
"test": "NODE_ENV=test NODE_PATH=./app mocha --compilers js:babel-register -r app/spec/support/setup.mocha.js --recursive app/spec/**/*.test.js -w"
```

(thanks [@jbuffin](https://github.com/jbuffin) for pointing it out!)


## Deployment:

To deploy this app to production environment:

- Prepare a server with NodeJS environment

- Use whatever tool to upload this app to server. ([Capistrano](http://capistranorb.com/) is a good choice.)

- Run `$ NODE_ENV=production yarn install` on server
  - After the installation above, `postinstall` script will run automatically, building front-end related assets and rev-ed server code under `dist/` folder.

- Kick off the server with:

` NODE_ENV=production NODE_PATH=./dist/server-build node dist/server-build/server`

### Deploy to Heroku

To deploy this app to heroku,

- Set up heroku git remote url
- Set `API_BASE_URL` to heroku config var. (without trailing slash)

Here's a [sample](https://redux-template-test.herokuapp.com/) deployed to heroku: https://redux-template-test.herokuapp.com/
For this case, the `API_BASE_URL` mention above would be `https://redux-template-test.herokuapp.com`


## Resources:
- [Blogpost on Codementor](https://www.codementor.io/reactjs/tutorial/redux-server-rendering-react-router-universal-web-app)
- [Chinese version of the above](http://mz026.logdown.com/posts/308147-hello-redux-2-3-server-rendering)


