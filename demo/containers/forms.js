
import React, { Component } from 'react';
import { StyleSheet, Alert, ScrollView, View, Text } from 'react-native';
import { theme, Input, Picker, PickerItem } from 'react-native-app-components';

export default class Forms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      country: 'France'
    };
  }

  render() {
    return (
      <ScrollView style={{paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>INPUT</Text>
          <Input style={styles.input} placeholder="Username" autoCorrect={false} autoCapitalize="none" />
          <Input secureTextEntry style={styles.input} placeholder="Password" />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>PICKER</Text>
          <Picker
            title="Picker"
            buttonLabel={'Select a country. Current value = ' + this.state.country}
            navigation={this.props.navigation}
            onValueChange={(value) => this.setState({country: value})}
            selectedValue={this.state.country}
          >
            <PickerItem label="France" value="France" />
            <PickerItem label="Germany" value="Germany" />
            <PickerItem label="Italy" value="Italy" />
            <PickerItem label="Spain" value="Spain" />
          </Picker>
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
  input: {
    marginBottom: 16,
  },
});
