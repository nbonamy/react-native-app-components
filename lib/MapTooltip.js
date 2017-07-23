
import React, { Component } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import Icon from './Icon';

export default class MapTooltip extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={styles.tooltip}>
        {this.props.marker.properties.title}{' '} <Icon name="ios-arrow-dropright" style={styles.tooltipIcon} />
      </Text>
    );
  }

}

// RN styles
const styles = StyleSheet.create({
  tooltip: {
    fontSize: (Platform.OS === 'ios') ? 14 : 18,
  },
  tooltipIcon: {
    fontSize: (Platform.OS === 'ios') ? 16 : 20,
  }
});
