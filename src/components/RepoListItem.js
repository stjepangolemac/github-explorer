import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

function RepoListItem(props) {
  const { onPress, label } = props

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{props.label}</Text>
      <Text>></Text>
    </TouchableOpacity>
  )
}

RepoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default RepoListItem
