import React from 'react';
import {SafeAreaView,StyleSheet,View,Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';


import colors from '../styles/colors';
import fonts from '../styles/fonts';


import {Button} from '../components/Button';

interface Params {
  title: string;
  subTittle: string;
  buttonTitle: string;
  icon: 'hug' | 'smile',
  nextScreen: string;
}
const emojis = {
  hug: '🤗',
  smile: '🤪',
}
export function Confirmation(){
  const navigation = useNavigation();
  const routes = useRoute();

  const {
     buttonTitle,
     icon,
     nextScreen,
     subTittle,
     title
  } = routes.params as Params;

  function handleMoveOn(){
    navigation.navigate(nextScreen)
  }
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}> 
        <Text style={styles.emoji}>
          {emojis[icon]} 
        </Text>
        <Text style={styles.tittle} > {title} </Text>
        <Text style={styles.subTittle} >
          {subTittle}
        </Text>
        <View style={styles.footer} >
          <Button tittle={buttonTitle}
          onPress={handleMoveOn}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    padding:30,
  },
  tittle:{
    fontSize:22,
    fontFamily: fonts.heading,
    textAlign:'center',
    color: colors.heading,
    lineHeight:38,
    marginTop:10,
  },
  subTittle:{
    fontFamily:fonts.text,
    textAlign:'center',
    fontSize:17,
    paddingVertical:20,
    color: colors.heading

  },
  emoji:{
    fontSize:78,
  },
  footer:{
    width:'100%',
    paddingHorizontal:50,
    marginTop:20,
  }
})

