
import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon, Picker } from 'react-native-app-components';
import getDrawerItem from './components/NavBarItem';

import Demo from './containers/demo';
import Buttons from './containers/buttons';
import BadgesIcons from './containers/badges-icons';
import Images from './containers/images';
import Forms from './containers/forms';
import Lists from './containers/lists';

const getDrawerOptions = (navigation, title, iconName) => ({
  title: title,
  drawerLabel: title,
  drawerIcon: <Icon name={iconName} size={20} />,
  headerLeft: getDrawerItem(navigation),
});

const buildScreen = (screen, title, iconName, screens) => ({
  screen : StackNavigator({
    root : {
      screen: screen,
      navigationOptions: ({navigation}) => getDrawerOptions(navigation, title, iconName)
    },
    ...screens
  })
});

let Drawer = DrawerNavigator({
  Demo: buildScreen(Demo, 'Home', 'home'),
  Buttons: buildScreen(Buttons, 'Buttons', 'apps'),
  BadgesIcons: buildScreen(BadgesIcons, 'Badges & Icons', 'information-circle'),
  Images: buildScreen(Images, 'Images', 'image'),
  Forms: buildScreen(Forms, 'Forms', 'ios-create-outline', { Picker: { screen: Picker, mode: 'modal' } }),
  Lists: buildScreen(Lists, 'Lists', 'list'),
});

export default Drawer;
