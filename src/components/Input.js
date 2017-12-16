import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'

function Input(props) {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder={props.placeholder}
      autoCapitalize="none"
    />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: 'white',
    padding: 5,
  },
})

export default Input
