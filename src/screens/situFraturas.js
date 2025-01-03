import React from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView, TouchableWithoutFeedback, Text } from 'react-native';
import { useTheme} from './ThemeContext'; 

const FraturasScreen = ({ navigation }) => {
  const { theme, switchTheme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
    <ScrollView>
    <Text style={styles.Title}>Fratura</Text>

    <View style = {styles.texto}>
       <Text style = {styles.paragrafo}> 
       Quando a pessoa sofre uma fratura, ela deve ser encaminhada o mais rápido possível ao hospital. Em todo 
       caso de fratura, deve-se imobilizar a região até que a pessoa receba o tratamento adequado.
       </Text>
       <Text style = {styles.lista}> 
       - Se o caso for leve, em pernas ou braços, imobilize a área com uma tala, e mantenha a vítima o mais próximo 
       possível da posição normal até que ela chegue ao médico.
       </Text>
       <Text style = {styles.lista}> 
       - Quando a fratura for mais grave, cabeça, coluna ou pescoço, imobilize a vítima e deixe ela até que a ambulância 
       chegue.
       </Text>
      

       <View style={styles.combo}>
          <Text style={styles.espaco}> </Text>
       </View>

    </View>

    </ScrollView>
 
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Socorros')}>
        <Image source = {require('../assets/setacircurlar.png')} style = {styles.botao} />
    </TouchableWithoutFeedback>

    </View>
  );
};


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFEDE3',
    width: '100%',
    height: '100%',
  },
  botao: {
    width: 51,
    height: 50,
    marginLeft: 20,
    marginTop: 50,
    position: 'absolute',
  },
  Title: {
    fontSize: 60,
    fontFamily: 'DMSerifDisplay_400Regular',
    color: '#631C1C',
    textAlign: 'center',
    paddingTop: 12,
    marginTop: 90,
  },
  texto: {
    width: 400,
  },
  paragrafo: {
    fontSize: 24,
    fontFamily: "Inter_500Medium",
    color: '#49070A',
    marginLeft: 20,
    marginTop: 20,
  },
  lista: {
    fontSize: 24,
    fontFamily: "Inter_500Medium",
    color: '#49070A',
    marginLeft: 20,
    marginTop: 5,
  },
  combo: {
    flexDirection: 'row', // Alinha os itens na horizontal
    justifyContent: 'space-between', // Espaça os itens uniformemente
    padding: 15,
  },
  espaco: {
    width: '100%',
    height: 50,
  },
});

export default FraturasScreen;