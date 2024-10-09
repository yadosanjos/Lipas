import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

const SobreScreen = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({
    sobreLipas: false,
    quemEsta: false,
    sobreProjeto: false,
    geolocalizacao: false,
    funcoesSOS: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.iconPlaceholder}>
            
          </View>
        </View>

        <Text style={styles.description}>Saiba mais sobre o Lipa's e suas funcionalidades</Text>
        <View style={styles.section}>
          <TouchableOpacity onPress={() => toggleSection('sobreLipas')}>
            <Text style={styles.sectionTitle}>Sobre o Lipa’s</Text>
          </TouchableOpacity>
          {expandedSections.sobreLipas && <Text style={styles.sectionContent}>O Lipa’s tem como objetivo assegurar a segurança feminina, que busca reduzir os índices de assédios e abusos, tornando o mundo um lugar mais seguro para todos</Text>}
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={() => toggleSection('quemEsta')}>
            <Text style={styles.sectionTitle}>Quem está por trás do Lipa’s</Text>
          </TouchableOpacity>
          {expandedSections.quemEsta && <Text style={styles.sectionContent}>O Lipa’s é um Trabalho de Conclusão de Curso (TCC), feito por 5 alunas do curso Informática para Internet da escola ETEC Antônio Furlan. Para o nosso TCC, queríamos trazer uma solução para um problema atual, onde teríamos propriedade de fala, que ja presenciamos, pra trazer uma solução realmente eficiente.</Text>}
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={() => toggleSection('sobreProjeto')}>
            <Text style={styles.sectionTitle}>Sobre o Projeto</Text>
          </TouchableOpacity>
          {expandedSections.sobreProjeto && <Text style={styles.sectionContent}>O Lipa’s foi desenvolvido por meio de escuta de pessoas de diferentes idades, raças e classes sociais que compartilharam suas experiências e experiências de pessoas próximas através de um formulário durante o processo de elaboração do app.</Text>}
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={() => toggleSection('geolocalizacao')}>
            <Text style={styles.sectionTitle}>Geolocalização</Text>
          </TouchableOpacity>
          {expandedSections.geolocalizacao && <Text style={styles.sectionContent}>O Lipa’s permite a localização em tempo real, onde você pode compartilhar sua localização com seu contato de emergência (Sendo usuário Lipa’s), assim trazendo mais segurança e conforto.</Text>}
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={() => toggleSection('funcoesSOS')}>
            <Text style={styles.sectionTitle}>Funções SOS</Text>
          </TouchableOpacity>
          {expandedSections.funcoesSOS && <Text style={styles.sectionContent}>Botão pânico para acionar até três pessoas de sua confiança para que receba uma mensagem quando você estiver em perigo, além de um botão para ligar para a polícia.</Text>}
        </View>

        <TouchableOpacity style={styles.termbutton} onPress={() => navigation.navigate('Termos')}>
          <Text style={styles.buttonText}>Termos de uso</Text>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.privacibutton} onPress={() => navigation.navigate('Politica')}>
          <Text style={styles.buttonText}>Política de Privacidade</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        {/* Footer icons */}
        <View style={styles.footerIconPlaceholder}>
          {/* Icon 1 */}
        </View>
        <View style={styles.footerIconPlaceholder}>
          {/* Icon 2 */}
        </View>
        <View style={styles.footerIconPlaceholder}>
          {/* Icon 3 */}
        </View>
      </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E5DC',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    margin: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#631C1C',
    paddingVertical: 12,
    paddingTop: 2,
    borderColor: '#DDC2BB',
    borderBottomWidth: 1,
    paddingVertical: 35,
    paddingTop: 1,
  },
  section: {
    marginHorizontal: 11,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#DDC2BB',
    paddingVertical: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#832A25',
    paddingVertical: 1,
  },
    sectionContent: {
    fontSize: 16,
    color: '#631C1C',
    paddingVertical: 1,
    marginVertical: 1,
  },
  termbutton: {
    borderColor: '#631C1C',
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 70,
    marginHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
      fontWeight: 'bold',
      color: '#631C1C',
      fontSize: 20,
      marginEnd: 10,
  },
  privacibutton:{
    borderColor: '#631C1C',
    borderWidth: 2,
    padding: 10,
    marginHorizontal:40,
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 3,
  },
});

export default SobreScreen;
