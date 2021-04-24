import React,{useState} from 'react';
import {SafeAreaView, StyleSheet,View,Text,TextInput,Platform, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {Button} from '../components/Button';

export function UserIdentification(){
  const navigation  = useNavigation()
  

  const [isFocused,setIsFocused] = useState(false);
  const [isFilled,setIsFilled] = useState(false);
  const [name, setName] = useState<string>()

  async function handleSubmit(){
    if(!name)
     return Alert.alert(" Me diz como chamar voce 😅 ")
    
    try{
      await AsyncStorage.setItem('@plantmanager:user',name) 
      navigation.navigate('Confirmation',{
        
        title: 'Prontinho',
        subTittle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        icon: 'smile',
        buttonTitle: 'Começar',
        nextScreen: 'PlantSelect',
      }
        
        )
    }catch{
      Alert.alert(" Nao foi possivel salvar o nome do usuário! ")
    }
  }
  function handleInputBlur(){
    setIsFocused(false)
    setIsFilled(!!name)
  }
  function handleInputFocus(){
    setIsFocused(true)
  }
  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value)
  }

  return(
      <SafeAreaView style={styles.container} >
        <KeyboardAvoidingView 
         style={styles.container} 
         behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={styles.content} > 
              <View style={styles.form} >
                <View  style={styles.header} >  
                  <Text style={styles.emoji} >
                          {isFilled ? "😆": "😀" }
                      </Text>
                      <Text style={styles.tittle} >
                      Como podemos{'\n'}
                      chamar você?
                      </Text>
                </View>
                
                      <TextInput
                      style={[
                        styles.input,
                        (isFocused || isFilled) && {borderColor:colors.green}

                      ]}
                      placeholder="Digite um nome"
                      onBlur={handleInputBlur}
                      onFocus={handleInputFocus}
                      onChangeText={handleInputChange}
                      />
                      <View style={styles.footer} >
                      <Button tittle="Confirmar" 
                      onPress = {handleSubmit}
                      />
                    </View>
              </View>
             
          </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-around',
  },
  content:{
    flex:1,
    width:'100%',


  },
  form:{
    flex:1,
    justifyContent:'center',
    paddingHorizontal:54,
    alignItems:'center',
  },
  emoji:{
    fontSize:44,
  },
  input:{
    borderBottomWidth:1,
    borderColor: colors.gray,
    width:'100%',
    fontSize:18,
    marginTop:50,
    padding:10,
    textAlign:'center',
  },
  tittle:{
    fontSize:24,
    textAlign:'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight:32,
    marginTop:20,
  },
  footer:{
    marginTop:40,
    width:'100%',
    paddingHorizontal:20,
  },
  header:{
    alignItems:'center'
  }
})