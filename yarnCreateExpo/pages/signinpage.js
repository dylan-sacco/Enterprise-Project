import React, { useContext, useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Button } from "react-native";
import { auth, app } from '../firebaseConfig';
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
        // signIn({ token: user.stsTokenManager.accessToken });
        setErrorCodes("You have successfully signed up!, Please sign in")
      })
      .catch((error) => {
        setErrorCodes(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Sign In</Text>

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
      </View>
      {emailError ? <Text style={{ color: "red" }}>{emailError}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={signin} style={styles.button} />
        <Button title="Sign Up" onPress={signup} style={styles.button} />
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
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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