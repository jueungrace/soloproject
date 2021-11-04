import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Button, FLatList } from 'react-native';
import TopButtons from '../components/TopButtons';
import CoffeeCard from '../components/CoffeeCard';
import { DARK_BROWN, MED_BROWN, LIGHT_BROWN } from '../constants/style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlatList from "react-native/Libraries/Lists/FlatList";

export default function HomeScreen ({navigation}) {
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      const userID = await AsyncStorage.getItem('user');
      console.log(userID);
      fetch(`https://tough-impala-65.loca.lt/user?id=${userID}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.log('Error fetching user data: ', err))
        .finally(() => setLoading(false));
    }
    getUserData();
  }, [])

  //console.log(userData.entries);

  const logout = async () => {
    AsyncStorage.clear();
    navigation.navigate('Login')
  }

  const renderEntries = (item) => {
    //console.log(item);
    return (
      <View>
        <CoffeeCard 
          loved={item.item.loved}
          name={item.item.name} 
          rating={item.item.rating} 
          country={item.item.country}
          region={item.item.region} 
          purchasedFrom={item.item.purchasedFrom}
          price={item.item.price}  
          methods={item.item.brewingMethods} 
          aroma={item.item.aroma} 
          flavor={item.item.flavorAndFinish}  
          notes={item.item.notes}  
          id={item.item._id}
        />
      </View>
    )
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' animating />
      </SafeAreaView>
    )
  } else {
      return (
        <SafeAreaView style={styles.container}>
        <TopButtons button2='add' />
        <TouchableOpacity 
          style={styles.logout}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
          <Text style={styles.name}>Hi { userData.firstName }</Text>
          <Text style={styles.smallText}>What are you brewing today?</Text>
          <FlatList
            data={userData.entries}
            renderItem={renderEntries}
            keyExtractor={entry => entry._id}
          />
        </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: LIGHT_BROWN,
    alignItems: 'center'
  },
  logout: {
    padding: 5,
    alignSelf: 'flex-start',
    marginLeft: 40,
    backgroundColor: MED_BROWN
  },
  logoutText: {
    fontSize: 8
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