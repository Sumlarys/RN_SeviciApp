import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';

const LoginScreen = () => {
  const navigation = useNavigation();
    //Gestión de validación Schema con Formik
  return (
    <Formik
      initialValues={{ email: '', pin: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Correo inválido').required('Requerido'),
        pin: Yup.string().matches(/^\d{6}$/, 'Debe tener 6 dígitos').required('Requerido'),
      })}
      onSubmit={(values) => {
        if (values.email === 'test@test.com' && values.pin === '123456') {
          navigation.navigate('Home');
        } else {
          alert('Usuario no existe');
        }
      }}
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

            {/*Componente pulsable tanto para iniciar sesión como para crear la cuenta.
            Si se valida correctamente los datos inscritos en iniciar sesión, deriva a la pantalla Home*/}
          <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
            <Text style={globalStyles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          {/**Deriva a la pantalla de Registro */}
          <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={globalStyles.buttonText}>Crear mi cuenta</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;

