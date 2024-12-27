import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register2 = () => {
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{ pin: '' }}
      validationSchema={Yup.object({
        pin: Yup.string().matches(/^\d{6}$/, 'Debe tener 6 dígitos').required('Requerido'),
      })}
      onSubmit={async (values) => {
        await AsyncStorage.setItem('pin', values.pin);
        alert('Registro exitoso');
        navigation.navigate('Login');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={globalStyles.container}>
          <Image source={require('../assets/registro.png')} style={[globalStyles.image, styles.largeImage]} />
          
          {/**Gestionamos la contraseña, que en su entrada de datos, no se verán los caracteres. */}
          <TextInput
            style={globalStyles.input}
            placeholder="PIN"
            secureTextEntry
            onChangeText={handleChange('pin')}
            onBlur={handleBlur('pin')}
            value={values.pin}
          />
          {/**Mensaje de error en caso de que se cumpla las condiciones */}
          {touched.pin && errors.pin && <Text style={globalStyles.errorText}>{errors.pin}</Text>}

            {/**Componente pulsable que en caso de registro existoso, devuelve al LoginScreen*/}
          <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
            <Text style={globalStyles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  largeImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Register2;

