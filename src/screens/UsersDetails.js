import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Text } from 'react-native'

import Label from '../components/Label'
import ScreenContainer from '../components/ScreenContainer'
import ContributorList from '../components/ContributorList'

import { selectors as reposSelectors } from '../modules/repos'
import {
  actions as commitsActions,
  selectors as commitsSelectors,
} from '../modules/commits'

class UsersDetails extends Component {
  componentDidMount() {
    const { getCommits, repo } = this.props

    getCommits(repo.id)
  }

  render() {
    const { navigation, repo, contributors } = this.props

    console.log(this.props.commits)

    return (
      <ScreenContainer>
        <Text>UsersDetails {navigation.state.params.id}</Text>
        <Label>Owner:</Label>
        <Text>{repo.owner.login}</Text>
        <Label>Contributors:</Label>
        <ContributorList contributors={contributors} />
      </ScreenContainer>
    )
  }
}

UsersDetails.propTypes = {
  repo: PropTypes.any.isRequired,
  getCommits: PropTypes.func.isRequired,
  contributors: PropTypes.array.isRequired,
}

const connectedUsersDetails = connect(
  (state, ownProps) => ({
    repo: reposSelectors.repoById(ownProps.navigation.state.params.id)(state),
    contributors: commitsSelectors.contributors(state),
  }),
  dispatch =>
    bindActionCreators({ getCommits: commitsActions.getRequest }, dispatch)
)(UsersDetails)

export default connectedUsersDetails
