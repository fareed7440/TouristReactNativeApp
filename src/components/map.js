

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import flagBlueImg from '../images/add.png'
import flagPinkImg from '../images/add.png'
import { Container, Header, Content, Button, Text, Card, CardItem, Body, Icon } from 'native-base';

import {
  AppRegistry,
  StyleSheet, Dimensions,

  View, TouchableOpacity, Image
} from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.8615;
const LONGITUDE = 67.0099;
const LATITUDE_DELTA = 0.06;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class Maps extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        marker1: true,
        SPACE: 0.01,
        error: null,
        mapSnapshot: null,
        takeSnapshot: {},
        region: {
          latitude: 24.8615,
          longitude: 67.0099,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
          Address: null
        },



      }

    this.onRegionChange = this.onRegionChange.bind(this)
    this.TakeSnapshot = this.TakeSnapshot.bind(this);
    this.openSearchModal = this.openSearchModal.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }
  onLogout() {
    this.props.logoutReq()
  }
  openSearchModal() {

    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log('place', place)
        this.setState({
          region: {
            latitude: place.latitude,
            longitude: place.longitude,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
            Address: place.address
          }
        })

      })
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position,
            longitude: position,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
        });
      },
      (error) => (error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  TakeSnapshot() {
    this.map.takeSnapshot(300, 300, {
      latitude: this.state.region.latitude - this.state.SPACE,
      longitude: this.state.region.longitude - this.state.SPACE,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01 * ASPECT_RATIO,
    }, (err, data) => {
      if (err) console.log(err);
      console.log('data', data)
      this.setState({ mapSnapshot: data });
    });
  }


  onRegionChange(region) {
    this.setState({ region });
  }


  render() {

    const { latitude } = this.state.region
    const { longitude } = this.state.region

    return (
      <View style={styles.container}>

        <MapView style={styles.map}
          ref={ref => { this.map = ref; }}
          provider="google"
          showsUserLocation={true}
          showsMyLocationButton={true}
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

        <TouchableOpacity
          style={styles.button}

        >
          <Button onPress={() => this.openSearchModal()}
            block light>
            <Text>Search Place</Text>
          </Button>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 450 }}>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>

          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

        </View>
        {this.state.mapSnapshot &&
          <TouchableOpacity
            style={[styles.container, styles.overlay]}
            onPress={() => this.setState({ mapSnapshot: null })}
          >
            <Image
              source={{ uri: this.state.mapSnapshot.uri }}
              style={{ width: 300, height: 300 }}
            />
          </TouchableOpacity>
        }

        <Button style={{ marginLeft: 140, backgroundColor: 'transparent' }}
          onPress={this.onLogout}
        ><Text>LogOut</Text></Button>

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
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
  },
  crd: {
    marginTop: -300,
    marginLeft: -30
  }
});

