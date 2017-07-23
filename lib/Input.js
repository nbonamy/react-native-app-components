
import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput } from 'react-native';
import theme from '../config/theme';

export default class Text extends Component {

  static propTypes = {
    ...TextInput.propTypes,
    underlineColor: React.PropTypes.string,
    underlineWidth: React.PropTypes.number,
  };

  static defaultProps = {
    underlineColor: '#c7c7c7',
    underlineWidth: StyleSheet.hairlineWidth,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.frame, this.props.style, Platform.OS === 'ios' && {borderBottomColor: this.props.underlineColor, borderBottomWidth: this.props.underlineWidth}]}>
        <TextInput {...this.props} style={styles.input}/>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  frame: {
    height: 40,
  },
  input: {
    height: 40,
    marginLeft: 4,
    marginRight: 4,
    borderWidth: 0,
    fontSize: Platform.OS === 'ios' ? 17 : 19,
  }
});
