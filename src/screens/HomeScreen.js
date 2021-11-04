import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Button, FLatList } from 'react-native';
import TopButtons from '../components/TopButtons';
import CoffeeCard from '../components/CoffeeCard';
import { DARK_BROWN, MED_BROWN, LIGHT_BROWN } from '../constants/style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlatList from "react-native/Libraries/Lists/FlatList";

export default function HomeScreen ({navigation}) {
  const [userData, setUserData] = useState({});
  

  useEffect(() => {
    async function getUserData() {
      const userID = await AsyncStorage.getItem('user');
      console.log(userID);
      fetch(`https://tough-impala-65.loca.lt/user?id=${userID}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.log('Error fetching user data: ', err));
    }
    getUserData();
  }, [])

  // const renderItem = (entry) => (
  //   <CoffeeCard name={entry.name} rating='5' country='Country' region='Region' purchasedFrom='Hidden Grounds'
  //       price='13' methods={['a', 'b']} aroma='Fruity, savory' flavor='Rich' notes='Very good' />
  // )

  return (
    <SafeAreaView style={styles.container}>
    <TopButtons button2='add' />
      <Text style={styles.name}>Hi { userData.firstName }</Text>
      <Text style={styles.smallText}>What are you brewing today?</Text>
      
      <CoffeeCard name='CoffeeName' rating='5' country='Country' region='Region' purchasedFrom='Hidden Grounds'
        price='13' methods={['a', 'b']} aroma='Fruity, savory' flavor='Rich' notes='Very good'
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: LIGHT_BROWN,
    alignItems: 'center'
  },
  name: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 40,
    paddingTop: 40,
    width: 310,
    color: DARK_BROWN
  },
  smallText: {
    fontFamily: 'SourceCodePro-Regular',
    color: '#987654',
    width: 305,
    marginBottom: 20
  }
})