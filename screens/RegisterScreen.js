import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{ email: '', username: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Correo inválido').required('Requerido'),
        username: Yup.string().required('Requerido'),
      })}
      onSubmit={async (values) => {
        await AsyncStorage.setItem('userEmail', values.email);
        await AsyncStorage.setItem('username', values.username);
        navigation.navigate('Register2');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={globalStyles.container}>
          <Image source={require('../assets/registro.png')} style={[globalStyles.image, styles.largeImage]} />
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
            placeholder="Nombre de usuario"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {touched.username && errors.username && <Text style={globalStyles.errorText}>{errors.username}</Text>}

          <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
            <Text style={globalStyles.buttonText}>Siguiente</Text>
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

export default RegisterScreen;

