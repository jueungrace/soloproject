import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DARK_BROWN, MED_BROWN, LIGHT_BROWN } from '../constants/style.js';
import Touchable from "react-native/Libraries/Components/Touchable/Touchable";

export default function TopButtons (props) {
  const navigation = useNavigation();

  return (
    <View
      style={styles.container}
    >

      <TouchableOpacity
       onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={styles.icon}
          source={require('../assets/icons/home.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
       onPress={() => {
         (props.button2 == 'add') ? navigation.navigate("Add") : navigation.navigate('Home');
         }}
      >
        <Image
          style={styles.icon}
          source={(props.button2 == 'add') ? require('../assets/icons/add.png') : require('../assets/icons/close.png')}
          resizeMode='contain'
        />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: 320
  },
  icon: {
    width: 50,
  }
})