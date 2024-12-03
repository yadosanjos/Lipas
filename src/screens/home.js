import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView, { Marker } from 'react-native-maps';
import { db, auth } from '../services/firebase/conf';
import { collection, doc, setDoc, onSnapshot, query, where, serverTimestamp } from 'firebase/firestore';

const LOCATION_TASK_NAME = 'background-location-task';

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [contacts, setContacts] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationUpdatesActive, setLocationUpdatesActive] = useState(false); // Mudado para false inicialmente

  useEffect(() => {
    checkPermissions();
    fetchContactsLocations();
  }, []);

  async function checkPermissions() {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== 'granted') {
      Alert.alert('Permissão necessária', 'O app precisa de acesso à localização para funcionar.');
      navigation.navigate('Permissions');
      return;
    }

    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== 'granted') {
      Alert.alert('Permissão em background necessária', 'O app precisa de acesso em background para localização contínua.');
      return;
    }

    if (!locationUpdatesActive) startLocationUpdates(); // Verifica se a localização já está ativa
  }

  async function startLocationUpdates() {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 50, // Atualiza a cada 50 metros
      deferredUpdatesInterval: 60000, // Intervalo mínimo de atualização: 1 minuto
      showsBackgroundLocationIndicator: true,
    });

    const currentLocation = await Location.getLastKnownPositionAsync();
    if (currentLocation) {
      updateLocationInFirestore(currentLocation.coords);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    setLocationUpdatesActive(true); // Ativa o estado após o início da atualização
  }

  async function stopLocationUpdates() {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    setLocationUpdatesActive(false); // Desativa o estado
  }

  async function forceUpdateLocation() {
    const currentLocation = await Location.getLastKnownPositionAsync();
    if (currentLocation) {
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      updateLocationInFirestore(currentLocation.coords);
    }
  }

  async function updateLocationInFirestore(coords) {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'locations', user.uid);
      await setDoc(userDocRef, {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp: serverTimestamp(),
      }, { merge: true });
    }
  }

  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.error('Erro na tarefa de localização:', error);
      return;
    }
    if (data) {
      const { locations } = data;
      const [location] = locations;
      if (location) {
        updateLocationInFirestore(location.coords);
      }
    }
  });

  function fetchContactsLocations() {
    const user = auth.currentUser;
    if (!user) return;

    const locationsRef = collection(db, 'locations');
    const q = query(locationsRef, where('sharedWith', 'array-contains', user.uid)); // Garantir que o campo 'sharedWith' existe
    onSnapshot(q, (snapshot) => {
      const updatedContacts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(updatedContacts);
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={region}
        followsUserLocation={true}
      >
        {contacts.map(contact => (
          <Marker
            key={contact.id}
            coordinate={{ latitude: contact.latitude, longitude: contact.longitude }}
            title={contact.nomeContato || 'Contato'}
            pinColor="blue"
          />
        ))}
      </MapView>

      {contacts.length > 0 ? (
        contacts.map((item, index) => (
          <View style={styles.contactItem} key={index}>
            <Text style={styles.contactText}>{item.nomeContato}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setRegion({
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            })}>
              <Text style={styles.buttonText}>Ver Localização</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.container2}>
          <Text style={styles.texto}>Você ainda não tem contatos compartilhando localização.</Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={atualizar}>
          <Text>Atualizar Localização</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={parar}>
          <Text>Parar Localização</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#640F14',
    width: '100%',
    height: '100%',
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
  map: {
    width: '100%',
    height: 400,
  },
  container2: {
    backgroundColor: '#FFEDE3',
    width: '100%',
    height: 280,
    borderWidth: 2,
    borderColor: '#640F1480',
    marginTop: 420,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
  },
  texto: {
    width: 320,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#49070A',
    textAlign: 'center',
    marginTop: 80,
  },
  convida: {
    width: 150,
    height: 30,
    borderWidth: 1.5,
    borderColor: "#49070A",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  textconvida: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#49070A',
  },
  atualizar:{
    backgroundColor: '#640F14',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: '#49070A',
  },
  textAtualizar:{
    color: '#FFEDE3',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  contactItem: {
    backgroundColor: '#FFEDE3',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  contactText: { 
    color: '#49070A', 
    fontSize: 16 
  },
  button: {
    backgroundColor: '#640F14',
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonStop: {
    backgroundColor: '#D32F2F',
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#FFEDE3',
    fontSize: 14,
    textAlign: 'center',
  },
  atualizar:{

  },
  parar:{

  },
});

export default HomeScreen;




