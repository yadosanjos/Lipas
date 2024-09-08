import React from 'react';
import { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Input }  from 'react-native-elements';

export default function LoginScreen({ navigation }){

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const entrar = () => {
    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
    <Image source = {require('../assets/borboleta.png')} style = {styles.borboleta} />
    <View style={styles.container2}>
        <Image source = {require('../assets/titulo_login.png')} style = {styles.titulo} />
    <View style = {styles.email}>
      <Input style={styles.input}  placeholder="E-mail"  placeholderTextColor="#49070A98"  leftIcon={{ type: 'font-awesome', name: 'user', color:'#49070A98'}} onChangeText={value => setEmail(value)}  keyboardType='email-address'  />
    </View>
    <View style = {styles.senha}>
      <Input style={styles.input} placeholder="Senha"  placeholderTextColor="#49070A98"   leftIcon={{ type: 'font-awesome', name: 'lock', color:'#49070A98'}}  onChangeText={value => setPassword(value)}  secureTextEntry={true} />
    </View>
      <Text onPress={() => navigation.navigate('Cadastro')} style={styles.cadastre}> Não tem uma conta? Cadastra-se </Text>
      <TouchableOpacity onPress={entrar}  style={styles.bottonentrar} >
       <Text style={styles.entrar}> Entrar </Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate('EsqueceuSenha')} style={styles.esqueceu}> Esqueceu a senha? </Text>
      <Image source = {require('../assets/ou.png')} style={styles.ou} />
      <TouchableOpacity onPress={() => navigation.navigate()}>
      <Image source = {require('../assets/google.png')} style={styles.google} />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49070A',
    width: '100%',
    height: '100%',
  },
  borboleta: {
    width: 160,
    height: 160,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 60,
  },
  container2: {
    position: 'absolute',
    top: 250,
    width: '100%',
    height: 900,
    backgroundColor: '#FFEDE3',
    borderRadius: 30,
    alignItems: 'center',
  },
  titulo: {
   marginTop: 30,
   width: 142,
   height: 35,
  },
  email: {
    backgroundColor: '#FFFFFF',
    width: 350,
    height: 80,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#49070A',
    borderRadius: 20,
    padding: 10,
  },
  input:{
    fontSize: 20,    
    fontFamily: 'Inter_500Medium',
  },
  senha: {
    backgroundColor: '#FFFFFF',
    width: 350,
    height: 80,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#49070A',
    borderRadius: 20,
    padding: 10,
  },
  cadastre: {
    fontSize: 15,    
    fontFamily: 'Inter_700Bold',
    color:'#112947',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  bottonentrar:{
    marginTop: 30,
    width: 250,
    height: 70,
    marginTop: 35,
    color:'#FFEDE3',
    backgroundColor: '#49070A',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entrar:{
    color:'#FFEDE3',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Inter_600SemiBold',
  },
  esqueceu: {
    fontSize: 15,    
    fontFamily: 'Inter_700Bold',
    color:'#112947',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  ou:{
    width: '100%',
    height: 20,
    marginTop: 40,
  },
  google:{
    width: 70,
    height: 70,
    marginTop: 20,
  },
});

