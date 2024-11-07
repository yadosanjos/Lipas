import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FontSizeScreen = ({navigation}) => {
  const [fontSize, setFontSize] = useState(18);

  // Função para aumentar o tamanho da fonte
  const increaseFontSize = () => {
    if (fontSize < 30) {
      setFontSize(fontSize + 2);
    }
  };

  // Função para diminuir o tamanho da fonte
  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Botão de menu à esquerda */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={30} color="#FFEDE3" />
        </TouchableOpacity>

        {/* Título central */}
        <Text style={styles.title}>Tamanho da Fonte</Text>

        {/* Ícone de usuário à direita */}
        <Image source={require('../assets/borboleta.png')} style={styles.borboleta} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.sampleText, { fontSize }]}>
          Uma pesquisa realizada pelo site Violência Contra as Mulheres em Dados. Em março de 2023, o equivalente a 30 milhões de mulheres foram assediadas sexualmente no ano de 2022. Com base nesses dados, decidiu-se trazer uma proposta de uma aplicação Web para amenizar/solucionar a escassez de seguranças públicas voltadas para o público feminino. {"\n\n"}
          Observando o nosso cotidiano como mulheres, e vendo que na atual realidade brasileira, conclusões nos dizem que diversas complicações na segurança ditam as dificuldades que estas inseridas, assim identificamos a necessidade de interferência, que ateste a nossa liberdade, diante deste cenário o nosso aplicativo tem como objetivo trazer a automação para que nos gere feedbacks e fazendo aplicações que trazem a sensação de segurança imediata.
        </Text>
      </View>

      <Text style={styles.previewText}>Pré-visualização</Text>

      {/* Contêiner para os botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseFontSize}>
          <Text style={styles.buttonText}>-A</Text>
        </TouchableOpacity>
        <Text style={styles.Text}>Pré-Visualização</Text>
        <TouchableOpacity style={styles.button} onPress={increaseFontSize}>
          <Text style={styles.buttonText}>+A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49070A',
  },
  sampleText: {
    color: '#FFEDE3',
    marginStart: 20,
    marginVertical: 20,
  },
  previewText: {
    fontSize: 18,
    color: '#49070A',
    textAlign: 'center',
    marginVertical: 30,
    fontFamily: 'Inter_500Medium',
  },
  // Estilo do contêiner dos botões
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: 150,
    backgroundColor: '#FAE9E4',
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center', // Centraliza o contêiner na tela
    marginTop: 755,
  },
  button: {
    width: 60,
    height: 40,
    backgroundColor: '#F3EDE1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    color:'#49070A',
  },
  navbar: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#640F14',
    paddingHorizontal: 9,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 35,
    color: '#FFEDE3',
    fontFamily: 'DMSerifDisplay_400Regular',
  },
  borboleta: {
    width: 55,
    height: 50,
    marginStart: 19,
    marginVertical: 13,
  },
  Text:{
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    color: '#49070A',
  },
});

export default FontSizeScreen;
