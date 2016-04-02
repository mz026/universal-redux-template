import { CALL_API } from 'middleware/api';

export const LOADED_QUESTIONS = 'LOADED_QUESTIONS';
export function loadQuestions() {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/questions',
      successType: LOADED_QUESTIONS
    }
  };
}
