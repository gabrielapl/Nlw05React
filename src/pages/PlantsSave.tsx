import React, { useState } from 'react';
import {StyleSheet,Alert,Text,View,Image,ScrollView,TouchableOpacity, Platform} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {SvgFromUri} from 'react-native-svg'
import { useRoute} from '@react-navigation/core'
import DateTimePicker,{Event} from '@react-native-community/datetimepicker'
import { loadPlant, PlantProps,plantSave } from '../libs/storage';
import { useNavigation } from '@react-navigation/core';

import waterDrop from '../assets/waterdrop.png'
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';

interface Params{
  plant: PlantProps
}
export function PlantSave(){
  const routes = useRoute();
  const { plant } = routes.params as Params; 
  const [selectedDateTime, setSelectedDateTime ] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios'  )
  const navigation  = useNavigation()

  function handleChangeTime(event:Event, dataTime: Date | undefined){
    if(Platform.OS === 'android' ){
      setShowDatePicker(oldState => !oldState);
    }
    if(dataTime && isBefore(dataTime, new Date()) ){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma horario valido! 🤔')
    }
    if(dataTime)
      setSelectedDateTime(dataTime)
  }
  function handleOpenDatePickForAndroid(){
    setShowDatePicker(oldState => !oldState)
  }
  async function handleSave(){
    try {
    await plantSave ({
      ...plant,
       dateTimeNotification: selectedDateTime
    });
      navigation.navigate('Confirmation',{
        
      title: 'Tudo certo',
      subTittle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
      icon: 'hug',
      buttonTitle: 'Muito obrigado :D',
      nextScreen: 'MyPlants',
    }
      
      )
   } catch{
    Alert.alert('Nao foi possivel salvar! 😪')
   }
  }
  return(
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.container}
    >
    <View style={styles.container} >
    <View style={styles.plantInfo} >
        <SvgFromUri 
          uri={plant.photo}
          height ={150}
          width= {150}
        />
        <Text style={styles.plantName} > {plant.name} </Text>
        <Text style={styles.plantAbout} >
         {plant.about}
        </Text>
    </View>
    <View style={styles.controller} >
        <View style={styles.tipContainer }>
            <Image 
              source={waterDrop}
              style={styles.tipImage}
            />
            <Text style={styles.tipText} >
              {plant.water_tips}
            </Text>
        </View>
        <Text style={styles.alertLabel} >
          Escolha o melhor horário para ser lembrado:
        </Text>

       { 
       showDatePicker && (
       <DateTimePicker
          value={selectedDateTime}
          mode="time"
          display='spinner'
          onChange={handleChangeTime}
        />
        )}
        {
          Platform.OS === 'android' && (
            <TouchableOpacity style={styles.dataPickerDateButton} onPress={handleOpenDatePickForAndroid} >
            <Text style={styles.dataPickerDateText} > {`Mudar ${format(selectedDateTime,'HH:mm')}`} </Text>
            </TouchableOpacity>
          )
        }

        <Button tittle="Cadastrar planta" onPress={handleSave} />
    </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo:{
    flex:1,
    paddingHorizontal:30,
    paddingVertical:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.shape,
  },
  controller:{
    backgroundColor: colors.white,
    paddingHorizontal:20,
    paddingTop:20,
    paddingBottom: getBottomSpace() || 20,
  },
  plantName:{
    fontFamily: fonts.heading,
    color:colors.heading,
    fontSize:24,
    marginTop:15,
  },
  plantAbout:{
    textAlign:'center',
    fontFamily: fonts.text,
    color:colors.heading,
    fontSize:17,
    marginTop:10,
  },
  tipContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: colors.blue_light,
    padding:20,
    borderRadius:20,
    position:'relative',
    bottom:60,
  },
  tipImage:{
    width:56,
    height:56,
  },
  tipText:{
    flex:1,
    marginLeft:20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel:{
    textAlign:'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize:12,
    marginBottom:5,
  },
  dataPickerDateText:{
    color: colors.heading,
    fontSize:24,
    fontFamily: fonts.text
  },
  dataPickerDateButton:{
    width:'100%',
    alignItems:'center',
    paddingVertical:40,
  },

})