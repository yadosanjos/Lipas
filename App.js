import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MariaFelipaScreen from './screens/mariaFelipa';
import LoginScreen from './screens/login';
import CadastroScreen from './screens/cadastro';
import EsqueceuSenhaScreen from './screens/esqueceuSenha';
import HomeScreen from './screens/home';
import BotaoPanicoScreen from './screens/botaoPanico';
import ManualDefesaScreen from './screens/manualDesfesa';
import PerfilScreen from './screens/perfil';
import HistoricoScreen from './screens/historico';
import FeedbackScreen from './screens/feedback';
import SobreScreen from './screens/sobre';
import ConfiguracaoScreen from './screens/configuracao';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown: false,}}>
          <Stack.Screen name='MariaFelipa' component = {MariaFelipaScreen} />
          <Stack.Screen name='Login' component = {LoginScreen} />
          <Stack.Screen name='Cadastro' component = {CadastroScreen} />
          <Stack.Screen name='EsqueceuSenha' component = {EsqueceuSenhaScreen} />
          <Stack.Screen name='Home' component = {HomeScreen} />
          <Stack.Screen name='BotapPanico' component = {BotaoPanicoScreen} />
          <Stack.Screen name='ManualDeDefesa' component = {ManualDefesaScreen} />
          <Stack.Screen name='Perfil' component = {PerfilScreen} />
          <Stack.Screen name='Historico' component = {HistoricoScreen} />
          <Stack.Screen name='Feedback' component = {FeedbackScreen} />
          <Stack.Screen name='Sobre' component = {SobreScreen} />
          <Stack.Screen name='Configuracao' component = {ConfiguracaoScreen} />
       </Stack.Navigator>
   </NavigationContainer>
  );
}



