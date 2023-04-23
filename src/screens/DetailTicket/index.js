import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import BusSeat from "../../components/BusSeat";
import { Portal, Modal } from "react-native-paper";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { list } from "./../../components/BusSeat";
import ChairInput from "../../components/ChairInput";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { SeatList } from "../../store/system/ApiAction";

function DetailTicket({ route }) {
  const { company, price, time, emptyChair, fullSeat } = route.params;

  const chair = useSelector((state) => state.system.ticketData);
  const seatList = useSelector((state) => state.system.seatList);

  console.log("DetailTicket", fullSeat);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  let chairType;

  let koltukType = false;
  if (chairType === "2 + 2") {
    koltukType = true;
  } else {
    koltukType = false;
  }

  const [visible, setVisible] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [componentKey, setcomponentKey] = useState(0);

  const containerStyle = {
    backgroundColor: "#0D1B2A",
    margin: 40,
    borderRadius: 30,
  };
  const [fiyatChange, setFiyatChange] = useState(price);

  const [count, setCount] = useState(1);
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    // Yolcu bileşenini sil
    if (componentKey !== 0) {
      const newCount = count - 1;
      // Yolcu bileşenini listeden kaldır
      console.log("inputList", inputList);
      let newInputList = inputList; // inputList'in kopyasını oluştur
      newInputList.pop(); // kopya dizinin son elemanını sil
      // Yeni fiyatı hesapla
      console.log("inputListpop", inputList);
      let newFiyat = price * (newCount + 1);
      // Yeni değerleri ayarla
      setFiyatChange(newFiyat);
      setCount(newCount);
      setInputList(newInputList);

      // Eğer yolcu sayısı 4'e düşerÏse, butonu tekrar etkinleştir
      if (newCount === 4) {
        setDisabledBtn(false);
        console.log("", newCount);
      }
    }
  }, [componentKey]);

  const calculatePrice = () => {
    return price * (inputList.length + 1);
  };

  const handleAddPas = () => {
    let newCount = count + 1;
    let newComponent = (
      <ChairInput
        screenProps={{
          key: count,
          koltukNo: emptyChair,
          handleDeletePas,
          isUser: false,
          onPress2: { openModal },
        }}
      />
    );

    if (newCount === 5) {
      Alert.alert("Uyarı", "En fazla 5 yolcu seçebilirsiniz!");
      setDisabledBtn(true);
    }
    let newFiyat = price * (count + 1);
    setFiyatChange(newFiyat);
    setCount(newCount);
    setInputList([...inputList, newComponent]);
  };

  const handleDeletePas = (key) => {
    // Yolcu sayısını azalt
    setcomponentKey(key);
    console.log("key", key);
  };

  const openModal = () => {
    showModal();
  };

  const onPayment = () => {
    navigation.navigate("Payment");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.firmaTitle}>{company}</Text>
      <ChairInput
        screenProps={{
          key: count,
          koltukNo: emptyChair,
          handleDeletePas,
          isUser: true,
          onPress2: { openModal },
        }}
      />
      {inputList.map((component) => component)}
      <View
        style={{
          width: wp("100%"),
          height: wp("50%"),

          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: wp("20%"),
        }}
      >
        <TouchableOpacity
          style={styles.btnSec}
          disabled={disabledBtn}
          onPress={handleAddPas}
        >
          <Text style={styles.cardtext}>Yolcu Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSatinAl} onPress={onPayment}>
          <Text style={styles.satinAlText}>
            Ödeme Yap : {calculatePrice()} TL{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  firmaTitle: {
    color: "gray",
    fontSize: wp("5%"),
    margin: 25,
  },
  btnSec: {
    backgroundColor: colors.accent,
    padding: 10,
    width: wp("80%"),
    height: wp("12%"),
    margin: 5,
    marginVertical: 10,
    borderRadius: wp("2.3%"),
    justifyContent: "center",
    alignItems: "center",
  },
  cardtext: {
    color: "#E0E1DD",
    fontSize: wp("3.5%"),
    fontWeight: "bold",
  },
  btnSatinAl: {
    flexDirection: "row",
    backgroundColor: colors.accent,
    padding: 10,
    width: wp("80%"),
    height: wp("12%"),
    margin: 5,
    marginBottom: 30,
    borderRadius: wp("2.3%"),
    justifyContent: "center",
    alignItems: "center",
  },
  satinAlText: {
    color: "#E0E1DD",
    fontSize: wp("3.7%"),
    fontWeight: "bold",
  },
  fiyatText: {
    color: "#E0E1DD",
    fontSize: 15,
  },
});
export default DetailTicket;
