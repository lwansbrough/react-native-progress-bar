import React from 'react';
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

var ProgressBar = React.createClass({

  getDefaultProps() {
    return {
      style: styles,
      easing: Easing.inOut(Easing.ease),
      easingDuration: 850,
      updateInterval: 1000,
      updateRatio: .15
    };
  },

  getInitialState() {
    return {
      progress: new Animated.Value(this.props.initialProgress || 0),
      calculatedWidth: 0
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
      this.update();
    }
  },

  componentWillUnmount(){
    this.clearIntt();
  },
  clearIntt(){
    if(this._interval) clearInterval(this._interval);
  },
  start() {
    this.clearIntt();
    this._interval = setInterval((()=>{
      console.log('PROG BAR: ' + JSON.stringify(this.state));
      var val = JSON.stringify(this.state.progress)*1;
      console.log('PROG BAR IS: ' + val);
      var to = val + ((1-val)*this.props.updateRatio);
      if(to>.99)
        to = .99;
      console.log('UPDATE PROG BAR TO: ' + to);
      this.update(to);
    }).bind(this),this.props.updateInterval)
  },

  end() {
    this.clearIntt();
    this.update(1);    
  },

  render() {

    var fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * (this.props.style.width || this.state.calculatedWidth ),
          1 * (this.props.style.width || this.state.calculatedWidth)]
    });

    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}
            onLayout={(event) => {
               if (!this.props.style.width) {
                    this.setState({calculatedWidth: event.nativeEvent.layout.width})
                    }
                }}>
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]}/>
      </View>
    );
  },

  update(prog) {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: prog ? prog  : this.props.progress
    }).start();
  }
});

module.exports = ProgressBar;
