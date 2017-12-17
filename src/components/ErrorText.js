import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

function ErrorText(props) {
  return <Text style={styles.error}>{props.children}</Text>
}

ErrorText.propTypes = {
  children: PropTypes.string,
}

const styles = StyleSheet.create({
  error: { color: 'red', alignSelf: 'center', marginVertical: 20 },
})

export default ErrorText
