import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-app-components';

class NavBarItem extends Component {

  render() {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 16 }}
        onPress={this.props.onPress}>
        <Icon name="menu" size={24} />
      </TouchableOpacity>
    );
  }

}

export default (navigation) => (
  <NavBarItem
    iconName="menu"
    onPress={() => { navigation.navigate('DrawerOpen') } }
  />
);
