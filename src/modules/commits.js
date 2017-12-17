import { all, takeLatest, put, select } from 'redux-saga/effects'
import { createSelector } from 'reselect'

import {
  prefixConstants,
  makeActions,
  defaultInitialState,
  checkError,
  uniqueValues,
} from '../utils'
import { selectors as reposSelectors } from './repos'

export const constants = prefixConstants({
  GET_REQUEST: 'GET_REQUEST',
  GET_SUCCESS: 'GET_SUCCESS',
  GET_FAILURE: 'GET_FAILURE',
})

export const actions = makeActions(constants)

export function reducer(state = defaultInitialState, { type, payload }) {
  switch (type) {
    case constants.GET_REQUEST:
      return { ...state, loading: true }
    case constants.GET_SUCCESS:
      return { ...state, data: payload, loading: false, error: null }
    case constants.GET_FAILURE:
      return { ...state, error: payload, loading: false }
    default:
      return state
  }
}

function getData(state) {
  return state.commits.data
}

function getContributors(state) {
  return createSelector(getData, commits =>
    uniqueValues(commits.map(commit => commit.author.login))
  )(state)
}

export const selectors = {
  data: getData,
  contributors: getContributors,
}

function* getWorker({ payload }) {
  try {
    const repoSelector = reposSelectors.repoById(payload)
    const repo = yield select(repoSelector)
    const commitsUrl = repo.commits_url.replace('{/sha}', '')

    const response = yield fetch(commitsUrl)
    console.log(response)
    checkError(response)

    const data = JSON.parse(response._bodyText)
    yield put(actions.getSuccess(data))
  } catch (error) {
    console.log(error)
    put(actions.getFailure(error))
  }
}

export function* saga() {
  yield all([takeLatest(constants.GET_REQUEST, getWorker)])
}
