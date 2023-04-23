import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator } from "react-native";
import React, { useState } from "react";
import CreditCard from "../../components/CreditCard";
import { Checkbox, TextInput } from "react-native-paper";
import { Alert } from "react-native";

const Payment = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });

  const onConfirmPaymentPress = () => {
    if (
      formState.cardNumber === "" ||
      formState.cardHolderName === "" ||
      formState.expirationDate === "" ||
      formState.cvv === ""
    ) {
      Alert.alert("", "Lütfen tüm alanları doldurunuz!");
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("ProcessSuccess");
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <CreditCard formState={formState} />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.form}>
        <View style={styles.formItem}>
          <TextInput
            style={styles.formInput}
            maxLength={50}
            placeholder="Kartın üzerindeki isim"
            placeholderTextColor="black"
            onChangeText={(text) => {
              setFormState({ ...formState, cardHolderName: text });
            }}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            style={styles.formInput}
            placeholder="Kart Numarası"
            placeholderTextColor="black"
            keyboardType="numeric"
            maxLength={19}
            onChangeText={(text) => {
              const formattedText = text
                .replace(/\s?/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim();
              setFormState({ ...formState, cardNumber: formattedText });
            }}
            value={formState.cardNumber}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            style={styles.formInput}
            placeholder="Son Kullanma Tarihi (MM/YY)"
            placeholderTextColor="black"
            keyboardType="numeric"
            maxLength={5}
            onChangeText={(text) => {
              const formattedText = text
                .replace(/^(\d\d)(\d)$/g, "$1/$2")
                .replace(/^(\d{1,2})$/g, "$1")
                .replace(/^(0[1-9]|1[0-2])$/g, "$1");
              setFormState({ ...formState, expirationDate: formattedText });
            }}
            value={formState.expirationDate}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            style={styles.formInput}
            maxLength={3}
            placeholder="CVV"
            placeholderTextColor="black"
            keyboardType="numeric"
            onChange={(text) => {
              setFormState({ ...formState, cvv: text });
            }}
          />
        </View>

        <View style={styles.formCheckBox}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <TouchableOpacity>
            <Text style={styles.checkBoxText}>
              Kullanım Koşullarını Kabul Ediyorum
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={onConfirmPaymentPress} style={styles.btnOde}>
        <Text style={styles.satinAlText}>Satın Al</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  form: {
    height: "50%",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  formItem: {
    shadowColor: "#616161",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  formInput: {
    marginVertical: 5,
    borderTopRightRadius: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  btnOde: {
    right: -40,
    backgroundColor: "#778899",
    padding: 10,
    width: "80%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  satinAlText: {
    color: "#E0E1DD",
    fontSize: 20,
    fontWeight: "bold",
  },
  formCheckBox: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxText: {
    color: "black",
    fontSize: 18,
  },
});
