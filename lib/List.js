
import React, { Component } from 'react';
import { Platform, StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';
import { Button, Icon } from './index';
import PropTypes from 'prop-types';
import theme from './config/theme';

class List extends FlatList {

  static propTypes = {
    icon: PropTypes.bool,
    separators: PropTypes.bool,
  };

  static defaultProps = {
    icon: false,
    separators: true,
  }

  render() {
    return (
      <FlatList
        style={theme.styles.container}
        ItemSeparatorComponent={this.props.separators ? () => <ListSeparator icon={this.props.icon} /> : null}
        {...this.props}
      />
    );
  }

}

class ListSeparator extends Component {

  static propTypes = {
    icon: React.PropTypes.bool,
  };

  static defaultProps = {
    icon: false,
  }

  render() {
    return (
      <View style={[styles.separator, this.props.icon && Platform.OS === 'ios' && { marginLeft: 42 }]} />
    );
  }
}

class ListHeader extends Component {
  render() {
    return (
      <View style={[styles.header, this.props.frameStyle]}>
        <Text style={[styles.title, this.props.textStyle]}>{this.props.children}</Text>
      </View>
    );
  }
}

class ListItem extends Component {

  static propTypes = {
    onPress: React.PropTypes.func,
    separators: React.PropTypes.object,
  }

  static defaultProps = {
    onPress: () => {},
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="#d9d9d9"
        onShowUnderlay={this.props.separators && this.props.separators.highlight}
        onHideUnderlay={this.props.separators && this.props.separators.unhighlight}
      >
        <View style={[theme.styles.cell, this.props.style]}>
          {this.props.children}
        </View>
      </TouchableHighlight>
    );
  }

}

class SimpleListItem extends Component {

  static propTypes = {
    label: React.PropTypes.string,
    onPress: React.PropTypes.func,
    selected: React.PropTypes.bool,
    textStyle: React.PropTypes.any,
    separators: React.PropTypes.object,
  }

  static defaultProps = {
    label: '',
    onPress: () => {},
    selected: false,
  }

  render() {
    return (
      <ListItem separators={this.props.separators} onPress={this.props.onPress}>
        <Text style={[styles.item, this.props.textStyle, this.props.selected && theme.styles.active]}>{this.props.text}</Text>
        { this.props.selected &&
          <Icon name="checkmark" size={Platform.OS === 'ios' ? 36 : 22} style={this.props.selected && theme.styles.active}/>
        }
      </ListItem>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    height: 34,
    backgroundColor: '#f0eff5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c9c9c9',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d1d1d1',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 12,
    color: 'black',
  },
  separator: {
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c9c9c9',
  },
  item: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});

export {
  List,
  ListItem,
  ListHeader,
  ListSeparator,
  SimpleListItem,
};
