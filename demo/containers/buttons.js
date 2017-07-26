
import React, { Component } from 'react';
import { StyleSheet, Alert, ScrollView, View, Text } from 'react-native';
import { theme, Button, SlideButton } from 'react-native-app-components';

export default class Buttons extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={{paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
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
});
