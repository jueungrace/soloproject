import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { DARK_BROWN, MED_BROWN, LIGHT_BROWN } from '../constants/style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen ({navigation}) {

  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const handleLogin = () => {
    const body = {
      username,
      password
    };

    console.log(body);

    fetch('https://tough-impala-65.loca.lt/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(async (data) => {
        if (data.code !== 200) {
          Alert.alert(data.error);
        } else {
          console.log('Login succeeded!');
          // navigate to home 
          try {
            await AsyncStorage.setItem('user', data.userID);
          } catch (err) {
            console.log('Syncing error: ', err);
          }
          navigation.navigate('Home');
          //Alert.alert('Login success!');
        }
      })
      .catch(err => console.log('Signup error: ', err));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>BeanBook</Text>
      <Text style={styles.subtitle}>my beans + brews</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        maxLength={20}
        placeholder='Username'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        maxLength={20}
        secureTextEntry={true}
        placeholder='Password'
        autoCapitalize='none'
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        >
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: MED_BROWN,
    alignItems: 'center'
  },
  logo: {
    fontSize: 60,
    padding: 5,
    fontFamily: 'PlayfairDisplay-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    color: 'white',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'SourceCodePro-Bold',
    color: DARK_BROWN,
    marginBottom: 100,
  },
  input: {
    marginHorizontal: 30,
    paddingVertical: 15,
    height: 50,
    width: 300,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: 'SourceCodePro-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: DARK_BROWN,
    padding: 10,
    marginTop: 40,
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