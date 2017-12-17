import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native'

import ContributorListItem from './ContributorListItem'

import {
  actions as commitsActions,
  selectors as commitsSelectors,
} from '../modules/commits'

function renderItem(props) {
  return ({ item }) => {
    return <ContributorListItem label={item} />
  }
}

function ContributorList(props) {
  const { contributors, getNextPage, gotAllData } = props

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={contributors}
        renderItem={renderItem(props)}
        keyExtractor={item => item}
        onEndReached={!gotAllData && getNextPage}
      />
    </View>
  )
}

ContributorList.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.string),
  getNextPage: PropTypes.func.isRequired,
  gotAllData: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  list: { height: 500 },
})

const connectedContributorList = connect(
  state => ({
    gotAllData: commitsSelectors.blocked(state),
    contributors: commitsSelectors.contributors(state),
  }),
  dispatch =>
    bindActionCreators(
      {
        getNextPage: commitsActions.nextPageRequest,
      },
      dispatch
    )
)(ContributorList)

export default connectedContributorList
