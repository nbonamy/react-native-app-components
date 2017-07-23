
import React, { Component } from 'react';
import { Platform, StyleSheet, Animated, View, Image } from 'react-native';

export default class ImageFader extends Component {

  // private attr
  _timer = -1;
  _opacity1 = 1;

  static propTypes = {
    images: React.PropTypes.array,
    delay: React.PropTypes.number,
    animDuration: React.PropTypes.number,
  };

  static defaultProps = {
    delay: 5000,
    animDuration: 1000,
  }


  constructor(props) {
    super(props);
    this.state = {
      picIndex1: 0,
      picIndex2: -1,
      opacity1: new Animated.Value(1),
      opacity2: new Animated.Value(0),
      fadeImmediate: false,
      disappeared: false,
    }
  }

  componentDidMount() {

    // to know which image is displayed
    this._opacity1 = 1;
    this.state.opacity1.addListener((value) => {
      this._opacity1 = value.value;
    });

  }

  componentWillDisappear() {
    this.componentWillUnmount();
    this.setState({
      disappeared: true
    });
  }

  componentWillAppear() {
    if (this.state.disappeared) {
      if (this._timer == -1 && this.props.images.length > 1) {
        this._timer = setTimeout(this.loadNextImage.bind(this), this.props.delay);
        console.log('ImageFader timer defined (componentWillAppear): ' + this._timer);
      }
      this.setState({
        disappeared: false
      });
    }
  }

  componentWillUnmount() {

    // clear timer
    if (this._timer != -1) {
      console.log('ImageFader timer cleared: ' + this._timer);
      clearTimeout(this._timer);
      this._timer = -1;
    }

  }

  render() {
    return (
      <View style={{flex:1}}>
        <Image
          ref="placeholder"
          style={[styles.image, {width:null, height:null}]}
          source={require('../images/image_placeholder.png')}
        />
        <Animated.Image
          ref="image1"
          style={[styles.image, {opacity:this.state.opacity1}]}
          source={{ uri: this.props.images[this.state.picIndex1] }}
          onLoadEnd={this.onImageLoad.bind(this) }
        />
        { this.state.picIndex2 >= 0 &&
          <Animated.Image
            ref="image2"
            style={[styles.image, {opacity:this.state.opacity2}]}
            source={{ uri: this.props.images[this.state.picIndex2] }}
            onLoadEnd={this.onImageLoad.bind(this) }
          />
        }
      </View>
    );
  }

  onImageLoad() {

    // first load or not
    if (this.state.picIndex2 == -1) {

      // if multiple images, load next
      if (this.props.images.length > 1) {
        this._timer = setTimeout(this.loadNextImage.bind(this), this.props.delay);
        console.log('ImageFader timer defined (onImageLoad): ' + this._timer);
      }

    } else {

      // cross fade loaded image
      this.crossFadeImages();

    }

  }

  async loadNextImage() {

    // log
    console.log('ImageFader timer triggered (loadNextImage): ' + this._timer);

    // check who is visible
    let nextIndex = -1;
    if (this.isFirstImageDisplayed()) {
      nextIndex = (this.state.picIndex1 + 1) % this.props.images.length;
      await this.setState({
        picIndex2: nextIndex
      });
    } else {
      nextIndex = (this.state.picIndex2 + 1) % this.props.images.length;
      await this.setState({
        picIndex1: nextIndex
      });
    }

    // if we have looped to first image, onLoad will not be called agaib
    if (nextIndex == 0 || this.state.fadeImmediate) {
      await this.setState({
        fadeImmediate: true
      });
      this.crossFadeImages();
    }

    // clear timeout
    this._timer = -1;

  }

  crossFadeImages() {

    // set next index on right image and matching target opacities
    var targetOpacity1 = this.isFirstImageDisplayed() ? 0 : 1;
    var targetOpacity2 = 1 - targetOpacity1;

    // now animate opacitiies
    var self = this;
    Animated.parallel([
      Animated.timing(this.state.opacity1, { toValue: targetOpacity1, duration: this.props.animDuration }),
      Animated.timing(this.state.opacity2, { toValue: targetOpacity2, duration: this.props.animDuration })
    ]).start(() => {
      if (self._timer == -1) {
        self._timer = setTimeout(self.loadNextImage.bind(self), self.props.delay);
        console.log('ImageFader timer defined (crossFadeImages): ' + self._timer);
      } else {
        console.log('ImageFader timer already defined (crossFadeImages): ' + self._timer);
      }
    });

  }

  isFirstImageDisplayed() {
    return (this._opacity1 > 0.5);
  }

}

// native styles
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    position:'absolute',
    backgroundColor: 'transparent',
    left: 0,
    right:0,
    top: 0,
    bottom: 0,
  }
});
