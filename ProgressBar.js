var React = require('react-native');

var {
  Animated,
  Easing,
  StyleSheet,
  View
} = React;

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

var ALMOST_ZERO = 0.0000001;

var ProgressBar = React.createClass({

  getDefaultProps() {
    return {
      style: styles,
      easing: Easing.inOut(Easing.ease),
      easingDuration: 500,
      animateOnLoad: true,
      useFloat: true
    };
  },

  getInitialState() {
    return {
      progress: new Animated.Value(this.props.animateOnLoad ? ALMOST_ZERO : this.props.progress)
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.progress >= ALMOST_ZERO && this.props.progress != prevProps.progress) {
      this.animate();
    }
  },

  componentDidMount() {
    if (this.props.animateOnLoad && this.props.progress > ALMOST_ZERO) {
      this.animate();
    }
  },

  render() {
    var fillWidth = this.state.progress.interpolate({
      inputRange : this.props.useFloat ? [0.0, 1.0] : [0, 100],
      outputRange: [ALMOST_ZERO, this.props.style.width]
    });

    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]}/>
      </View>
    );
  },

  animate(progress) {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress
    }).start();
  }
});

module.exports = ProgressBar;
