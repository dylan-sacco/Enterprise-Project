import React, { useContext, useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Platform} from "react-native";
import { auth, app } from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { AuthContext } from "../auth/AuthContext";

import { COLORS } from "../styles/styles";
import { ImageBackground } from "react-native";

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
  
  const Auth = getAuth();
  const signin = async () => {
    signInWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
        const { email, emailVerified } = userCredential.user;
        console.log(email, emailVerified);
        if(!emailVerified) {
          sendEmailVerification(userCredential.user);
          setEmailError("Please verify your email before signing in. A new verification email has been sent to you.");
          return;
        }
        // console.log("Signed in");
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
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user);
        // signIn({ token: user.stsTokenManager.accessToken });
        setErrorCodes("You have successfully signed up!, Please sign in")
      })
      .catch((error) => {
        setErrorCodes(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground source={require('../assets/signinbackground.jpg')} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.signinpanel}>
          <Text style={styles.heading}>Sign In</Text>
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
        </View>
      </ImageBackground>
      

      
    </KeyboardAvoidingView>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  signinpanel: {
    width: '50%',
    padding: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.FoggedBackgroundDark,
    // backgroundColor: COLORS.FoggedBackgroundLight,
    backdropFilter: 'blur(5px)',
    margin: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios:{width: '80%'},
      android:{width: '80%'},
    })
  },
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
    backgroundColor: '#000000',
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