
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Button, Icon } from './index';
import { List, SimpleListItem } from './List';
import PropTypes from 'prop-types';
import theme from './config/theme';
import find from 'lodash.find';
import get from 'lodash.get';

class PickerItem extends Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  }

}

class Picker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLabel: this._getLabel(props),
      dataSource: props.children
    };
  }

  static propTypes = {
    ...View.propTypes,
    title: PropTypes.string,
    buttonLabel: PropTypes.string,
    selectedValue: PropTypes.string,
    onValueChange: PropTypes.func,
    animated: PropTypes.bool,
  };

  static defaultProps = {
    animated: true,
  };

  componentWillReceiveProps(nextProps) {
    const currentLabel = this.state.currentLabel;
    const nextLabel = this._getLabel(nextProps);
    const currentDS = this.state.dataSource;
    const nextDS = nextProps.children

    if (currentLabel !== nextLabel) {
      this.setState({
        currentLabel: nextLabel,
      });
    }
    if (currentDS !== nextDS) {
      this.setState({
        dataSource: nextDS,
      });
    }
  }

  pick() {
    this._showSelector();
  }

  _showSelector() {

    var passProps = {
      select: true,
      title: this.props.title,
      animated: this.props.animated,
      items: this.props.children.map((child) => {
        return {
          label: child.props.label,
          value: child.props.value
        };
      }),
      onValueChange: this.props.onValueChange,
      selectedValue: this.props.selectedValue
    };

    if (this.props.navigator) {
      this.props.navigator.push({
        screen: 'Picker',
        title: this.props.title,
        backButtonTitle: '',
        animated: this.props.animated,
        passProps: passProps,
        navigatorStyle: {
          ...theme.navigatorStyle,
          tabBarHidden: true
        }
      })
    } else if (this.props.navigation) {
      this.props.navigation.navigate('Picker', {
        navigationOptions: {
          title: this.props.title
        },
        ...passProps
      });
    }
  }

  _getProps() {
    if (this.props.navigation != null && this.props.navigation.state != null && this.props.navigation.state.params != null) {
      return this.props.navigation.state.params;
    } else {
      return this.props;
    }
  }

  _closeSelector() {
    if (this.props.navigator != null) {
      this.props.navigator.pop({
        animated: this.props.animated,
      });
    } else if (this.props.navigation != null) {
      this.props.navigation.goBack();
    }
  }

  _getLabel(props) {
    const item = find(props.children, child => child.props.value === props.selectedValue);
    return get(item, 'props.label');
  }

  _renderButton() {
    const text = this.props.buttonLabel ? this.props.buttonLabel : (this.state.currentLabel ? this.state.currentLabel : this.props.defaultLabel);
    return (
      <TouchableHighlight style={this.props.buttonStyle} underlayColor="transparent" onPress={() => { this._showSelector(); }}>
        <Text style={[styles.label, this.props.textStyle]}>{text}</Text>
      </TouchableHighlight>
    );
  }

  _renderSelector() {
    return (
      <List
        data={this._getProps().items}
        keyExtractor={item => item.value}
        renderItem={({item,separators}) =>
          <SimpleListItem
            text={item.label}
            separators={separators}
            selected={(item.value === this._getProps().selectedValue)}
            onPress={() => { this._closeSelector(); this._getProps().onValueChange(item.value); }}
          />
        }
      />
    );
  }

  render() {
    if (this._getProps().select) {
      return this._renderSelector();
    } else {
      return this._renderButton();
    }
  }

}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  item: {
    flex: 1,
    fontSize: 16,
  },
});

export {
  Picker,
  PickerItem
};
