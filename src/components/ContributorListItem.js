import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

function ContributorListItem(props) {
  const { onPress, label } = props

  return (
    <TouchableOpacity style={styles.container}>
      <Text>{props.label}</Text>
    </TouchableOpacity>
  )
}

ContributorListItem.propTypes = {
  label: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
})

export default ContributorListItem
