
import React, { Component } from 'react';
import { StyleSheet, Alert, ScrollView, View, Text } from 'react-native';
import { theme, Button, Badge, Icon, Input, SlideButton, Picker, PickerItem } from 'react-native-app-components';

export default class Demo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={{marginTop: 32, marginBottom: 32, marginLeft: 16, marginRight: 16}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>SLIDE BUTTON</Text>
          <SlideButton onUnlock={() => this.onUnlock()} label="Scroll to unlock" ref={(ref) => this.slide = ref}/>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>BUTTONS</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Button primary style={styles.button} onPress={() => this.onButton()}>{'Primary'}</Button>
            <Button info style={styles.button} onPress={() => this.onButton()}>{'Info'}</Button>
            <Button success style={styles.button} onPress={() => this.onButton()}>{'Success'}</Button>
            <Button warning style={styles.button} onPress={() => this.onButton()}>{'Warning'}</Button>
            <Button danger style={styles.button} onPress={() => this.onButton()}>{'Danger'}</Button>
            <Button backgroundColor='#000000' textColor='#FFFFFF' style={styles.button} onPress={() => this.onButton()}>Custom</Button>
          </View>
        </View>
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
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>INPUT</Text>
          <Input style={styles.input} placeholder="Username" autoCorrect={false} autoCapitalize="none" />
          <Input secureTextEntry style={styles.input} placeholder="Password" />
        </View>
      </ScrollView>
    );
  }

  onButton() {
    Alert.alert('Button pressed');
  }

  onUnlock() {
    Alert.alert('Congratulations!');
    this.slide.reset();
  }


}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginTop: 32,
    marginBottom: 16,
    color: theme.colors.dark,
  },
  button: {
    margin: 8,
  },
  badge: {
    margin: 8,
  },
  icon: {
    margin: 8,
  },
  input: {
    marginBottom: 16,
  },
});
