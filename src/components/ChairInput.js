import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { shadow } from "../constants/shadow";
import { Dropdown } from "react-native-element-dropdown";
import colors from "../constants/colors";
import { Portal, Modal } from "react-native-paper";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BusSeat from "./BusSeat";
import { useSelector } from "react-redux";
const cinsiyetData = [
  { label: "Cinsiyet Seçiniz", value: "" },
  { label: "Kadın", value: 1 },
  { label: "Erkek", value: 2 },
];

const ChairInput = (props) => {
  const userDetail = useSelector((state) => state.system.user);
  const [gender, setGender] = isUser
    ? useState(userDetail.gender)
    : useState("");
  const [isFocus, setIsFocus] = useState(false);
  const showModal = () => setVisible(true);
  const [ChairNo, setChairNo] = useState(0);
  const isUser = props.screenProps.isUser;
  const key = props.screenProps.key;

  const hideModal = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const containerStyle = {
    // burada modalın style'ı ayarlanıyor
    backgroundColor: "#0D1B2A",
    margin: 40,
    borderRadius: 30,
  };

  const showOpen = () => {
    // burada cinsiyet seçilmiş mi kontrol ediliyor
    if (isUser) {
      showModal();
    } else {
      if (gender != "") {
        showModal();
      } else {
        Alert.alert("Uyarı", "Cinsiyet Seçiniz!");
      }
    }
  };

  const getChairNo = (chairNo) => {
    // burada koltuk numarası alınıyor
    setChairNo(chairNo);
  };

  return (
    <View style={styles.cardStyle}>
      <TouchableOpacity
        onPress={() => props.screenProps.handleDeletePas(key)}
        style={{
          width: wp("15%"),
          height: wp("15.3%"),
          borderColor: "gray",
          borderRadius: wp("10%"),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          ...shadow.light,
        }}
      >
        <MaterialCommunityIcons
          name={isUser ? "account-circle" : "minus-circle-outline"}
          size={30}
          color={isUser ? colors.black : colors.red}
        />
      </TouchableOpacity>
      <View pointerEvents={isUser ? "none" : "auto"}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cinsiyetData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Cinsiyet Seçin" : "..."}
          searchPlaceholder="Search..."
          value={isUser ? userDetail.gender : gender}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => setGender(item.value)}
        />
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          chairNo
        >
          <BusSeat
            layout={"2 + 2"}
            gender={isUser ? userDetail.gender : gender}
            hideModal={hideModal}
            getChairNo={getChairNo}
          />
        </Modal>
      </Portal>

      <TouchableOpacity onPress={showOpen} style={styles.koltukNoStyle}>
        {ChairNo == 0 ? (
          <MaterialCommunityIcons
            name="seat-recline-normal"
            size={30}
            color="black"
          />
        ) : (
          <View>
            <MaterialCommunityIcons
              name="seat-recline-normal"
              size={30}
              color="black"
            />
            <Text style={styles.koltukNoText}>Koltuk</Text>
            <Text style={styles.koltukNoText}>No {ChairNo}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    width: wp("100%"),
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: wp("4%"),
  },
  TextInput: {
    height: 50,
    color: "black",
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
  koltukNoStyle: {
    width: wp("18%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    ...shadow.light,
  },
  koltukNoText: {
    color: colors.accent,
    fontSize: wp("3.5%"),
  },
  listTitleStyle: {
    color: "#E0E1DD",
    fontSize: 16,
  },
  dropdown: {
    width: wp("50%"),
    height: wp("15.5%"),
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 8,
    ...shadow.light,
  },
  inputView: {
    backgroundColor: "white",
    width: wp("50%"),
    height: wp("15.5%"),

    ...shadow.light,
  },
});

export default ChairInput;
