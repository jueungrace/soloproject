import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, Animated, FlatList } from 'react-native';
import TopButtons from '../components/TopButtons';
import { DARK_BROWN, MED_BROWN, LIGHT_BROWN } from '../constants/style.js';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CoffeeCard (props) {
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const [ liked, setLiked ] = useState(loved);
  const [ expanded, setExpand ] = useState(false);

  const { loved, name, rating, country, region, purchasedFrom, price, methods, aroma, flavor, notes, id } = props;
  // let methodList;

  // if (methods !== undefined) {
  //   methodList = methods.map((elem, index) => {
  //     if (index === methods.length - 1) {
  //       return <Text key={index.toString()} style={styles.info}>{elem}</Text>;
  //     } else {
  //       return <Text key={index.toString()} style={styles.info}>{elem}, </Text>;
  //     }
  //   })
  // }

  const changeLove = async () => {
    console.log(liked);
    setLiked(!liked);
    const userID = await AsyncStorage.getItem('user');
    console.log(userID);
    const body = { userID, loved: liked, entryID: id };
    console.log(body);
    fetch('https://tough-impala-65.loca.lt/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.log(err.message));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Icon name='heart' size={25} onPress={changeLove} solid={liked} underlayColor='red' color='#d496a0'/>
      </View>
      <View>
        <Text style={styles.info}>Rating: { rating }/5</Text>
        <Text style={styles.info}>Country: { country }</Text>
        <Text style={styles.info}>Region: { region }</Text>
        <Text style={styles.info}>Purchased At: { purchasedFrom }</Text>
        <Text style={styles.info}>Price: ${ price }</Text>
        <Text style={styles.info}>Brewed With: { methods }</Text>
        <Text style={styles.info}>Aroma: { aroma }</Text>
        <Text style={styles.info}>Flavor/Finish: { flavor }</Text>
        <Text style={styles.info}>Other Notes: { notes }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 310,
    padding: 20,
    marginVertical: 10,
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    width: 270,
    justifyContent: 'space-between',
    marginBottom: 15
  },
  title: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 21
  },
  info: {
    fontFamily: 'SourceCodePro-Regular'
  }
})