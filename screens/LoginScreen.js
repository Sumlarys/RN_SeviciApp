import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';

const LoginScreen = () => {
  const navigation = useNavigation();

  const validateCredentials = async (email, pin) => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPin = await AsyncStorage.getItem('userPin');

      if (email === storedEmail && pin === storedPin) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Usuario o PIN incorrecto');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al verificar los datos');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', pin: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Correo inválido').required('Requerido'),
        pin: Yup.string().matches(/^\d{6}$/, 'Debe tener 6 dígitos').required('Requerido'),
      })}
      onSubmit={(values) => validateCredentials(values.email, values.pin)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={globalStyles.container}>
          <Image source={require('../assets/logo.png')} style={globalStyles.image} />
          <TextInput
            style={globalStyles.input}
            placeholder="Correo"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={globalStyles.errorText}>{errors.email}</Text>}

          <TextInput
            style={globalStyles.input}
            placeholder="PIN"
            secureTextEntry
            onChangeText={handleChange('pin')}
            onBlur={handleBlur('pin')}
            value={values.pin}
          />
          {touched.pin && errors.pin && <Text style={globalStyles.errorText}>{errors.pin}</Text>}

          <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
            <Text style={globalStyles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={globalStyles.buttonText}>Crear mi cuenta</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;


