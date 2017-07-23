
import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

export default {

  // colors
  colors: {
    theme: '#01357E',
    light: '#f4f4f4',
    dark: '#000000',
    info: '#66b2f3',
    danger: '#d75452',
    primary: '#157efc',
    warning: '#efac57',
    success: '#5fb660',
    lightText: '#222',
    active: '#007aff',
    greener: '#40c73a',
    orange: '#f96d23',
  },

  // stylesheets
  styles: StyleSheet.create({
    container: {
      flex: 1,
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    centered: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    form: {
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
    },
    cell: {
      height: 44,
      paddingLeft: 16,
      paddingRight: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    active: {
      color: '#007aff',
    },
    empty: {
      marginTop: 64,
      fontSize: 32,
      textAlign: 'center',
      padding: 16,
      color: '#888',
    },
  }),

  // reusable prop types
  propTypes: {
    light: React.PropTypes.bool,
    dark: React.PropTypes.bool,
    info: React.PropTypes.bool,
    danger: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    warning: React.PropTypes.bool,
    success: React.PropTypes.bool,
  },

  // utilities
  propsToColor: function(props) {
    if (props.backgroundColor) return props.backgroundColor;
    if (props.transparent) return 'transparent';
    if (props.light) return this.colors.light;
    if (props.dark) return this.colors.dark;
    if (props.info) return this.colors.info;
    if (props.danger) return this.colors.danger;
    if (props.primary) return this.colors.primary;
    if (props.warning) return this.colors.warning;
    if (props.success) return this.colors.success;
  },
  propsToTextColor: function(props) {
    if (props.textColor) return props.textColor;
    if (props.transparent) return '#888';
    if (props.light) return this.colors.lightText;
    else return 'white';
  },
  isSmallPhone: function() {
    return (Dimensions.get('window').height <= 568);
  },

}
