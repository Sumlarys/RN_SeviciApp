import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from './RegisterScreen';
import Register2 from './Register2';
import Home from './Home';
import MapScreen from './Map';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


//Inicializamos las librerías importadas en estas variables.
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Gestión de Bottom Tabs de la página home (mi perfil)
const MainTabs = () => (
  <Tab.Navigator 
    screenOptions={{
        tabBarActiveTintColor: 'red', //Cuando esté la pestaña activa, se volverá rojo.
        tabBarInactiveTintColor: 'white', //Las pestañas inactivas, serán blancas.
        tabBarStyle: {backgroundColor:'#191919', paddingBottom:10},
    }}>
    <Tab.Screen name="Mi Perfil" component={Home} options={{
        tabBarLabel: 'Mi Perfil', //Texto a mostrar en la pestaña
        tabBarIcon: ({color, size}) => ( 
            //Icono de la librería MaterialIcons.
            <MaterialIcons name="home" color={color} size={30}/>
        ),
        tabBarLabelStyle: {
            fontSize: 20,
          }
    }}/>
    <Tab.Screen name="Mapa" component={MapScreen} options={{
        tabBarLabel: 'Mapa',
        tabBarIcon: ({color, size}) => (
            <MaterialIcons name="calendar-today" color={color} size={size} />
        ),
        tabBarLabelStyle: {
            fontSize: 20,
          }
    }}/>
    <Tab.Screen name="Mis viajes" component={Home} options={{
          tabBarLabel: 'Mis viajes',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" color={color} size={30} />
          ),
          tabBarLabelStyle: {
            fontSize: 20,
          }
        }}/>
  </Tab.Navigator>
);

//Gestión de las vistas en Stack. La vista Home accede a Bottom tabs.
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Register2" component={Register2} />
      <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
