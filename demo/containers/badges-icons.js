
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { theme, Badge, Icon } from 'react-native-app-components';

export default class BadgesIcons extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={{paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>BADGES</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Badge primary style={styles.badge}>0</Badge>
            <Badge info style={styles.badge}>1</Badge>
            <Badge success style={styles.badge}>2</Badge>
            <Badge warning style={styles.badge}>3</Badge>
            <Badge danger style={styles.badge}>4</Badge>
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>ICONS</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Icon name="add-circle" color={theme.colors.primary} size={32} style={styles.icon} />
            <Icon name="md-alert" color={theme.colors.danger} size={32} style={styles.icon} />
            <Icon font="entypo" name="archive" color={theme.colors.success} size={32} style={styles.icon} />
          </View>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginTop: 32,
    marginBottom: 16,
    color: theme.colors.dark,
  },
  badge: {
    margin: 8,
  },
  icon: {
    margin: 8,
  },
});
