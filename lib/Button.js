
import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import theme from './config/theme';

export default class Button extends Component {

  static propTypes = {
    ...View.propTypes,
    ...theme.propTypes,
    height: PropTypes.number,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    textAlign: PropTypes.string,
  };

  static defaultProps = {
    height: 48,
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight style={this.props.style} underlayColor="transparent" onPress={this.props.onPress}>
        <View {...this.props} style={[styles.button, this.props.block && styles.block, {height: this.props.height, borderRadius: this.props.borderRadius, backgroundColor: theme.propsToColor(this.props)}]}>
          <Text style={[styles.text, {textAlign: this.props.textAlign, fontSize: this.props.fontSize, color: theme.propsToTextColor(this.props)}]}>{this.props.children}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  block: {
    alignSelf: 'stretch',
  },
  text: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  }
});
