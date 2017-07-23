
import React, { Component } from 'react';
import { StyleSheet, View, Text, PanResponder } from 'react-native';
import Icon from './Icon';

const BORDER = 2;

export default class SlideButton extends Component {

  static propTypes = {
    frameColor: React.PropTypes.string,
    buttonColor: React.PropTypes.string,
  };

  _frameWidth = 0;
  _buttonWidth = 0;

  constructor(props) {

    // base stuff
    super(props);
    this.state = {
      unlocked: false,
      label: this.props.label, // for debugging purposes
    };

    // needed to animate
    this._buttonStyles = {
      style: {
        left: 1,
      }
    };

  }

  async reset() {

    // log
    console.log('reset');

    // reset button
    this._buttonStyles.style.left = BORDER;
    this.updateButtonStyle();

    // start again
    //this.initPanResponder();

    // reset state
    await this.setState({
      unlocked: false
    });

  }

  componentWillMount() {
    this.initPanResponder();
  }

  initPanResponder() {

    this._panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },

      onPanResponderGrant: (evt, gestureState) => {
        console.log('grant');
        this._moving = true;
      },

      onPanResponderMove: (evt, gestureState) => {

        //console.log('move: ' + gestureState.dx);
        if (this._moving === true) {

          // clamp
          //console.log(gestureState.dx);
          var maxX = this._frameWidth - this._buttonWidth - BORDER*3;
          var dx = Math.max(BORDER, gestureState.dx);
          var dx = Math.min(dx, maxX);

          // debug
          //this.setState({ label: '' + dx + ' / ' + maxX });

          // update
          this._buttonStyles.style.left = dx;
          this.updateButtonStyle();

          // test
          if (dx >= maxX) {
            this._moving = false;
            this.setState({
              unlocked: true
            });
            if (typeof(this.props.onUnlock) == 'function') {
              this.props.onUnlock.bind(this)();
            }
          }

        } else {

          //console.log('unlocked');

        }

      },

      onPanResponderRelease: (evt, gestureState) => {
        console.log('release');
        if (this.state.unlocked == false) {
          this.reset();
        }
      },

      onPanResponderTerminate: (evt, gestureState) => {
        console.log('terminate');
        if (this.state.unlocked == false) {
          this.reset();
        }
      },

    });

  }

  componentDidMount() {

    // merge some styles
    this.refs.frame.setNativeProps({
      style: this.props.style
    });
    this.refs.frame.setNativeProps({
      style: {
        backgroundColor: this.props.frameColor,
        borderColor: this.props.frameColor,
      }
    });
    this.refs.button.setNativeProps({
      style: {
        backgroundColor: this.props.buttonColor
      }
    })
  }

  measureFrame(event) {
    this._frameWidth = event.nativeEvent.layout.width;
  }

  measureButton(event) {
    this._buttonWidth = event.nativeEvent.layout.width;
  }

  render() {
    return (
      <View ref="frame" style={styles.frame} onLayout={this.measureFrame.bind(this)}>
        <Text style={styles.label}>{this.state.label}</Text>
        <View ref="button" style={styles.button} {...this._panResponder.panHandlers} onLayout={this.measureButton.bind(this)}>
          <Icon name="md-arrow-round-forward" style={styles.icon} />
        </View>
      </View>
    );
  }

  updateButtonStyle() {
    this.refs.button && this.refs.button.setNativeProps(this._buttonStyles);
  }
}

// RN styles
const styles = StyleSheet.create({
  frame: {
    height: 42,
    borderWidth: BORDER,
    borderColor: '#5fb760',
    backgroundColor: '#5fb760',
    borderRadius: 4,
  },
  label: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    top: 1,
    left: BORDER,
    bottom: 1,
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: '#305931',
  },
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 4,
    left: 8,
    color: 'white',
    fontSize: 28
  }
});
