import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5,
  },
});

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(this.props.initialProgress || 0),
      calculatedWidth: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.progress >= 0 && this.props.progress !== prevProps.progress) {
      this.update();
    }
  }

  update() {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress,
    }).start();
  }

  render() {
    const fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * (this.props.style.width || this.state.calculatedWidth),
        1 * (this.props.style.width || this.state.calculatedWidth)],
    });

    return (
      <View
        style={[styles.background, this.props.backgroundStyle, this.props.style]}
        onLayout={(event) => {
          if (!this.props.style.width) {
            this.setState({ calculatedWidth: event.nativeEvent.layout.width });
          }
        }}
      >
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]} />
      </View>
    );
  }
}

ProgressBar.defaultProps = {
  style: styles,
  easing: Easing.inOut(Easing.ease),
  easingDuration: 500,
};

export default ProgressBar;
