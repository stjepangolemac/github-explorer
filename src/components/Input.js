import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'

function Input(props) {
  const { placeholder, onChange } = props;

  return (
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={onChange}
    />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: 'white',
    padding: 5,
  },
})

export default Input
