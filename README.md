# react-native-progress-bar

An animated progress bar for React Native.

![](https://i.imgur.com/EGufppz.gif)

## Getting started

1. `npm install react-native-progress-bar@latest --save`

## Example usage

```javascript
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var ProgressBar = require('react-native-progress-bar');

var rnsandbox = React.createClass({

  getInitialState() {
    return {
      progress: 0
    };
  },

  render() {

    setTimeout((function() {
      this.setState({ progress: this.state.progress + (0.4 * Math.random())});
    }).bind(this), 1000);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
        <ProgressBar
          fillStyle={{}}
          backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
          style={{marginTop: 10, width: 300}}
          progress={this.state.progress}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rnsandbox', () => rnsandbox);

```

## Properties

#### `progress`

The progress value for the progress bar. Ranges from `0..1`.

#### `easing`

The easing function which is applied to the animation. Can be custom or one of the functions on the `ProgressBar.easingTypes` object.

#### `easingDuration`

The time taken to complete the animation.

#### `fillStyle`

The style for the progress bar fill.

#### `backgroundStyle`

The style for the progress bar's background.

#### `style`

The style for the entire component. This doesn't really differ from the `backgroundStyle` property. You must set `width` either here or in `backgroundStyle` in order to make sure the component works properly.


## Component methods

#### `update(progress)`

The recommended way to update the progress of the progress bar is to use the `progress` property. If you prefer, you can use this `update` method to update the progress directly. To access this method, set the `ref` property on the `<ProgressBar>` and call `this.refs.progressBarName.update(0.3)`
