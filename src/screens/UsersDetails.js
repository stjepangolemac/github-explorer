import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'

import Label from '../components/Label'
import ScreenContainer from '../components/ScreenContainer'
import ContributorList from '../components/ContributorList'
import ErrorText from '../components/ErrorText'

import { selectors as reposSelectors } from '../modules/repos'
import {
  actions as commitsActions,
  selectors as commitsSelectors,
} from '../modules/commits'

class UsersDetails extends Component {
  componentDidMount() {
    const { resetCommits, getCommits, repo } = this.props

    resetCommits()
    getCommits(repo.id)
  }

  onMorePress = () => {
    this.props.getNextPage()
  }

  render() {
    const {
      navigation,
      repo,
      contributors,
      getNextPage,
      commitsError,
    } = this.props

    return (
      <ScreenContainer>
        {commitsError && <ErrorText>{commitsError}</ErrorText>}
        <View style={styles.panel}>
          <Label>Owner:</Label>
          <Text>{repo.owner.login}</Text>
        </View>
        <Label>Contributors:</Label>
        <ContributorList contributors={contributors} />
      </ScreenContainer>
    )
  }
}

UsersDetails.propTypes = {
  repo: PropTypes.any.isRequired,
  getCommits: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
  commitsError: PropTypes.string,
}

const styles = StyleSheet.create({
  panel: {
    marginBottom: 20,
  },
  more: {
    bottom: 20,
  },
})

const connectedUsersDetails = connect(
  (state, ownProps) => ({
    repo: reposSelectors.repoById(ownProps.navigation.state.params.id)(state),
    commitsError: commitsSelectors.error(state),
  }),
  dispatch =>
    bindActionCreators(
      {
        resetCommits: commitsActions.resetCommits,
        getCommits: commitsActions.getRequest,
        getNextPage: commitsActions.nextPageRequest,
      },
      dispatch
    )
)(UsersDetails)

export default connectedUsersDetails
