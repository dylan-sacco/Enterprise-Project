// Components.js
import React from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const ProductBubbleStyles = StyleSheet.create({
    touch:{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        borderRadius:20,

    },
    container: {
        ...Platform.select({
            ios: {
            minWidth: 150,
            },
            android: {
            minWidth: 150,
            },
            web: {
            minWidth: 300,
            }
        }),
        // width: '100%',
        height: 200,
        borderRadius:20,
        margin: 10,
        flex: 1,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        padding:2,

    },
    textContainer: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderRadius: 9,
        padding: 9,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'fill',
        resizeMode: 'cover',
        // resizeMode: 'contain',
        // resizeMode: 'stretch',
        // backgroundColor: 'rgba(0,0,0,0.2)',
    }
  
});
const ProductBubble = (props) => {
    function onPress() {
    //   console.log('Pressed ', props.name, ' for $', props.price, '!');
    //   console.log("this is where we would navigate to the product page");
        props.navigation.push(
        'Products', {
            productId: 'ca724', 
            productName: props.name, 
            price: props.price, 
            url: props.image
        }); // use push to create a new screen
    }
    return(
    <View style={ProductBubbleStyles.container}>
    <TouchableOpacity style={ProductBubbleStyles.touch}
    onPress={onPress}>
    <Image style={ProductBubbleStyles.image} source={{uri: props.image} /*|| require('./assets/Square_200x200.png') */} />
    <View style={ProductBubbleStyles.textContainer}>
        <Text style={ProductBubbleStyles.text}>
        {props.name}
        </Text>
        <Text style={ProductBubbleStyles.text}>
        ${props.price} 
        </Text>
    </View>
    </TouchableOpacity>
    </View>
      
    );
};



export default ProductBubble;