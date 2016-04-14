let _ = require('lodash')

function question (id) {
  let sampleContent = '--the question content--'
  return {
    id,
    content: `sample-${id}: ${sampleContent}`
  }
}

let questions = _.range(1, 10).map((i)=> question(i))

export { questions }
