import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
 
import { db, auth } from '../services/firebase/conf';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';

import { Feather } from '@expo/vector-icons';
 
const HomeScreen = () => {
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userEmail, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);
  const mapRef = useRef(null);
 
  useEffect(() => {
    // Solicita permissões para acessar a localização
    checkPermissions();
  }, []);
 
  // Função para verificar as permissões de localização
  async function checkPermissions() {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== 'granted') {
      Alert.alert('Permissão necessária', 'O aplicativo precisa de acesso à localização para funcionar.');
      return;
    }
 
    // Obtém a localização atual do usuário
    getUserLocation();
  }
 
  // Função para pegar a localização atual do usuário
  async function getUserLocation() {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setUserLocation(location.coords);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      if (auth.currentUser) {
        const userDocRef = doc(db, 'Usuário', auth.currentUser.uid);
        await updateDoc(userDocRef, {
          userLatitude: location.coords.latitude,
          userLongitude: location.coords.longitude,
        });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização');
      console.error(error);
    }
  }
 
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "Usuário", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedUserEmail = docSnap.data().userEmail;
          setEmail(fetchedUserEmail);
        }
      }
    });
 
    return () => unsubscribeAuth();
  }, []);
 
  useEffect(() => {
    if (userEmail) {
      const contactsRef = collection(db, 'Contato de Emergência');
      const q = query(contactsRef, where('user', '==', userEmail));
 
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const contactsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactsData);
      });
 
      return () => unsubscribe();
    }
  }, [userEmail]);

 
  return (
    <View style={styles.container}>
      {region && userLocation ? (
        <MapView
          ref={mapRef} 
          style={styles.map}
          region={region}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Sua Localização"
            pinColor="#49070A"
          />

      {contacts
         .filter(contact => contact.type === 'lipas' && contact.locationLipas)
         .map((contact, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: contact.locationLipas.latitude, // Corrigido: usa 'contact'
          longitude: contact.locationLipas.longitude,
        }}
        title={contact.nomeContato || 'Contato Lipa'}
        description={contact.emailContato}
        pinColor="#3478F6"
      />
      ))}

        </MapView>
      ) : (
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      )}
 
      <ScrollView style={styles.profileContainer}>
    <Text style={styles.titulo}> Contatos Lipa's </Text>
      {contacts
       .filter(contact => contact.type === 'lipas')
       .map(contact => (
    <View key={contact.id} style={styles.contactCard}>
      <View style={styles.contactHeader}>
        <Text style={styles.contactName}>{contact.nomeContato || 'Nome não disponível'}</Text>
        </View>
        <View style={styles.contactHeader}>
        <Text style={styles.contactEmail}>{contact.emailContato}</Text>
        </View>
        <View style={styles.contactHeader}>
        <Text style={styles.contactCelular}>{contact.celularContato}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton}   
            onPress={() => {
              if (contact.locationLipas) {
                 mapRef.current.animateToRegion({
                 latitude: contact.locationLipas.latitude,
                 longitude: contact.locationLipas.longitude,
                 latitudeDelta: 0.01,
                 longitudeDelta: 0.01,
             }, 1000);  // A duração da animação em milissegundos (opcional)
            }
         }}>
          <Text style={styles.deleteText}>Ver localização</Text>
        </TouchableOpacity>
    </View>
  ))}
      </ScrollView>

      <TouchableHighlight style={styles.botaoPanico} onPress={() => navigation.navigate('Emergência')} > 
           <Feather name='volume-1' size={50} color={"#FFEDE3"} />
      </TouchableHighlight>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDE3',
  },
  map: {
    width: '100%',
    height: 380,
    borderRadius: 15,
    overflow: 'hidden',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  botaoPanico:{
    position: 'absolute',
    backgroundColor: '#3C0609',
    borderRadius: 50,
    marginLeft: 360,
    marginTop: 300,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
   },
  profileContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#FFEDE3',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  titulo:{
    fontSize: 40,
    fontFamily: 'DMSerifDisplay_400Regular',
    color: '#631C1C',
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  contactCard: {
    width: 320,
    height: 160,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#49070A',
    borderRadius: 15,
    backgroundColor: '#FFEDE3',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contactHeader: {
    flexDirection: 'row',
    marginLeft: 10, 
  },
  contactName: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold', 
    color: "#3C0609",
    marginLeft: 5,
  },
  contactEmail: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: "#3C060999",
    marginLeft: 5,
  },
  contactCelular: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium', 
    color: "#3C060999",
    marginLeft: 5,
  },
  deleteButton: {
    width: 150,
    height: 35,
    backgroundColor: '#3C0609',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  deleteText: {
    color: '#FFEDE3',
    fontFamily: 'Inter_700Bold', 
  },
});
 
export default HomeScreen;
