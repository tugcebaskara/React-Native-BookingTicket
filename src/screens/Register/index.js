import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useAuth } from "../../AuthContext";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { shadow } from "../../constants/shadow";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { castThunkAction } from "../../helpers/casting";
import { Dropdown } from "react-native-element-dropdown";
import { UserRegister } from "../../store/thunks/UserThunks";

const screenHeight = Dimensions.get("window").height;

const GenderEnum = Object.freeze({
  MALE: 1,
  FEMALE: 2,
});

function Register() {
  const [formData, setformData] = useState({
    name: "",
    surname: "",
    birthday: "",
    id: "",
    birthday: "",
    gender: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [FormErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    birthday: "",
    id: "",
    birthday: "",
    gender: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const cinsiyetData = [
    { label: "Cinsiyet Seçiniz", value: "" },
    { label: "Kadın", value: 1 },
    { label: "Erkek", value: 2 },
  ];

  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Bu alan zorunludur!"),
    //  .min(13, "Cep telefonu hatalıdır."),
    surname: Yup.string().required("Bu alan zorunludur!"),
    email: Yup.string()
      .email("Lütfen geçerli bir e-posta adresi girin")
      .required("Bu alan zorunludur!"),
    birthday: Yup.string().required("Bu alan zorunludur!"),
    gender: Yup.string().required("Bu alan zorunludur!"),
    id: Yup.string()
      .required("Bu alan zorunludur!")
      .min(11, "TC kimlik numarası hatalı.")
      .max(11, "TC kimlik numarası hatalı."),
    password: Yup.string()
      .required("Bu alan zorunludur!")
      .min(3, "Şifre 3 karakterden az olamaz.")
      .max(11, "Şifre 12 karakterden daha uzun olamaz"),
    passwordRepeat: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Şifren eşleşmiyor"
    ),
  });
  const navigation = useNavigation();

  const submitForm = () => {
    console.log("Formdata:", formData);
    validationSchema
      .validate(formData, { abortEarly: false })
      .then((valid) => {
        console.log("Form is valid!");
        console.log(valid);
        castThunkAction(dispatch(UserRegister(formData))).then((res) => {
          if (res) {
            navigation.navigate("Login");
          }
        });
      })
      .catch((err) => {
        console.log("Form is invalid!");
        console.log(err);
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        console.log(newErrors);
        setFormErrors(newErrors);
      });
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          marginTop: wp("15%"),
        }}
      >
        <Text style={styles.title}>Kayıt Ol</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ad"
            onChangeText={(value) => setformData({ ...formData, name: value })}
          />
        </View>
        {FormErrors.name != "" && (
          <View
            style={{
              width: wp("80%"),
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: wp("2%"),
            }}
          >
            <Text
              style={{
                color: "red",
                marginLeft: wp("2%"),
                fontSize: wp("3.5%"),
              }}
            >
              {FormErrors.name}{" "}
            </Text>
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Soyad"
            onChangeText={(value) =>
              setformData({ ...formData, surname: value })
            }
          />
        </View>
        {FormErrors.surname != "" && (
          <View
            style={{
              width: wp("80%"),
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: wp("2%"),
            }}
          >
            <Text
              style={{
                color: "red",
                marginLeft: wp("2%"),
                fontSize: wp("3.5%"),
              }}
            >
              {FormErrors.surname}{" "}
            </Text>
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Kimlik Numarası"
            onChangeText={(value) => setformData({ ...formData, id: value })}
          />
        </View>
        {FormErrors.id != "" && (
          <View
            style={{
              width: wp("80%"),
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: wp("2%"),
            }}
          >
            <Text
              style={{
                color: "red",
                marginLeft: wp("2%"),
                fontSize: wp("3.5%"),
              }}
            >
              {FormErrors.id}{" "}
            </Text>
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Doğum Tarihi"
            onChangeText={(value) =>
              setformData({ ...formData, birthday: value })
            }
          />
        </View>
        {FormErrors.birthday != "" && (
          <View
            style={{
              width: wp("80%"),
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: wp("2%"),
            }}
          >
            <Text
              style={{
                color: "red",
                marginLeft: wp("2%"),
                fontSize: wp("3.5%"),
              }}
            >
              {FormErrors.birthday}{" "}
            </Text>
          </View>
        )}
        <View style={styles.inputView}>
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
            placeholder={!isFocus ? "Select country" : "..."}
            searchPlaceholder="Search..."
            value={formData.gender}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) =>
              setformData({ ...formData, gender: item.value })
            }
          />
        </View>
        {FormErrors.gender != "" && (
          <View
            style={{
              width: wp("80%"),
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: wp("2%"),
            }}
          >
            <Text
              style={{
                color: "red",
                marginLeft: wp("2%"),
                fontSize: wp("3.5%"),
              }}
            >
              {FormErrors.gender}{" "}
            </Text>
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="E-posta"
            onChangeText={(value) => setformData({ ...formData, email: value })}
          />
        </View>
        {FormErrors.email != "" && (
          <View
            style={{
              width: wp("80%"),
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: wp("2%"),
            }}
          >
            <Text
              style={{
                color: "red",
                marginLeft: wp("2%"),
                fontSize: wp("3.5%"),
              }}
            >
              {FormErrors.email}{" "}
            </Text>
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Şifre"
            secureTextEntry={true}
            onChangeText={(value) =>
              setformData({ ...formData, password: value })
            }
          />
        </View>
        {FormErrors.password != "" && (
          <View
            style={{
              width: wp("80%"),
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: wp("2%"),
            }}
          >
            <Text
              style={{
                color: "red",
                marginLeft: wp("2%"),
                fontSize: wp("3.5%"),
              }}
            >
              {FormErrors.password}{" "}
            </Text>
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Şifre Tekrarı"
            secureTextEntry={true}
            onChangeText={(value) =>
              setformData({ ...formData, passwordRepeat: value })
            }
          />
        </View>
        {FormErrors.passwordRepeat != "" && (
          <View
            style={{
              width: wp("80%"),
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: wp("2%"),
            }}
          >
            <Text
              style={{
                color: "red",
                marginLeft: wp("2%"),
                fontSize: wp("3.5%"),
              }}
            >
              {FormErrors.passwordRepeat}{" "}
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.loginBtn} onPress={() => submitForm()}>
          <Text style={styles.logintext}>Kayıt Ol</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{ marginTop: 25 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Hesabınız var mı ?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: wp("30%") }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    top: 15,
    fontSize: 28,
    color: "#778899",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    height: "10%",
    fontWeight: "bold",
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 15,
    width: wp("80%"),
    height: wp("12.5%"),
    marginBottom: wp("2.3%"),
    ...shadow.light,
  },
  TextInput: {
    height: 50,
    color: "black",
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
  TextInputRepeat: {
    height: 50,
    color: "#E0E1DD",
    flex: 1,
    padding: 10,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#E0E1DD",
  },
  loginBtn: {
    width: "80%",
    borderRadius: wp("4%"),
    height: 50,
    marginTop: wp("5%"),
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#778899",
  },
  loginText: {
    color: "black",
    fontSize: 17,
  },
  logintext: {
    color: "white",
    fontSize: 20,
  },
  dropdown: {
    width: wp("80%"),
    height: wp("12.5%"),
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Register;
