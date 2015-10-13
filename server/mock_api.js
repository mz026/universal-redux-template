let _ = require('lodash');

function question (id) {
  let sampleContent = '--the question content--';
  return {
    id,
    content: `sample-${id}: ${sampleContent}`
  }
}

let questions = [];
for (var i = 1; i < 11; i += 1) {
  questions.push(question(i));
};

module.exports = {
  questions
};
