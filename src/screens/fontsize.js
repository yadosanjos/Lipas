import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Slider from '@react-native-community/slider';
const FontSizeScreen = ({navigation}) => {
  const [fontSize, setFontSize] = useState(18); // Tamanho padrão da fonte

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      </View>

      {/* Sample Text Section */}
      <View style={styles.sampleContainer}>
        <Text style={styles.sampleTitle}>Texto de amostra</Text>
        <View style={styles.sampleBox}>
          <Text style={[styles.sampleText, { fontSize }]}>
            Uma pesquisa realizada pelo site Violência Contra as Mulheres em Dados. Em março de 2023, o equivalente a 30 milhões de mulheres foram assediadas sexualmente no ano de 2022. Com base nesses dados, decidimos trazer uma proposta de aplicação Web para amenizar/solucionar a escassez de seguranças públicas voltadas para o público feminino.
            Observando o nosso cotidiano como mulheres, vivemos em uma realidade brasileira, colocamos que há diversas complicações na segurança diária das mulheres e esta aplicação visa trazer formas de alertar que estão inseridas, assim implementando na solução o fator de liberdade, diante deste cenário o nosso aplicativo visa não deixar trazer à autonomia para que grupos femininos façam-se aplicações que trazem a sensação de segurança imediata.
          </Text>
        </View>
      </View>

      {/* Font Size Preview */}
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Pré-visualização</Text>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>A</Text>
          <Slider
            style={{ flex: 1 }}
            minimumValue={14}
            maximumValue={26}
            step={1}
            value={fontSize}
            onValueChange={value => setFontSize(value)}
            minimumTrackTintColor="#8B0000"
            maximumTrackTintColor="#ddd"
          />
          <Text style={styles.sliderText}>A</Text>
        </View>

        <Text style={styles.previewSubtitle}>
          Tornar o texto na tela menor ou maior
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49070A',
    padding: 15,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  sampleContainer: {
    flex: 1,
    marginBottom: 20,
  },
  sampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#8B0000',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sampleBox: {
    backgroundColor: '#49070A',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  sampleText: {
    color: '#fff',
    textAlign: 'justify',
  },
  previewContainer: {
    flex: 1, 
    backgroundColor: '#FFEDE3',
    width: '109%',
    height: 4000,
    marginVertical: 650,
    borderWidth:1,
    borderColor: '#640F1480',
    borderRadius: 34,
    position: 'absolute',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  previewSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#8B0000',
  },
});
export default FontSizeScreen;