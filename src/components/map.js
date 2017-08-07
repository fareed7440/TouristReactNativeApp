

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text, Button,
  View, TouchableOpacity, Image
} from 'react-native';

export default class Maps extends Component {

  constructor(props) {
    super(props);
    this.state = 
    {
  
       latitude: null,
      longitude: null,
      error: null,
      mapSnapshot: '',
      

      region: {
        latitude: 24.8615,
        longitude: 67.0099,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06,
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this)
    this.takeSnapshot = this.takeSnapshot.bind(this);
    //this.getInitialState = this.getInitialState.bind(this)
  }

  // getInitialState() {
  //   return {
  //     region: {

  //     },
  //   };
  // }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0462,
                        longitudeDelta: 0.0261,
                    },
                });
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
 }

  // takeSnapshot(args) {
  //   // For the time being we support the legacy API on iOS.
  //   // This will be removed in a future release and only the
  //   // new Promise style API shall be supported.
  //   if (Platform.OS === 'ios' && (arguments.length === 4)) {
  //     console.warn('Old takeSnapshot API has been deprecated; will be removed in the near future'); //eslint-disable-line
  //     const width = arguments[0]; // eslint-disable-line
  //     const height = arguments[1]; // eslint-disable-line
  //     const region = arguments[2]; // eslint-disable-line
  //     const callback = arguments[3]; // eslint-disable-line
  //     this._runCommand('takeSnapshot', [
  //       width || 0,
  //       height || 0,
  //       region || {},
  //       'png',
  //       1,
  //       'legacy',
  //       callback,
  //     ]);
  //     return undefined;
  //   }

  //   // Sanitize inputs
  //   const config = {
  //     width: args.width || 0,
  //     height: args.height || 0,
  //     region: args.region || {},
  //     format: args.format || 'png',
  //     quality: args.quality || 1.0,
  //     result: args.result || 'file',
  //   };
  //   if ((config.format !== 'png') &&
  //     (config.format !== 'jpg')) throw new Error('Invalid format specified');
  //   if ((config.result !== 'file') &&
  //     (config.result !== 'base64')) throw new Error('Invalid result specified');

  //   // Call native function
  //   if (Platform.OS === 'android') {
  //     return NativeModules.AirMapModule.takeSnapshot(this._getHandle(), config);
  //   } else
  //     return Promise.reject('takeSnapshot not supported on this platform');
  // }
  // _getHandle() {
  //   return findNodeHandle(this.map);
  // }
  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID);
  // }
  takeSnapshot() {
    // 'takeSnapshot' takes a config object with the
    // following options
    const snapshot = this.maps.takeSnapshot({
      width: 300,      // optional, when omitted the view-width is used
      height: 300,     // optional, when omitted the view-height is used
      // iOS only, optional region to render
      format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file'   // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then((uri) => {
      this.setState({ mapSnapshot: uri });
    });
  }


  onRegionChange(region) {
    this.setState({ region });
  }


  render() {
    const { region } = this.state;
    console.log(region);

    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          provider="google"
          showsUserLocation={true}
         // showsMyLocationButton={true}
          showsCompass={true}
          followsUserLocation={true}
          loadingEnabled={true}
          toolbarEnabled={true}
          zoomEnabled={true}
          rotateEnabled={true}
          cameraPosition={{ auto: true, zoom: 10 }}
          scrollGestures={true}
          zoomGestures={true}
          tiltGestures={true}
          rotateGestures={true}
          consumesGesturesInView={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          compassButton={true}
          myLocationButton={true}
          indoorPicker={true}
          allowScrollGesturesDuringRotateOrZoom={true}

          region={this.state.region}

          onRegionChange={this.onRegionChange}

        />


        <View style={{ flexGrow: 1 }}>
          <Text>Latitude: {this.state.region.latitude}</Text>
          <Text>Longitude: {this.state.region.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
         <Image source={{ uri: this.state.mapSnapshot.uri }} />
        <TouchableOpacity onPress={this.takeSnapshot}>
          <Text>Take Snapshot</Text>
        </TouchableOpacity> 

      </View>
    );
  };
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: null,
    width: null,
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
});



