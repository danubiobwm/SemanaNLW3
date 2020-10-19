import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

interface IHeaderProps{
  title:string,
  showCancel?:boolean
}

export default function Header({title, showCancel=true}:IHeaderProps){

  const navigation = useNavigation();


  function handleGoBackHome(){
    navigation.navigate('OrphanagesMap')
  }


  return (
    <View style={styles.constainer}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6"/>
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
     {showCancel ? ( 
        <BorderlessButton onPress={handleGoBackHome}>
        <Feather name="x" size={24} color="#ff669d"/>
      </BorderlessButton>
     ):(
       <View />
     )}
    </View>
  );
}

const styles=StyleSheet.create({
  constainer:{
    padding:24,
    backgroundColor:'#f9fafc',
    borderBottomWidth:1,
    borderColor:'#dde3f0',
    paddingTop:44,

    flexDirection:'row', 
    justifyContent:'space-between',
    alignItems:'center'
  },
  title:{
    fontFamily:'Nunito_600SemiBold', 
    color:'#8fa7b3',
    fontSize:16,
  }
})