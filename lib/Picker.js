
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Button, Icon } from './index';
import { List, SimpleListItem } from './List';
import theme from './config/theme';
import _ from 'lodash';

class PickerItem extends Component {

  static propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.string,
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
    title: React.PropTypes.string,
    buttonLabel: React.PropTypes.string,
    selectedValue: React.PropTypes.string,
    onValueChange: React.PropTypes.func,
    animated: React.PropTypes.bool,
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
    this.props.navigator.push({
      screen: 'golfomax.Picker',
      title: this.props.title,
      backButtonTitle: '',
      animated: this.props.animated,
      passProps: {
        select: true,
        title: this.props.title,
        animated: this.props.animated,
        items: React.Children.map(this.props.children, (child) => {
          return {
            label: child.props.label,
            value: child.props.value
          };
        }),
        onValueChange: this.props.onValueChange,
        selectedValue: this.props.selectedValue
      },
      navigatorStyle: {
        ...theme.navigatorStyle,
        tabBarHidden: true
      }
    })
  }

  _closeSelector() {
    this.props.navigator.pop({
      animated: this.props.animated,
    });
  }

  _getLabel(props) {
    const item = _.find(props.children, child => child.props.value === props.selectedValue);
    return _.get(item, 'props.label');
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
        data={this.props.items}
        keyExtractor={item => item.value}
        renderItem={({item,separators}) =>
          <SimpleListItem
            text={item.label}
            separators={separators}
            selected={(item.value === this.props.selectedValue)}
            onPress={() => { this._closeSelector(); this.props.onValueChange(item.value); }}
          />
        }
      />
    );
  }

  render() {
    if (this.props.select) {
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
