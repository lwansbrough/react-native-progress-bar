# react-native-progress-bar

An animated progress bar for React Native. This is an updated fork of https://github.com/lwansbrough/react-native-progress-bar/ working on React 16

![](https://i.imgur.com/EGufppz.gif)

## Getting started

`npm install mattslight/react-native-progress-bar`

or

`npm install git+https://github.com/mattslight/react-native-progress-bar`


## Example usage

```javascript
import React from 'react'
import { Dimensions } from 'react-native'
import ProgressBar from 'react-native-progress-bar'

export class MyComponentWithProgress extends React.Component {
	constructor(props) {
		super()
		this.state = {
			progress: 0
		}
	}

	render() {
  
		// ...
		// example function controlling state

		setTimeout(() => {
			this.setState({ progress: this.state.progress + 0.4 * Math.random() }).bind(this)
		}, 1000)

		// ...

		return (
    
			// ...

			<ProgressBar
				fillStyle={{}}
				backgroundStyle={{ backgroundColor: '#cccccc', borderRadius: 2 }}
				style={{ width: Dimensions.get('window').width - 20 }}
				progress={this.state.progress}
			/>

			// ...
      
		)
	}
}

AppRegistry.registerComponent('MyComponentWithProgress', () => MyComponentWithProgress);
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

## Component methods
| Method | Description |
|---|---|
| **`update(progress)`** | The recommended way to update the progress of the progress bar is to use the `progress` property. If you prefer, you can use this `update` method to update the progress directly. To access this method, set the `ref` property on the `<ProgressBar>` and call `this.refs.progressBarName.update(0.3)` |
