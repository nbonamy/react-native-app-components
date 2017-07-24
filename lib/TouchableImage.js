
import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import theme from './config/theme';

export default class TouchableImage extends Component {

  static propTypes = {
    padding: React.PropTypes.number,
    activeOpacity: React.PropTypes.number,
  };

  static defaultProps = {
    padding: 0,
    activeOpacity: 1,
  };

  constructor(props) {
    super(props);
  }

  measureImage(event) {
    this._imageLayout = event.nativeEvent.layout;
  }

  render() {
    return (
      <TouchableOpacity style={this.props.style} activeOpacity={this.props.activeOpacity} onPress={(evt) => this.handlePress(evt) } >
        <Image style={this.props.imageStyle} source={this.props.source} onLayout={this.measureImage.bind(this)} />
      </TouchableOpacity>
    );
  }

  handlePress(evt) {

    // check if on press
    if (this.props.onPress == null) {
      return;
    }

    // if no hotspots then direct press
    if (this.props.hotspots == null) {
      this.props.onPress();
      return;
    }

    // compensate contain
    var deltaW = 0;
    var deltaH = 0;
    var imageW = this._imageLayout.width;
    var imageH = this._imageLayout.height;
    if (this.props.ratio > 1 && imageW/imageH < 1) {
      imageH = imageW / this._ratio;
      deltaH = (this._imageLayout.height - imageH) / 2
    } else if (this.props.ratio < 1 && imageW/imageH > 1) {
      imageW = imageH * this._ratio;
      deltaW = (this._imageLayout.width - imageW) / 2;
    }

    // get click in % of image size
    var x = (evt.nativeEvent.locationX - this.props.padding - deltaW) / imageW;
    var y = (evt.nativeEvent.locationY - this.props.padding - deltaH) / imageH;

    // find best region
    var best = null;
    var closest = 1e9;
    for (var i=0; i<this.props.hotspots.length; i++) {
      var hotspot = this.props.hotspots[i];
      var dist = (x-hotspot.coords.x)*(x-hotspot.coords.x)+(y-hotspot.coords.y)*(y-hotspot.coords.y);
      if (dist < closest) {
        best = hotspot;
        closest = dist;
      }
    }

    // done
    if (best != null && this.props.onPress != null) {
      this.props.onPress(best.data);
    }
  }

}
