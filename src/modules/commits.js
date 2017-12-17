import {
  call,
  all,
  takeLatest,
  put,
  select,
  throttle,
} from 'redux-saga/effects'
import { createSelector } from 'reselect'

import {
  prefixConstants,
  makeActions,
  defaultInitialState,
  checkError,
  uniqueValues,
  getNextPageUrl,
  getLastPageUrl,
} from '../utils'
import { selectors as reposSelectors } from './repos'

export const constants = prefixConstants({
  GET_REQUEST: 'GET_REQUEST',
  GET_SUCCESS: 'GET_SUCCESS',
  GET_FAILURE: 'GET_FAILURE',

  NEXT_PAGE_REQUEST: 'NEXT_PAGE_REQUEST',
  NEXT_PAGE_SUCCESS: 'NEXT_PAGE_SUCCESS',
  NEXT_PAGE_FAILURE: 'NEXT_PAGE_FAILURE',

  BLOCK_NEXT_PAGE: 'BLOCK_NEXT_PAGE',
  UNBLOCK_NEXT_PAGE: 'UNBLOCK_NEXT_PAGE',

  RESET_COMMITS: 'RESET_COMMITS',
})

export const actions = makeActions(constants)

export function reducer(state = defaultInitialState, { type, payload }) {
  switch (type) {
    case constants.GET_REQUEST:
      return { ...state, loading: true }
    case constants.GET_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        error: null,
      }
    case constants.GET_FAILURE:
      return { ...state, error: payload, loading: false }
    case constants.NEXT_PAGE_REQUEST:
      return { ...state, loading: true }
    case constants.NEXT_PAGE_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...payload.data],
        next: payload.next,
        loading: false,
        error: null,
      }
    case constants.NEXT_PAGE_FAILURE:
      return { ...state, error: payload, loading: false }
    case constants.BLOCK_NEXT_PAGE:
      return { ...state, blocked: true }
    case constants.UNBLOCK_NEXT_PAGE:
      return { ...state, blocked: false }
    case constants.RESET_COMMITS:
      return defaultInitialState
    default:
      return state
  }
}

function getData(state) {
  return state.commits.data
}

function getNextPage(state) {
  return state.commits.next
}

function getLastPage(state) {
  return state.commits.last
}

function getBlocked(state) {
  return state.commits.blocked
}

function getError(state) {
  return state.commits.error
}

function getContributors(state) {
  return createSelector(getData, commits =>
    uniqueValues(commits.map(commit => commit.author && commit.author.login))
  )(state)
}

export const selectors = {
  data: getData,
  nextPage: getNextPage,
  lastPage: getLastPage,
  blocked: getBlocked,
  error: getError,
  contributors: getContributors,
}

function* getWorker({ payload }) {
  try {
    const repoSelector = reposSelectors.repoById(payload)
    const repo = yield select(repoSelector)
    const commitsUrl = repo.commits_url.replace('{/sha}', '')

    const response = yield fetch(commitsUrl)
    checkError(response)

    const data = JSON.parse(response._bodyText)
    yield put(
      actions.getSuccess({
        data,
        next: getNextPageUrl(response),
        last: getLastPageUrl(response),
      })
    )
  } catch (error) {
    console.log(error)
    put(actions.getFailure(error))
  }
}

function* pageWorker() {
  try {
    const blocked = yield select(selectors.blocked)
    if (blocked) {
      throw 'No additional data'
    }

    const nextPage = yield select(selectors.nextPage)
    const lastPage = yield select(selectors.lastPage)

    const response = yield fetch(nextPage)
    checkError(response)

    const data = JSON.parse(response._bodyText)
    yield put(
      actions.nextPageSuccess({
        data,
        next: getNextPageUrl(response),
        last: getLastPageUrl(response),
      })
    )

    if (nextPage === lastPage) {
      yield put(actions.blockNextPage())
    }
  } catch (error) {
    console.log(error)
    put(actions.nextPageFailure(error))
  }
}

export function* saga() {
  yield all([
    takeLatest(constants.GET_REQUEST, getWorker),
    throttle(1000, constants.NEXT_PAGE_REQUEST, pageWorker),
  ])
}
