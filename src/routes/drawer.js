import React from "react";
import { createDrawerNavigator, StyleSheet, View, Text, Image } from "@react-navigation/drawer";
import TabNavigator from "../routes/tab";
import PerfilScreen from "../screens/perfil";
import FeedbackScreen from "../screens/feedback";
import SobreScreen from "../screens/sobre";
import ConfiguracaoScreen from "../screens/configuracao";
import 'react-native-gesture-handler';

import CustomDrawer from "../components/customDrawer/input"

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home"  drawerContent={(props) => <CustomDrawer {...props} />}      
     screenOptions={{
      headerTintColor: '#FFEDE3',
      headerStyle: { 
      backgroundColor: '#49070A',
      }, 
    }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
      /> 

      <Drawer.Screen
        name="Perfil"
        component={PerfilScreen}
      />

     <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
      />

     <Drawer.Screen
        name="Sobre"
        component={SobreScreen}
      />

     <Drawer.Screen
        name="Configuração"
        component={ConfiguracaoScreen}
      />

    </Drawer.Navigator>
  );
}

export default DrawerNavigator;




