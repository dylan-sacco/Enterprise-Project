import React, { useContext, useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { auth, app } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../auth/AuthContext";

import { COLORS } from "../styles/styles";

//--------------------START OF SIGNIN FUNCTION--------------------

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signIn } = React.useContext(AuthContext);

  function setErrorCodes(error) {
    const { code, message } = error;
    //   let formattedCode =
    //     code !== null
    //       ? code.replace("auth/", "").replace(/-/g, " ").toUpperCase()
    //       : "";
    let formattedCode = code;
    setEmailError(formattedCode);
  }

  const signin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in");
        const user = userCredential.user;
        signIn({ token: user.stsTokenManager.accessToken });
      })
      .catch((error) => {
        console.log("Error signing in");
        setErrorCodes(error);
      });
  };
  const signup = async () => {
    // empty for now
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // signIn({ token: user.stsTokenManager.accessToken });
        setErrorCodes("You have successfully signed up!, Please sign in")
      })
      .catch((error) => {
        setErrorCodes(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text
      style={styles.heading}
      >Sign In</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        {emailError ? <Text style={{ color: "red" }}>{emailError}</Text> : null}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={signin} style={styles.button} >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DarkMauve

  },
  heading: {
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.L1,
    backgroundColor: '#00000033',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#fffa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})