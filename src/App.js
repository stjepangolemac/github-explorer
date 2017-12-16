import React, { Component } from "react";
import { createStore } from "redux";
import { StackNavigator } from "react-navigation";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

import Home from "./screens/Home";

class SecondScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Smrdljivi martin</Text>
      </View>
    );
  }
}

export default StackNavigator({
  Home: { screen: Home }
});
