import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Button, Icon } from "react-native-elements";

const BotaoPanicoScreen = ({ navigation }) =>{
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
       <Button icon={<Icon name="notifications" size={45} color="#49070A" />} title="Ligar para a polícia"   
       buttonStyle={{     
        width: 330,
        height: 85,
        backgroundColor: "#FFEDE3",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto', }}
        titleStyle={{
          fontFamily: 'Inter_700Bold', 
          fontSize: 24, 
          color: '#49070A', 
          marginLeft: 5,
        }} />

      <View style={styles.aviso}>
        <Image source={require('../assets/aviso.png')} style={styles.iconaviso} />
        <Text style={styles.textaviso}> Se o agressor estiver com arma de fogo ou objetos que possam machucar, chame a polícia! </Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.contato}>
          <Image source={require('../assets/contato.png')} style={styles.iconcontato} />
          <Text style={styles.textcontato}> Contato de emergência </Text>
        </View>
       <Text style={styles.texto}> O aplicativo Lipa’s oferece um recurso para contatos de emergência, garantindo a segurança dos usuários em situações críticas. </Text>

      <TouchableOpacity style={styles.funciona} onPress={() => setModalVisible(true)}>
        <Text style={styles.textfunciona}> Como funciona? </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container3}>
          <View style={styles.popUp}>
            <ScrollView>
            <Text style={styles.titulo}>Explicação das Funcionalidades</Text>
            <Text style={styles.subtitulo}>1. Confirmação de Contato:</Text>
            <Text style={styles.text}> - Quando um usuário adiciona um contato de emergência, o aplicativo envia uma mensagem de confirmação para o email ou número de celular desse contato. </Text>
            <Text style={styles.text}> - A mensagem informa que o usuário o selecionou como contato de emergência e solicita a confirmação. </Text>
            <Text style={styles.text}> - Se o contato aceitar, ele será salvo no sistema como um ponto de contato confiável para situações de emergência. </Text>

            <Text style={styles.subtitulo2}>2. Botão de Pânico: </Text>
            <Text style={styles.text}> O aplicativo possui um botão de pânico de fácil acesso. Ele pode ser pode ser ativado de duas maneiras adicionais:  </Text>
            <Text style={styles.text}> <Text style={styles.negrito}> - Dois Cliques no Botão de Desligar: </Text> O usuário pode pressionar rapidamente o botão de desligar do celular duas vezes para ativar o botão de pânico. </Text>
            <Text style={styles.text}> <Text style={styles.negrito}> - Dois Toques no Ícone de Som (Menu Inferior): </Text> Tocar duas vezes no ícone de som no menu inferior também ativa o botão de pânico.  </Text>
            <Text style={styles.text}> Quando o usuário o aciona, o Lipa’s envia imediatamente uma mensagem de alerta para o contato de emergência. </Text>

            <Text style={styles.obs}> Até três contaos de Emergência! </Text>
            </ScrollView>
            <TouchableOpacity style={styles.fechar} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

       <TouchableOpacity style={styles.novoContato} onPress={() => navigation.navigate('Contato')}> 
        <Text style={styles.textnovoContato}> Novo contato de Emergência </Text>
       </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#3C0609',
    width: '100%',
    height: '100%',
  },
  cabecalho: {
    backgroundColor: '#49070A',
    width: '100%',
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  borboleta: {
    width: 60,
    height: 60,
  },
  aviso: {
    backgroundColor: '#49070A',
    width: '100%',
    height: 100,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    padding: 15,
  },
  iconaviso: {
    width: 45,
    height: 45,
    marginLeft: 4,
    marginTop: 10,
  },
  textaviso: {
    width: 330,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFEDE3',
    marginLeft: 12,
    marginTop: 5,
  },
  container2: {
    backgroundColor: '#FFEDE3',
    width: 350,
    height: 300,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
  contato: {
    flexDirection: 'row',
  },
  iconcontato: {
    width: 35,
    height: 35,
    marginLeft: 12,
    marginTop: 15,
  },
  textcontato: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#49070A',
    marginTop: 17,
    marginRight: 28,
  },
  texto: {
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
    color: '#49070A',
    marginLeft: 17,
    marginTop: 8,
  },
  novoContato: {
    width: 300,
    height: 35,
    backgroundColor: "#49070A",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto', 
  },
  textnovoContato: {
    fontFamily: 'Inter_700Bold', 
    fontSize: 15, 
    color: '#FFEDE3', 
  },
  funciona: {
    width: 300,
    height: 35,
    backgroundColor: '#3C0609',
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto', 
  },
  textfunciona: {
    fontFamily: 'Inter_700Bold', 
    fontSize: 15, 
    color: '#FFEDE3', 
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  popUp: {
    margin: 20,
    backgroundColor: '#FFEDE3',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
  },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: "#49070A",
  },
  subtitulo:{
    fontFamily: 'Inter_700Bold',
    color: "#49070A",
    fontSize: 20,
  },
  subtitulo2:{
    fontFamily: 'Inter_700Bold',
    color: "#49070A",
    fontSize: 20,
    marginTop: 30,
  },
  text:{
    fontFamily: 'Inter_500Medium',
    color: "#49070A",
    fontSize: 18,
    marginTop: 10,
  },
  negrito: {
    fontFamily: 'Inter_600SemiBold',
  },
  obs: {
    fontFamily: 'Inter_700Bold',
    color: "#791227",
    fontSize: 22,
    marginTop: 30,
    textAlign: 'center',
    textDecorationLine: "underline",
    marginBottom: 30,
  },
  fechar: {
    backgroundColor: "#49070A",
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
    width: 200,
  },
  textFechar: {
    color: '#FFEDE3',
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
});

export default BotaoPanicoScreen;

