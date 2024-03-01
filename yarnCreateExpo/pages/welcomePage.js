import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

//--------------------START OF WELCOME FUNCTION--------------------
function Welcome({ navigation }) {
  let navToShop = () => {
    navigation.navigate('HomeTabs' , { screen: 'Home' })
  };
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Welcome to The Fellas</Text>
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/WelcomeBanner2.png')}
            resizeMode="cover"
            style={styles.bannerImage}></Image>
  
          {/*
        <View style={styles.navigationContainer}>
        <Button
            
            title="Shop Now"
            onPress={() => navigation.navigate('Shopping', { screen: 'Home' })}
            style={{ padding: 20, marginHorizontal: 20 }}
            
          />
          <Button
              title="Settings"
              onPress={() => navigation.navigate('Settings')}
              style={{ padding: 20, marginHorizontal: 20 }}
          />
          </View>
          */}
  
          {/* Add more buttons as needed. i was going to have a link to the products stack and maybe one or two other places. ik we wanted a favorites page but idk if thats feasible */}
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>At Fellas Co., our mission is simple: to provide an unparalleled shopping experience centered around you. We're more than just a store; we're a community dedicated to delivering exceptional service and satisfaction to every customer. Whether you're seeking timeless fashion pieces or curated lifestyle products, we're here to inspire and support you on your journey. Welcome to Fellas Co., where your satisfaction is our top priority."</Text>
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={navToShop}>
          <Text style={styles.link}>
            {/* Shop Now */}
            SHOW ME THE DAMN CLOTHS
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  
  
  export default Welcome;