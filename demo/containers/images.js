
import React, { Component } from 'react';
import { StyleSheet, Alert, ScrollView, View, Text } from 'react-native';
import { theme, ImageFader, TouchableImage } from 'react-native-app-components';

export default class Images extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://www.chamonix.net/sites/default/files/nodeimages/montblanc4.jpg?itok=yXADYjEV',
        'http://www.guides-mont-blanc.com/wp-content/uploads/2016/11/tour-du-mont-blanc-10.jpg',
        'http://www.guides-du-montblanc.com/wp-content/uploads/2015/03/79.jpg',
        'https://media.camptocamp.org/c2corg_active/1202389341_1355529267BI.jpg'
      ]
    }
  }

  render() {
    return (
      <ScrollView style={{paddingBottom: 32, paddingLeft: 16, paddingRight: 16}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>TOUCHABLE IMAGE</Text>
          <TouchableImage imageStyle={{width: 128, height: 128}} onPress={() => Alert.alert('Hello!')} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>IMAGE FADER</Text>
          <View style={{width: 320, height: 240}}>
            <ImageFader images={this.state.images} />
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
});
