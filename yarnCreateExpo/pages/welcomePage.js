import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { COLORS } from "../styles/styles";
import { styles } from "../styles/styles";

//--------------------START OF WELCOME FUNCTION--------------------
function Welcome({ navigation }) {
  let navToShop = () => {
    navigation.push('HomeTabs' , { screen: 'HomeStack' })
    
  };
    return (
      <ScrollView contentContainerStyle={styles.container} style={{backgroundColor: '#111'}}>
        <Text style={styles.heading}>Welcome to The Fellas</Text>
        <View style={styles.bannerContainer}>
          <ImageBackground source={require('../assets/Images/bannerbackground.jpg')}
            resizeMode="cover"
            style={styles.bannerImage}>
              <View>
                <Text style={styles.bannerText}>Fellas</Text>
              </View>
            </ImageBackground>
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
        <View style={styles.cloudedPanel}>
          <Text style={styles.aboutText}>At Fellas Co., our mission is simple: to provide an unparalleled shopping experience centered around you. We're more than just a store; we're a community dedicated to delivering exceptional service and satisfaction to every customer. Whether you're seeking timeless fashion pieces or curated lifestyle products, we're here to inspire and support you on your journey. Welcome to Fellas Co., where your satisfaction is our top priority."</Text>
        </View>
        <TouchableOpacity 
          style={{backgroundColor: COLORS.JB, padding: 20, margin: 10, width: '20%', alignItems: 'center', alignSelf: 'center', borderRadius: 10,}}
          onPress={navToShop}>
          <Text style={styles.link}>
            {/* Shop Now */}
            Begin Shopping
          </Text>
        </TouchableOpacity>
        
      </ScrollView>
    );
  }
  
  export default Welcome;