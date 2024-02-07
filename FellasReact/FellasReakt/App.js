import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    //doc said we only need one nav container and all our interface code needs to be in it - Amir
  <NavigationContainer>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
  );
}


//StyleSheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
