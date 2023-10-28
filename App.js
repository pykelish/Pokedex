import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=100000&offset=0";
const apiUrl = `${pokePath}${pokeQuery}`;
return (

  <View style={styles.container}>
    <Text> Si </Text>

  </View>

);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
