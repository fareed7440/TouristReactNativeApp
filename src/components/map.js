

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import flagBlueImg from '../images/add.png'
import flagPinkImg from '../images/add.png'

//var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import {
  AppRegistry,
  StyleSheet, Dimensions,
  Text, Button,
  View, TouchableOpacity, Image
} from 'react-native';
 const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
const LATITUDE = 37.8615;
const LONGITUDE = 67.0099;
const LATITUDE_DELTA = 0.06;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
// const homePlace = {description: 'Home', geometry: { location: { lat:  24.8615, lng:67.0099 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 24.8615, lng: 67.0099 } }};

export default class Maps extends Component {

  constructor(props) {
    super(props);
   
    this.state = 
    {
      marker1:true,
       SPACE : 0.01,
       error: null,
      mapSnapshot: null,
      takeSnapshot : {},
      region:{
        latitude:24.8615,
        longitude: 67.0099,
        latitudeDelta: 0.06,
        longitudeDelta:0.06,
      },
      // marker: {
      //   latlng:{
      //    latitude: null,
      //    longitude: null,
      //     latitudeDelta: LATITUDE_DELTA,
      //     longitudeDelta: LONGITUDE_DELTA
      //   }
      
    
    
    }

    this.onRegionChange = this.onRegionChange.bind(this)
    this.TakeSnapshot = this.TakeSnapshot.bind(this);
    this.openSearchModal = this.openSearchModal.bind(this)
  }

  // getInitialState() {
  //   return {
  //     region: {

  //     },
  //   };
  // }
   openSearchModal() {
  
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
      console.log('place',place)
      
      this.setState({
      region : {
        latitude : place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06,
      }
       })
    
      
        // place represents user's selection from the 
        // suggestions and it is a simplified Google Place object. 
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object 
  }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude:position,
                        longitude: position,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    },
                });
            },
            (error) =>(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
 }
  TakeSnapshot() {
    this.map.takeSnapshot(300, 300, {
      latitude: this.state.region.latitude -this.state.SPACE,
      longitude: this.state.region.longitude - this.state.SPACE,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01 * ASPECT_RATIO,
    }, (err, data) => {
      if (err) console.log(err);
      console.log('data',data)
      this.setState({ mapSnapshot: data });
    });
  }


  onRegionChange(region) {
    this.setState({ region  });
  }


  render() {
   
   const {latitude} = this.state.region
     const {longitude} = this.state.region
    //console.log(region);

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
   {/* <MapView.Marker
            onPress={() => this.setState({ marker1: !this.state.marker1 })}
            coordinate={{
              latitude: LATITUDE + SPACE,
              longitude: LONGITUDE + SPACE,
            }}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
          //  image={this.state.marker1 ? flagBlueImg : flagPinkImg}
          >
          <Text style={styles.marker}>X</Text>
          </MapView.Marker> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
        >
          <Text>Pick a Place</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1 ,marginTop : 550 }}>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
           <TouchableOpacity
            onPress={() => this.TakeSnapshot()}
          >
            <Text>Take snapshot</Text>
          </TouchableOpacity>
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
      </View>
    );
  };
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
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
});



  
  //       <GooglePlacesAutocomplete
  //       placeholder='Search'
  //       minLength={2} // minimum length of text to search
  //       autoFocus={false}
  //       returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
  //       listViewDisplayed='true'    // true/false/undefined
  //       fetchDetails={true}
  //       renderDescription={(row) => row.description} // custom description render
  //       onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
  //         console.log("gggg",data);
  //         console.log(details);
  //       }}
  //       getDefaultValue={() => {
  //         return ''; // text input default value
  //       }}
  //       query={{
  //         // available options: https://developers.google.com/places/web-service/autocomplete
  //         key: 'AIzaSyBOzhToEdr-1I_HXqtuwL2Znx78PkWM5Jo',
  //         language: 'en', // language of the results
  //         types: '(cities)', // default: 'geocode'
  //       }}
  //       styles={{
  //         description: {
  //           fontWeight: 'bold',
  //         },
  //         predefinedPlacesDescription: {
  //           color: '#1faadb',
  //         },
  //       }}

  //       currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
  //       currentLocationLabel="Current location"
  //       nearbyPlacesAPI='AIzaSyDKW1BS7osIFkmz7ZLiuqvw3nbO8JyahHY' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
  //       GoogleReverseGeocodingQuery={{
          
  //  key:'AIzaSyDh3BO7iZWWumRjOn8k3KKTRjM7gYc9LkQ'
  //       }  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
  //       }
  //       GooglePlacesSearchQuery={{
  //         key :'AIzaSyCBltzCiHmIcquqyCvcj2QA27fn44KpPfA',
  //         // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
  //         rankby: 'distance',
  //         types: 'food',
  //       }}


  //       filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

  //       predefinedPlaces={[homePlace, workPlace]}

  //       debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
       
  //       renderRightButton={() => <Text>Custom text after the inputg</Text>}
  //     />
