import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

import styles from "./styles";

const ProcessSuccess = (props) => {
  const onBackToHomePress = () => {
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainScreen",
        },
      ],
    });
  };
  return (
    <View style={styles.container}>
      <Icon name="check" size={80} color="#6ABF47" style={styles.icon} />
      <Text style={styles.text}>Başarılı bir şekilde ödeme alındı!</Text>

      <TouchableOpacity style={styles.button} onPress={onBackToHomePress}>
        <Text style={styles.buttonText}>Ana Sayfa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProcessSuccess;
