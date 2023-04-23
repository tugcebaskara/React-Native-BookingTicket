import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Divider, RadioButton, useTheme } from "react-native-paper";
import Modal from "../../components/Modal";
import DateTime from "../../components/DateTime";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../constants/colors";
import { Alert } from "react-native";
import { shadow } from "../../constants/shadow";
import { Dropdown } from "react-native-element-dropdown";
import { fromData, toData, voyageData } from "../../common/voyage";
import styles from "./styles";

function SearchTicket() {
  const [checked, setChecked] = useState("first"); // Tek yön veya gidiş-dönüş seçimi
  const [startDate, setStartDate] = useState(new Date()); // Gidiş tarihi
  const [endDate, setEndDate] = useState(new Date()); // Dönüş tarihi
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // Gidiş tarihi seçimi
  const [showEndDatePicker, setShowEndDatePicker] = useState(false); // Dönüş tarihi seçimi
  const [isFocus, setIsFocus] = useState(false);
  const [Formdata, setFormdata] = useState({
    // Form verileri
    from: "",
    fromLabel: "",
    to: "",
    toLabel: "",
    isroundtrip: false,
    startDate: new Date(),
    endDate: new Date(),
  });

  const navigation = useNavigation();

  // Gidiş tarihi seçimi
  const onStartDateChange = (event, date) => {
    setShowStartDatePicker(false);
    if (date) {
      console.log("onStartDateChange", date);
      setFormdata({ ...Formdata, startDate: date });
      setStartDate(date);
      console.log("Formdata :", Formdata);
    }
  };

  // Tek yön veya gidiş-dönüş seçimi
  const onEndDateChange = (event, date) => {
    setShowEndDatePicker(false);
    if (date) {
      setFormdata({ ...Formdata, endDate: date });
      setEndDate(date);
    }
  };

  // Tek yön veya gidiş-dönüş seçimi
  const rountTrip = (isChecked) => {
    if (isChecked === "first") {
      setChecked("first");
      setFormdata({ ...Formdata, isroundtrip: false });
    } else {
      setChecked("second");
      setFormdata({ ...Formdata, isroundtrip: true });
    }
  };

  // Gidiş tarihi seçildikten sonra dönüş tarihi seçilirken bu fonksiyon çalışır
  const checkReturnDate = (event, date) => {
    console.log("Gidiş tarihi: " + startDate);
    console.log("Dönüş tarihi: " + date);
    if (date <= startDate) {
      // Uyarı mesajı göster
      Alert.alert("Uyarı", "Dönüş tarihi, gidiş tarihinden küçük olamaz!");
    } else {
      onEndDateChange(event, date);
    }
  };

  const onSearch = () => {
    if (Formdata.from === "") {
      Alert.alert("Uyarı", "Nereden seçimi yapmadınız!"); // Uyarı mesajı göster
    } else if (Formdata.to === "") {
      Alert.alert("Uyarı", "Nereye seçimi yapmadınız!"); // Uyarı mesajı göster
    } else if (Formdata.startDate === "") {
      Alert.alert("Uyarı", "Gidiş tarihi seçimi yapmadınız!"); // Uyarı mesajı göster
    } else if (Formdata.isroundtrip && Formdata.endDate === "") {
      Alert.alert("Uyarı", "Dönüş tarihi seçimi yapmadınız!"); // Uyarı mesajı göster
    } else if (Formdata.isroundtrip && Formdata.endDate != "") {
      const filteredData = voyageData.filter((item) => {
        const itemDate = new Date(item.startDate);
        const formDataDate = new Date(Formdata.startDate);
        const formDataDateEnd = new Date(Formdata.endDate);

        if (
          item.from === Formdata.fromLabel &&
          item.to === Formdata.toLabel &&
          itemDate.getFullYear() === formDataDate.getFullYear() &&
          itemDate.getMonth() === formDataDate.getMonth() &&
          itemDate.getDate() === formDataDate.getDate()
        ) {
          return item;
        }
      });
      console.log("Başlangiç", Formdata);
      console.log("Filtreleme işlemi bitti...", filteredData);
      // Filtreleme sonucunda eşleşen verilerle ChooseTicket ekranına yönlendir
      if (filteredData.length > 0) {
        navigation.navigate("ChooseTicket", { voyage: filteredData });
      } else {
        Alert.alert("Uyarı", "Seçtiğiniz kriterlerde bir sefer bulunamadı.");
      }
    } else {
      // Filtreleme işlemi
      const filteredData = voyageData.filter((item) => {
        const itemDate = new Date(item.startDate);
        const formDataDate = new Date(Formdata.startDate);
        const itemEndDate = new Date(item.endDate);

        if (
          item.from === Formdata.fromLabel &&
          item.to === Formdata.toLabel &&
          itemDate.getFullYear() === formDataDate.getFullYear() &&
          itemDate.getMonth() === formDataDate.getMonth() &&
          itemDate.getDate() === formDataDate.getDate() ||
          itemEndDate.getFullYear() === formDataDate.getFullYear() &&
          itemEndDate.getMonth() === formDataDate.getMonth() &&
          itemEndDate.getDate() === formDataDate.getDate()
        ) {
          return item;
        }
      });
      console.log("Başlangiç", Formdata);
      console.log("Filtreleme işlemi bitti...", filteredData);
      // Filtreleme sonucunda eşleşen verilerle ChooseTicket ekranına yönlendir
      if (filteredData.length > 0) {
        navigation.navigate("ChooseTicket", { voyage: filteredData });
      } else {
        Alert.alert("Uyarı", "Seçtiğiniz kriterlerde bir sefer bulunamadı.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: wp("10%"),
        }}
      >
        <View style={styles.inputView}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={fromData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Nereden ?" : "..."}
            searchPlaceholder="Arama..."
            value={Formdata.from}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) =>
              setFormdata({
                ...Formdata,
                from: item.value,
                fromLabel: item.label,
              })
            }
          />
        </View>
        <View style={styles.inputView}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={toData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Nerede ?" : "..."}
            searchPlaceholder="Arama..."
            value={Formdata.to}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) =>
              setFormdata({ ...Formdata, to: item.value, toLabel: item.label })
            }
          />
        </View>
      </View>

      <View style={styles.ustContainer}>
        <TouchableOpacity
          onPress={() => rountTrip("first")}
          style={styles.radioContainer}
        >
          <View style={styles.roundedView}>
            <RadioButton
              color="black"
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => rountTrip("first")}
            />
          </View>
          <Text style={styles.textA}>Gidiş</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={rountTrip.bind(this, "second")}
          style={styles.radioContainer}
        >
          <View style={styles.roundedView}>
            <RadioButton
              color="black"
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={rountTrip.bind(this, "second")}
            />
          </View>
          <Text style={styles.textA}>Gidiş- Dönüş</Text>
        </TouchableOpacity>
      </View>

      {/* <Modal /> */}
      <View style={styles.dateContainer}>
        <View style={styles.dateView}>
          <TouchableOpacity
            style={styles.dateSet}
            onPress={() => setShowStartDatePicker(true)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="return-up-forward"
                color={colors.primary}
                size={wp("6%")}
              />
              <Text style={styles.textA}> Gidiş Tarihi :</Text>
            </View>
            <Text style={styles.textA}>
              {Formdata.startDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTime value={Formdata.startDate} onChange={onStartDateChange} />
          )}
        </View>
        <Divider bold horizontalInset />

        {Formdata.isroundtrip && (
          <View style={styles.dateView}>
            <TouchableOpacity
              style={styles.dateSet}
              onPress={() => setShowEndDatePicker(true)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="return-down-back"
                  color={colors.primary}
                  size={wp("6%")}
                />
                <Text style={styles.textA}> Dönüş Tarihi :</Text>
              </View>
              <Text style={styles.textA}>
                {Formdata.endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTime value={Formdata.endDate} onChange={checkReturnDate} />
            )}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.araBtn} onPress={onSearch}>
        <Text style={styles.textB}>Ara</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SearchTicket;
