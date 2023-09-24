// shortcut key for functional component: rnfes
import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { useData } from '../../contexts/DataProvider';

const HomeScreen = ({ navigation }) => {

  const { state, dispatch } = useData();

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>{JSON.stringify(state)}</Text>
      <Button
        title="Add"
        onPress={() => navigation.navigate("StackAdd")}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: 'center'
  }
})