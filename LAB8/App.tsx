import { StyleSheet } from 'react-native'
import React from 'react'
import Home from './src/screens/home'
import Profile from './src/screens/profile'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/AntDesign'

const Tab = createBottomTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 12
        },
        tabBarStyle: {
          height: 60
        }
      }}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          )
        }}
      />

    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
