import React from 'react';
import { TouchableOpacity,Text,StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
  tittle: string
}

export function Button({tittle, ... rest }:ButtonProps){
  return (
    <TouchableOpacity style={styles.container}
      {... rest}
      >
      <Text style={styles.text}> 
        {tittle}  
      </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.green,
    height:56,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    fontSize:16,
    color: colors.white,
    fontFamily: fonts.heading
  },
})