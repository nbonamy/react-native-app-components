
import React, { Component } from 'react';
import { StyleSheet, Alert, ScrollView, View, Text } from 'react-native';
import { theme, Icon, List, ListItem,  ListHeader, ListSeparator, SimpleListItem  } from 'react-native-app-components';

export default class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 0, title: 'John', icon: 'man' },
        { id: 1, title: 'Jim', icon: 'man'  },
        { id: 2, title: 'Mary', icon: 'woman'  },
        { id: 3, title: 'Paul', icon: 'man'  },
        { id: 4, title: 'Lisa', icon: 'woman'  },
      ]
    }
  }

  render() {
    return (
      <List
        data={this.state.items}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <ListHeader>{this.state.items.length} RESULTS</ListHeader>}
        renderItem={({item,separators}) => {
          return (
            <ListItem seps={separators} onPress={() => Alert.alert(item.title)}>
              <Icon name={item.icon} color="green" size={22} style={{marginRight:16}} />
              <Text style={{flex:1,fontSize:16}}>{item.title}</Text>
              <Icon name="arrow-forward" />
            </ListItem>
          );
        }}
      />
    );
  }

}
