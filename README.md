# Universal Redux Template
A boilerplate doing universal/isomorphic rendering with Redux + React-router + Express, based on [Redux-Realword-Example](https://github.com/rackt/redux/tree/master/examples/real-world)

# Development:
- Run `npm start` to host dev environment

# Test with mocha, sinon and chai
- Run `npm test`

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

## Testing:
- Use Mocha, Chai as testing framework; Rewire, Sinon to mock

# Routes Draft:
- Intro page: `{base_url}`
- Question Page: `{base_url}/q/:id/:question-title`

# Resources:
- [Blogpost on Codementor](https://www.codementor.io/reactjs/tutorial/redux-server-rendering-react-router-universal-web-app)
- [Chinese version of the above](http://mz026.logdown.com/posts/308147-hello-redux-2-3-server-rendering)


## Known issues:
-  api path on remote
