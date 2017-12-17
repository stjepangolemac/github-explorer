import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Input from '../components/Input'
import Label from '../components/Label'
import RepoList from '../components/RepoList'
import Spinner from '../components/Spinner'
import ErrorText from '../components/ErrorText'
import ScreenContainer from '../components/ScreenContainer'

import { actions as reposActions } from '../modules/repos'

class Search extends Component {
  static navigationOptions = {
    title: 'Search GitHub users',
  }

  onInputChange = value => {
    value.length &&
      this.props.searchRepos({ keywords: value.trim().split(' ') })
  }

  onRepoPress = id => {
    this.props.navigation.navigate('Users', { id })
  }

  render() {
    const { reposLoading, reposError, repos } = this.props

    return (
      <ScreenContainer>
        <Label>Search repos:</Label>
        <Input placeholder="eg. redux saga" onChange={this.onInputChange} />
        {reposError && <ErrorText>{reposError}</ErrorText>}
        {reposLoading && <Spinner />}
        <RepoList repos={repos} onItemPress={this.onRepoPress} />
      </ScreenContainer>
    )
  }
}

Search.propTypes = {
  repos: PropTypes.array,
  reposLoading: PropTypes.bool,
  reposError: PropTypes.string,
  searchRepos: PropTypes.func.isRequired,
}

const connectedSearch = connect(
  state => ({
    repos: state.repos.data,
    reposLoading: state.repos.loading,
    reposError: state.repos.error,
  }),
  dispatch =>
    bindActionCreators({ searchRepos: reposActions.searchRequest }, dispatch)
)(Search)

export default connectedSearch
