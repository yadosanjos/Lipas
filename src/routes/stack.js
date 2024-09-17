import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import MariaFelipaScreen from "../screens/mariaFelipa";
import CadastroScreen from "../screens/cadastro";
import EsqueceuSenhaScreen from "../screens/esqueceuSenha";
import BotaoPanicoScreen from "../screens/botaoPanico";
import ManualDeDefesaScreen from "../screens/manualDesfesa"
import DrawerNavigator from "./drawer";

const Stack = createNativeStackNavigator();

function StackNavigator({ onLoginSuccess }) {
  return (
    <Stack.Navigator initialRouteName="MariaFelipa">
      <Stack.Screen
        name="MariaFelipa"
        component={MariaFelipaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen
        name="EsqueceuSenha"
        component={EsqueceuSenhaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BotaoPanico"
        component={BotaoPanicoScreen}
        options={{ headerShown: false }}
      />
      {/* HomeScreen apenas redireciona para o drawer após login */}
      <Stack.Screen
        name="Home"
        component={DrawerNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name='ManualDeDefesa' 
        component={ManualDeDefesaScreen} 
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default StackNavigator;
