// src/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles/globalStyles';

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername || 'Usuario');
    };
    loadUserData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Image source={require('../assets/perfil.jpg')} style={globalStyles.image} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Bienvenido, {username}
      </Text>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => {}}>
            <Icon name="account-circle" size={24} color="#000" />
            <Text>Mis Datos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => {}}>
            <Icon name="settings" size={24} color="#000" />
            <Text>Configuración</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => {}}>
            <Icon name="account-balance-wallet" size={24} color="#000" />
            <Text>Mi Cartera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => {}}>
            <Icon name="logout" size={24} color="#000" />
            <Text>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
});

export default Home;


