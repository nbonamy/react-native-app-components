
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import theme from './config/theme';

export default class Badge extends Component {

  static propTypes = {
    ...theme.propTypes,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    size: PropTypes.number,
    fontSize: PropTypes.number,
  };

  static defaultProps = {
    size: 28,
    fontSize: 16,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.badge, this.props.style, {width: this.props.size, height: this.props.size, borderRadius: this.props.size/2, backgroundColor: theme.propsToColor(this.props)}]}>
        <Text style={[styles.text, {fontSize: this.props.fontSize, color: theme.propsToTextColor(this.props)}]}>{this.props.children}</Text>
      </View>
    );
  }

}

// styles
const styles = StyleSheet.create({
  badge: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
