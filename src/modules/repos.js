import { all, put, throttle } from 'redux-saga/effects'
import { createSelector } from 'reselect'

import { prefixConstants, makeActions, defaultInitialState, checkError } from '../utils'
import { ghApiUrl } from '../config'

export const constants = prefixConstants({
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_FAILURE',
})

export const actions = makeActions(constants)

export function reducer(state = defaultInitialState, { type, payload }) {
  switch (type) {
    case constants.SEARCH_REQUEST:
      return { ...state, loading: true }
    case constants.SEARCH_SUCCESS:
      return { ...state, data: payload, loading: false, error: null }
    case constants.SEARCH_FAILURE:
      return { ...state, error: payload, loading: false }
    default:
      return state
  }
}

function getData(state) {
  return state.repos.data
}

function repoById(id) {
  return createSelector(getData, repos => {
    return repos.find(repo => repo.id === id)
  })
}

export const selectors = {
  data: getData,
  repoById: repoById,
}

function* getWorker({ payload }) {
  try {
    const q = payload && `q=${payload.keywords.join('+')}`

    const response = yield fetch(`${ghApiUrl}search/repositories?${q || ''}`)
    checkError(response)

    const data = JSON.parse(response._bodyText).items
    yield put(actions.searchSuccess(data))
  } catch (error) {
    console.log(error)
    yield put(actions.searchFailure(error))
  }
}

export function* saga() {
  yield all([throttle(1000, constants.SEARCH_REQUEST, getWorker)])
}
