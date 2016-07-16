import { CALL_API } from 'redux-api-middleman'

export const MY_EVENT_TYPE = Symbol('MY_EVENT_TYPE')
export function THE_FUNC_NAME () {
  return {
    type: MY_EVENT_TYPE
  }
}
