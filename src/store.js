import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import { reducer as reposReducer, saga as reposSaga } from './modules/repos'
import {
  reducer as commitsReducer,
  saga as commitsSaga,
} from './modules/commits'

Reactotron.configure()
  .use(reactotronRedux())
  .useReactNative()
  .connect()

const sagaMiddleware = createSagaMiddleware()

export default Reactotron.createStore(
  combineReducers({ repos: reposReducer, commits: commitsReducer }),
  compose(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(function*() {
  yield all([fork(reposSaga), fork(commitsSaga)])
})
