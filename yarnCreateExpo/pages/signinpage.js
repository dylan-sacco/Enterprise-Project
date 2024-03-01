import React, { useContext, useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, Text, TextInput, Button, StyleSheet } from "react-native";
import {auth, app} from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../auth/AuthContext";

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
          signIn({ token: user.stsTokenManager.accessToken });
        })
        .catch((error) => {
          setErrorCodes(error);
        });
    };
  
    return (
  
      <SafeAreaView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text>Sign In</Text>
          <Text>Email</Text>
  
          <TextInput
            autoComplete="email"
            placeholder="Email"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Text>Password</Text>
          <TextInput
            placeholder="Password"
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          {emailError ? <Text style={{ color: "red" }}>{emailError}</Text> : null}
          <Button title="Log In" onPress={signin} style={styles.button}/>
          <Button title="Sign Up" onPress={signup} style={styles.button}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingVertical: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    bannerContainer: {
      width: '100%',
      height: 200, // Adjust height as needed
      marginBottom: 20,
    },
    bannerImage: {
      width: '100%',
      height: '100%',
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    
    
    button: {
      backgroundColor: '#007bff',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 10, // Adjust horizontal margin
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    aboutContainer: {
      width: '80%',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
    },
    aboutText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

export default SignIn;
