import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
      <Image source = {require('../assets/borboleta.png')} style = {styles.borboleta} />
      </View>
      <View style={styles.container2}>
      <TouchableOpacity onPress={() => navigation.navigate('BotaoPanico')}>
        <Image source = {require('../assets/botao.png')} style = {styles.botao} />
      </TouchableOpacity>
      <Image source = {require('../assets/menu.png')} style = {styles.menu} />
      <View style={styles.menu2} />
      <TouchableOpacity onPress={() => navigation.navigate('local')}>
        <Image source = {require('../assets/local.png')} style = {styles.local} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('BotaoPanic')}>
        <Image source = {require('../assets/manual.png')} style = {styles.manual} />
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
  },
  cabecalho: {
    backgroundColor: '#49070A',
    width: '100%',
    height: 70,
    marginTop: 30,
  },
  borboleta: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 5,
  },  
  container2: {
    backgroundColor: '#FFEDE3',
    width: '100%',
    height: 450,
    borderWidth: 2,
    borderColor: '#640F1480',
    marginTop: 400,
    borderRadius: 50,
  },
  menu: {
    width: 320,
    height: 120,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 250,
  },
  menu2: {
    backgroundColor: '#49070A',
    width: 320,
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  botao: {
    width: 100,
    height: 93,
    marginLeft: 157,
    position: 'absolute',
    marginTop: 250,
  },
  local: {
    width: 50,
    height: 53,
    marginLeft: 100,
    position: 'absolute',
    marginTop: 50,
    backgroundColor: '#49070A',
  },
  manual: {
    width: 100,
    height: 93,
    marginLeft: 157,
    position: 'absolute',
    marginTop: 250,
  },
});

export default HomeScreen;