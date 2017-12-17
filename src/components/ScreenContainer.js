import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

function ScreenContainer(props) {
  return <View style={styles.container} children={props.children} />
}

ScreenContainer.propTypes = {
  children: PropTypes.any,
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
})

export default ScreenContainer
