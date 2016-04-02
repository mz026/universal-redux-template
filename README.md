# Universal Redux Template
A boilerplate doing universal/isomorphic rendering with Redux + React-router + Express, based on [Redux-Realword-Example](https://github.com/rackt/redux/tree/master/examples/real-world)

# Philosophy

To bootstrap a React app development environment is not an easy task, there are so many libraries to setup, including webpack, babel, testing stuff and others. I'd like this boilerplate to be a ready-to-use one *with the essential tools and the simplest logic that just work* to build a universal rendering React + Redux app. That's why there is no fancy stuff in this app, since it's a basis of your killer app rather than a showcase one.

# How to use this template?

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

- To run the test with Mocha, Sinon and Chai:
`$ npm test`

# Features:
- Universal rendering, with async data support
- Server side redirect
- Separate vendor and app js files

# Stack:
- React 0.14
- React-Router 1.0.2
- Express as isomorphic server
- Babel
- Webpack

# Testing:
- Use Mocha, Chai as testing framework; Rewire, Sinon to mock

# Routes Draft:
- Intro page: `{base_url}`
- Question Page: `{base_url}/q/:id/:question-title`

# Resources:
- [Blogpost on Codementor](https://www.codementor.io/reactjs/tutorial/redux-server-rendering-react-router-universal-web-app)
- [Chinese version of the above](http://mz026.logdown.com/posts/308147-hello-redux-2-3-server-rendering)

# Deploy to Heroku

To deploy this app to heroku,

- Set up heroku git remote url
- Set `API_BASE_URL` to heroku config var. (without trailing slash)

Here's a [sample](https://redux-template-test.herokuapp.com/) deployed to heroku: https://redux-template-test.herokuapp.com/
For this case, the `API_BASE_URL` mention above would be `https://redux-template-test.herokuapp.com`
