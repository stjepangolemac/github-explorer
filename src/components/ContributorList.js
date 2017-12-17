import React from 'react'
import PropTypes from 'prop-types'

import { StyleSheet, View, FlatList, Text } from 'react-native'

import ContributorListItem from './ContributorListItem'

function renderItem(props) {
  return ({ item }) => {
    return <ContributorListItem label={item} />
  }
}

function ContributorList(props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.contributors}
        renderItem={renderItem(props)}
        keyExtractor={item => item}
      />
    </View>
  )
}

FlatList.propTypes = {
  contributors: PropTypes.arrayOf(
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

export default ContributorList
