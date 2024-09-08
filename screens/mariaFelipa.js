import React from 'react';
import { useState, useCallback, useEffect} from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Inter_700Bold, Inter_500Medium, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function MariaFelipaScreen({ navigation }){
  const [appIsReady, setAppIsReady] = useState (false);

  useEffect (() =>{
    async function prepare() {
      try {
        await Font.loadAsync({ Inter_700Bold, Inter_500Medium, Inter_600SemiBold, Inter_400Regular });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally{
      setAppIsReady(true);
      }
    }
    prepare()
  }, []);

  const onLatoutRootView = useCallback(async () => {
    if (appIsReady) {
     await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View  style = {styles.container} onLayout = {onLatoutRootView}>
    <ImageBackground source = {require('../assets/maria_felipa.png')} style = {styles.backgroundImage} >
    <Image source = {require('../assets/borboleta.png')} style = {styles.borboleta} />
    <View>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Image source = {require('../assets/seta_direita.png')} style={styles.seta} />
      </TouchableOpacity>
    <Text style = {styles.texto}>Este app tem o objetivo de  empoderar mulheres através da segurança e autoconfiança. </Text>
    </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    marginTop: 30,
  },
  borboleta: {
    width: 80,
    height: 80,
    marginLeft: 8,
    marginTop: 10,
  },
  texto: {
    width: 290,
    height: 230,
    fontSize: 32,
    color: '#FFECE3',
    marginTop: 430,
    marginLeft: 20,
    fontFamily: 'Inter_700Bold',
  },
  seta: {
    width: 42,
    height: 70,
    marginTop: 650,
    marginLeft: 350,
    position: 'absolute',
  },
});

