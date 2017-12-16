import React from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, View, FlatList, Text } from 'react-native'

import RepoListItem from './RepoListItem'

function RepoList(props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.repos}
        renderItem={({ item }) => <RepoListItem label={item.name} />}
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
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
})

export default RepoList
