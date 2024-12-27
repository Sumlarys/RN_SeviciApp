// src/screens/MapScreen.js
import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import globalStyles from '../styles/globalStyles';

//Variable que recoge todos los datos de coordenada.
const MapScreen = () => {
  const initialRegion = {
    latitude: 37.3918209,
    longitude: -5.9883026,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={globalStyles.container}>
        {/**Inicia la primera vista con las coordenadas descritas en el const */}
      <MapView style={{ flex: 1, marginBottom: 10 }} initialRegion={initialRegion}>
        {/**Coloca un marker en esta posición */}
        <Marker coordinate={{ latitude: 37.3918209, longitude: -5.9883026 }} title="IES Velázquez" />
      </MapView>
      <TouchableOpacity style={globalStyles.button}>
        <Text style={globalStyles.buttonText} onPress={() => alert('Sevici liberado!')}>Liberar una Sevici</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;

