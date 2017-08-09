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

## Infinite progress usage example

```javascript
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} = React;
var ProgressBar = require('react-native-progress-bar');

var rnsandbox = React.createClass({

  render() {

    return (
      <View style={styles.container}>
       <Button
          onPress={()=>{this.progbar.start()}}
          title="Start Progress Bar"/>
        <Button style={{margin:20}}
          onPress={()=>{this.progbar.end()}}
          title="Done!"/>
        <ProgressBar
          fillStyle={{}}
          backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
          style={{marginTop: 10, width: 300}}
          ref={(p)=>{this.progbar = p}}
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
  }
});

AppRegistry.registerComponent('rnsandbox', () => rnsandbox);

```

## Properties

| Prop | Description | Default |
|---|---|---|
|**`progress`**|The progress value for the progress bar. Ranges from `0..1`.|None|
|**`easingDuration`**|The time taken to complete the animation in milliseconds.|`500`|
|**`easing`**|Function from [`Easing`](https://github.com/facebook/react-native/blob/master/Libraries/Animation/Animated/Easing.js).|`Easing.inOut(Easing.ease)`|
|**`fillStyle`**|The style for the progress bar fill.|None|
|**`backgroundStyle `**|The style for the progress bar's background.|None|
|**`style `**|The style for the entire component. This doesn't really differ from the `backgroundStyle` property. You must set width either here or in `backgroundStyle` in order to make sure the component works properly.|See [`ProgressBar.js`](https://github.com/lwansbrough/react-native-progress-bar/blob/master/ProgressBar.js)|
|**`updateInterval`**|The interval in milliseconds to update the animation when using method **`start()`**.|`1000`|
|**`updateRatio`**|The ratio (of the remaining value) to periodically update the progressbar value when using method **`start()`**. It increases by `15%` periodically by default|`.15`|


## Component methods
| Method | Description |
|---|---|
| **`update(progress)`** | The recommended way to update the progress of the progress bar is to use the `progress` property. If you prefer, you can use this `update` method to update the progress directly. To access this method, set the `ref` property on the `<ProgressBar>` and call `this.refs.progressBarName.update(0.3)` |
| **`start()`** | To start the progressbar in infinite method. It updates every `updateInterval` (default: 1000) milliseconds some amount in percentage (set on prop `updateRatio`), so that it never actually finishes. Nice for when you don't know how much time it's going to take. It locks on `.99` so it never ends. When you want to finish it call `end()` and it sets itself to `1` |
| **`end()`** | Sets value to `1` and clears interval |
