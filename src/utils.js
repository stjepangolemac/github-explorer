import { appPrefix } from './config'

export function prefixConstants(constantsMap) {
  return Object.keys(constantsMap).reduce((acc, curr) => {
    return { ...acc, [curr]: `${appPrefix}${constantsMap[curr]}` }
  }, {})
}

export function makeActions(constantsMap) {
  return Object.keys(constantsMap).reduce((acc, curr) => {
    return {
      ...acc,
      [actionToCamel(curr)]: payload => ({ type: constantsMap[curr], payload }),
    }
  }, {})
}

export function actionToCamel(text) {
  return text
    .toLowerCase()
    .split('_')
    .map(
      (word, index) =>
        index ? `${word.slice(0, 1).toUpperCase()}${word.slice(1)}` : word
    )
    .join('')
}

export const defaultInitialState = {
  data: [],
  loading: false,
  error: null,
  next: null,
  last: null,
  blocked: false,
}

export function checkError(response) {
  if (Math.floor(response.status / 100) !== 2) {
    const message = JSON.parse(response._bodyText).message
    throw message
  }
}

export function uniqueValues(arr) {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
}

export function getNextPageUrl(response) {
  const link = response.headers.map.link

  if (link) {
    const temp = link[0].split(',')[0]
    const nextLink = temp.slice(temp.indexOf('<') + 1, temp.indexOf('>'))

    return nextLink
  }

  return undefined
}

export function getLastPageUrl(response) {
  const link = response.headers.map.link

  if (link) {
    const temp = link[0].split(',')[1]
    const nextLink = temp.slice(temp.indexOf('<') + 1, temp.indexOf('>'))

    return nextLink
  }

  return undefined
}
