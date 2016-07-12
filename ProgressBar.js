import React, {
  Component
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
} from 'react-native';

var styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5
  }
});

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.style = styles;
    this.easing= Easing.inOut(Easing.ease);
    this.easingDuration = 500;

    this.state = {
      progress: new Animated.Value(props.initialProgress || 0)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
      this.update();
    }
  }

  update() {
    Animated.timing(this.state.progress, {
      easing: this.easing,
      duration: this.easingDuration,
      toValue: this.props.progress
    }).start();
  }

  render() {
    var fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * this.props.style.width, 1 * this.props.style.width],
    });

    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]}/>
      </View>
    );
  }
}

module.exports = ProgressBar;
