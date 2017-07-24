
import React, { Component } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
//import Zocial from 'react-native-vector-icons/Zocial';

export default class Icon extends Component {

  static propTypes = {
    ...View.PropTypes,
    ...Ionicons.PropTypes,
    font: PropTypes.string,
  };

  static defaultProps = {
    size: 18,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {

    // select font
    this.Icon = Ionicons;
    if (this.props.font) {
      switch (this.props.font) {
        case 'ionic':
          this.Icon = Ionicons;
          break;
        case 'entypo':
          this.Icon = Entypo;
          break;
        case 'fa':
          this.Icon = FontAwesome;
          break;
        case 'material':
          this.Icon = MaterialIcons;
          break;
        case 'octicons':
          this.Icon = Octicons;
          break;
      }
    }

    // get props and translate name
    this._props = {};
    var keys = Object.keys(this.props);
    for (i=0; i<keys.length; i++) {

      // basic
      var key = keys[i];
      var val = this.props[key];
      this._props[key] = val;

      // flatten styles
      if (key === 'style') {
        this._props[key] = StyleSheet.flatten(val);
      }

      // auto-prefix icons
      if (key === 'name' && this.Icon == Ionicons) {
        if (val.startsWith('ios-') === false && val.startsWith('md-') === false) {
          var prefix = Platform.OS === 'ios' ? 'ios' : 'md';
          this._props[key] = prefix + '-' + this.props.name;
        }
      }
    }

  }

  render() {
    return (
      <this.Icon {...this._props} />
    );
  }
}
