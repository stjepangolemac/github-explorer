import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

function Label(props) {
  return <Text style={styles.label} children={props.children} />
}

Label.propTypes = {
  children: PropTypes.string,
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
})

export default Label
