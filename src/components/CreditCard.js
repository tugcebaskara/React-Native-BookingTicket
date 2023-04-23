import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

const CreditCard = ({ formState }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.microchip}>
          <MaterialCommunityIcons
            name="integrated-circuit-chip"
            color="#ffd60a"
            size={50}
          />
        </View>
        <View style={styles.cardType}>
          <Image
            source={require("../assets/icons8-mastercard-logo-96.png")}
            style={styles.imageMasterCard}
          />
        </View>
      </View>
      <View style={styles.cardCenter}>
        <Text style={styles.cardNumber}>{formState.cardNumber}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.cardHolder}>
          <Text style={styles.textMedium}>{formState.cardHolderName}</Text>
        </View>
        <View style={styles.cardExpiry}>
          <Text style={styles.textMedium}>{formState.expirationDate} </Text>
        </View>
      </View>
    </View>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginHorizontal: 20,
    marginVertical: 10,
    height: 200,
    backgroundColor: "#778DA9",
    borderRadius: 20,
    alignSelf: "center",
  },
  cardHeader: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  microchip: {},
  cardType: {},
  imageMasterCard: {
    width: 50,
    height: 50,
  },
  cardCenter: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    height: "40%",
  },
  cardNumber: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#E0E1DD",
    fontSize: 20,
  },
  cardFooter: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHolder: {},
  textMedium: {
    color: "#E0E1DD",
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "uppercase",
  },
});
