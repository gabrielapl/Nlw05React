import React from 'react'
import { View,Text, Image, TouchableOpacity, StyleSheet,Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){
  const navigation  = useNavigation()
  function handleStart(){
    navigation.navigate('UserIdentification')
  }
  return (
    <View style={styles.container} >
      <Text style={styles.tittle}> 
          Gerencie{'\n'}
          suas plantas de{'\n'}
          forma fácil 
        </Text>
     
      <Image 
        style={styles.image} 
        source={wateringImg} 
        resizeMode='contain'
      />
      
      <Text style={styles.subTittle}> 
       Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar. 
      </Text>
      
      <TouchableOpacity 
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleStart}
        > 
        <Feather 
            name='chevron-right'
            style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around',
    paddingHorizontal:20
  },
  tittle:{
    fontSize:28,
    textAlign:'center',
    color: colors.heading,
    marginTop:30,
    fontFamily: fonts.heading,
    lineHeight:34,
  },
  subTittle:{
    textAlign:'center',
    fontSize:18,
    paddingHorizontal:20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button:{
    backgroundColor:colors.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
    marginBottom:10,
    width:56,
    height:56

  },
  image:{
    height: Dimensions.get('window').width * 0.7 
  },
  buttonIcon:{
    fontSize:24,
    color:colors.white,
    
  }
})
