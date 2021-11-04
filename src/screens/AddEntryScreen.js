import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Button, ScrollView, Alert } from 'react-native';
import TopButtons from '../components/TopButtons';
import { DARK_BROWN, MED_BROWN, LIGHT_BROWN } from '../constants/style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';

export default function AddEntryScreen ({ navigation }) {
  const [ userID, setUserID ] = useState('');

  useEffect(() => {
    async function getUser() {
      const id = await AsyncStorage.getItem('user');
      setUserID(id);
    }

    getUser();
  }, [])

  const [name, setName] = React.useState('');
  const [rating, setRating] = React.useState('4');
  const [country, setCountry] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [purchased, setPurchased] = React.useState('');
  const [price, setPrice] = React.useState('');
  //const [methods, setMethods] = React.useState([]);
  const [methods, setMethods] = React.useState('');

  const [aroma, setAroma] = React.useState('');
  // const [flavor, setFlavor] = React.useState([]);
  const [flavor, setFlavor] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const handleSubmit = () => {
    
    const entry = {
      loved: false,
      rating,
      name,
      country,
      region,
      purchasedFrom: purchased,
      price,
      brewingMethods: methods,
      aroma,
      flavorAndFinish: flavor,
      notes
    };

    const body = {
      id: userID,
      entry
    }

    console.log(body);

    fetch('https://tough-impala-65.loca.lt/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          Alert.alert(data.error);
        } else {
          Alert.alert('Successfully saved!');
          // loading?
          navigation.navigate('Home', {
            userID: data.userID
          }); // pass in new entry?
        }
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <TopButtons/>
        <Text style={styles.title}>Add Entry</Text>
        <View style={styles.line}/>
        
        <Text style={styles.formTitle}>name of coffee:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
        />

        <Text style={styles.formTitle}>rating:</Text>
        <RadioButton.Group onValueChange={newRating => setRating(newRating)} value={rating}>
          <View style={styles.choiceContainer}>
            <View style={styles.radioContainer}>
              <Text style={styles.radio}>1</Text>
              <RadioButton 
                value="1" 
                color='white'
              />
            </View>
            
            <View style={styles.radioContainer}>
              <Text style={styles.radio}>2</Text>
              <RadioButton value="2" color='white' />
            </View>

            <View style={styles.radioContainer}>
              <Text style={styles.radio}>3</Text>
              <RadioButton value="3" color='white' />
            </View>

            <View style={styles.radioContainer}>
              <Text style={styles.radio}>4</Text>
              <RadioButton value="4" color='white'/>
            </View>

            <View style={styles.radioContainer}>
              <Text style={styles.radio}>5</Text>
              <RadioButton value="5" color='white'/>
            </View>
          </View>
        </RadioButton.Group>

        <Text style={styles.formTitle}>country</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCountry}
          value={country}
        />

        <Text style={styles.formTitle}>region</Text>
        <TextInput
          style={styles.input}
          onChangeText={setRegion}
          value={region}
        />

        <Text style={styles.formTitle}>purchased at</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPurchased}
          value={purchased}
        />

        <Text style={styles.formTitle}>price</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          value={price}
        />

        <Text style={styles.formTitle}>brewing method(s)</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMethods}
          value={methods}
        />

        <Text style={styles.formTitle}>aroma notes</Text>
        <TextInput
          style={styles.inputBig}
          onChangeText={setAroma}
          value={aroma}
          multiline={true}
          numberOfLines={4}
        />

        <Text style={styles.formTitle}>flavor/finish</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFlavor}
          value={flavor}
        />

        <Text style={styles.formTitle}>notes</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.inputBig}
          onChangeText={setNotes}
          value={notes}
        />

        <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.btnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 35,
    paddingTop: 30,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: .5,
    width: 350,
    marginVertical: 40
  },
  input: {
    marginHorizontal: 30,
    paddingVertical: 15,
    height: 50,
    width: 300,
    margin: 12,
    padding: 10,
    backgroundColor: LIGHT_BROWN,
    borderRadius: 5,
    fontFamily: 'SourceCodePro-Regular',
  },
  inputBig: {
    marginHorizontal: 30,
    height: 100,
    width: 300,
    margin: 12,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: LIGHT_BROWN,
    borderRadius: 5,
    fontFamily: 'SourceCodePro-Regular',
  },
  formTitle: {
    fontSize: 17,
    color: DARK_BROWN,
    fontFamily: 'SourceCodePro-Medium',
  },
  radio: {
    fontFamily: 'SourceCodePro-Medium',
  },
  choiceContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    backgroundColor: MED_BROWN,
    padding: 5,
    marginHorizontal: 7,
    marginBottom: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: DARK_BROWN,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: 130,
    color: 'white',
    alignItems: "center",
    marginHorizontal: 20,
  },
  btnText: {
    color: 'white',
    fontFamily: 'SourceCodePro-Regular',
  }
})