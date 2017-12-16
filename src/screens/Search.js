import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import Input from '../components/Input'
import Label from '../components/Label'
import RepoList from '../components/RepoList'

export default class Search extends Component {
  static navigationOptions = {
    title: 'Search GitHub users',
  }

  mockRepoData() {
    return [
      { key: 1, name: 'redux-saga' },
      { key: 2, name: 'redux-cycles' },
      { key: 3, name: 'redux-thunk' },
      { key: 4, name: 'redux-promise' },
      { key: 5, name: 'redux-saga' },
      { key: 6, name: 'redux-cycles' },
      { key: 7, name: 'redux-thunk' },
      { key: 8, name: 'redux-promise' },
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <Label>Search repos:</Label>
        <Input placeholder="eg. redux saga" />
        <RepoList repos={this.mockRepoData()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
})
