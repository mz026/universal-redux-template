[![Build Status](https://travis-ci.org/mz026/universal-redux-template.svg?branch=master)](https://travis-ci.org/mz026/universal-redux-template)

# Universal Redux Template
A boilerplate doing universal/isomorphic rendering with Redux + React-router + Express, based on [Redux-Realword-Example](https://github.com/rackt/redux/tree/master/examples/real-world)

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
`$ npm install`

- Host dev environment and start to build something chaning the world!
`$ npm start`

- To run the test with Mocha, Enzyme, Sinon and Chai:
`$ npm test`

- To generate a container/component/action and its tests:
`$ ./bin/generate <type> <path>`

- To update [npm-shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap):
`$ npm shrinkwrap --dev`

eg: `$ ./bin/generate component myNamespace/MyComponent`

## Features:
- Universal rendering, with async data support
- Server side redirect
- Separate vendor and app js files
- Use [Immutable](https://facebook.github.io/immutable-js/) as store data

## Stack:
- React 15.0.2
- React-Router 2.4.1
- Immutable
- Express as isomorphic server
- Babel
- Webpack

## Testing:
- [Mocha](https://mochajs.org/) as testing framework
- [Chai](http://chaijs.com/) as assertion library
- [Rewire](https://github.com/speedskater/babel-plugin-rewire) and [Sinon](http://sinonjs.org/) to mock/stub
- [Enzyme](http://airbnb.io/enzyme/index.html) to do React rendering

## Routes Draft:
- Intro page: `{base_url}`
- Question Page: `{base_url}/questions`

## For Windows Users:

### `npm test`:

The single quotes in `npm test` script surrounding path do not work on Windows, while [they're necessary on unix-like machines](https://github.com/mochajs/mocha/issues/1115).
Please remove them in `scripts.test` section in `package.json` like this:

```
"test": "NODE_ENV=test NODE_PATH=./app mocha --compilers js:babel-register -r app/spec/support/setup.mocha.js --recursive app/spec/**/*.test.js -w"
```

(thanks [@jbuffin](https://github.com/jbuffin) for pointing it out!)


## Deployment:

To deploy this app to production environment:

- Prepare a server with NodeJS environment

- Use whatever tool to upload this app to server. ([Capistrano](http://capistranorb.com/) is a good choice.)

- Run `$ NODE_ENV=production npm install` on server
  - After the installation above, `postinstall` script will run automatically, building front-end related assets under `dist/` folder.

- Kick off the server with:

`$ NODE_ENV=production NODE_PATH=./app node app/server`

### Deploy to Heroku

To deploy this app to heroku,

- Set up heroku git remote url
- Set `API_BASE_URL` to heroku config var. (without trailing slash)

Here's a [sample](https://redux-template-test.herokuapp.com/) deployed to heroku: https://redux-template-test.herokuapp.com/
For this case, the `API_BASE_URL` mention above would be `https://redux-template-test.herokuapp.com`


## Resources:
- [Blogpost on Codementor](https://www.codementor.io/reactjs/tutorial/redux-server-rendering-react-router-universal-web-app)
- [Chinese version of the above](http://mz026.logdown.com/posts/308147-hello-redux-2-3-server-rendering)


