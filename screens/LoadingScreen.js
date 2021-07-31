import React, { useEffect } from "react";
import { Button, TextInput } from "react-native-paper";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen = (props) => {
  const myAsyncEffect = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      props.navigation.replace("home");
    } else {
      props.navigation.replace("login");
    }
  };
  useEffect(() => {
    myAsyncEffect();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#26C49E" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
