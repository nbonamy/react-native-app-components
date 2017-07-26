
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from 'react-native-app-components';

export default class Demo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={theme.styles.empty}>Welcome to the demo!</Text>
    );
  }

}
