import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

function Spinner(props) {
  return <ActivityIndicator style={styles.spinner} />
}

const styles = StyleSheet.create({
  spinner: { marginVertical: 20 },
})

export default Spinner
