import React, { useState, useEffect} from 'react';
import {
  Inter_700Bold,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import {
  DMSerifDisplay_400Regular,
  DMSerifDisplay_400Regular_Italic,
} from '@expo-google-fonts/dm-serif-display';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();
import { DrawerActions } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';


const HomeScreen = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Inter_700Bold,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_400Regular,
          DMSerifDisplay_400Regular,
          DMSerifDisplay_400Regular_Italic,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  return (
    <View style={styles.container}>
        <Image source={require('../assets/borboleta.png')} style={styles.borboleta} />
      <View style={styles.container2}>

      <Text style={styles.texto}> Você ainda não tem contatos de emergência Lipa’s! Convide pessoas de confiança usuários Lipa’s  </Text>
       <TouchableOpacity style={styles.convida} onPress={() => navigation.navigate('BotaoPanico')}> 
        <Text style={styles.textconvida}> Convidar </Text>
       </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFEDE3',
    width: '100%',
    height: '100%',
  },
  home: {
    color: '#FFEDE3',
    fontSize: 40,
    fontFamily: 'DMSerifDisplay_400Regular',
  },
  borboleta: {
    width: 50,
    height: 50,
    marginLeft: 'auto',
    marginRight: 5,
  },  
  map: {
    width: '100%',
    height: '100%',
  },
  container2: {
    backgroundColor: '#FFEDE3',
    width: '100%',
    height: 450,
    borderWidth: 2,
    borderColor: '#640F1480',
    marginTop: 420,
    borderRadius: 50,
    position: 'absolute',
  },
  texto: {
    width: 320,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#49070A',
    marginLeft: 'auto',
    marginHorizontal: 'auto',
    marginTop: 100,
    textAlign: 'center',
  },
  convida: {
    width: 150,
    height: 30,
    borderWidth: 1.5,
    borderColor:"#49070A",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto', 
  },
  textconvida: {
    fontFamily: 'Inter_700Bold', 
    fontSize: 16, 
    color: '#49070A', 
  },
});

export default HomeScreen;



