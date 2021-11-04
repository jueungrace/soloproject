import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { DARK_BROWN, MED_BROWN, LIGHT_BROWN } from '../constants/style.js';


export default function SignUpScreen ({navigation}) {
  const [firstName, onChangeFirstName] = React.useState('');
  const [lastName, onChangeLastName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  //const [repeatPassword, onChangeRepeatPassword] = React.useState('');

  const handleSignUp = () => {
    const body = {
      firstName,
      lastName,
      email,
      username,
      password
    };

    console.log(body);

    fetch('https://tough-impala-65.loca.lt/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(async (data) => {
        if (data.error) {
          Alert.alert(data.error);
        } else {
          console.log('Sign-up succeeded!', data);
          //navigation.navigate('Home');
          // loading screen?
        }
      })
      .catch(err => {
        console.log('Sign-up error: ', err);
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>BeanBook</Text>
      <Text style={styles.subtitle}>create an account</Text>

      <Text style={styles.formTitle}>first name</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeFirstName}
        value={firstName}
        maxLength={20}
        autoCapitalize='words'
      />

      <Text style={styles.formTitle}>last name</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeLastName}
        value={lastName}
        maxLength={20}
        autoCapitalize='words'
      />

      <Text style={styles.formTitle}>email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        maxLength={20}
        autoCapitalize='none'
        keyboardType='email-address'
      />

      <Text style={styles.formTitle}>username</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        maxLength={20}
        secureTextEntry={false}
        autoCapitalize='none'
      />

      <Text style={styles.formTitle}>password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        maxLength={20}
        secureTextEntry={true}
        autoCapitalize='none'
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.btnText}>Go Back</Text>
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
    fontSize: 40,
    padding: 5,
    fontFamily: 'PlayfairDisplay-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    color: 'white',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'SourceCodePro-Bold',
    color: DARK_BROWN,
    marginBottom: 50,
  },
  formTitle: {
    fontSize: 17,
    color: DARK_BROWN,
    fontFamily: 'SourceCodePro-Medium',
  },
  input: {
    marginHorizontal: 30,
    paddingVertical: 15,
    height: 45,
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