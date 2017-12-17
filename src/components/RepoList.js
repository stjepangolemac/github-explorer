import React from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, View, FlatList } from 'react-native'

import RepoListItem from './RepoListItem'

function renderItem(props) {
  return ({ item }) => {
    return (
      <RepoListItem
        label={item.full_name}
        onPress={() => props.onItemPress(item.id)}
      />
    )
  }
}

function RepoList(props) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={props.repos}
        renderItem={renderItem(props)}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

FlatList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  onItemPress: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  list: { height: 500 },
})

export default RepoList
