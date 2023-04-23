import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../AuthContext";
import { shadow } from "../../constants/shadow";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { IsUserActive } from "../../store/system/ApiAction";
import { Alert } from "react-native";
import colors from "../../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

function Login() {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [FormErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.system.user);

  const validationSchema = Yup.object({
    email: Yup.string().required("Bu alan zorunludur!"),
    password: Yup.string().required("Bu alan zorunludur!"),
  });

  const checkForm = () => {
    validationSchema
      .validate(FormData, { abortEarly: false })
      .then(() => {
        if (user != null) {
          if (
            FormData.email === user.email &&
            FormData.password === user.password
          ) {
            dispatch(IsUserActive(true));
          } else {
            Alert.alert("Hata", "Kullanıcı adı veya şifre hatalı!");
          }
        } else {
          Alert.alert("Hata", "Kullanıcı adı veya şifre hatalı!");
        }
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

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GİRİŞ</Text>
      <View
        style={[
          styles.inputView,
          {
            borderWidth: FormErrors.email != "" ? 1 : 0,
            borderColor: FormErrors.email != "" ? colors.red : colors.white,
          },
        ]}
      >
        <TextInput
          style={[styles.TextInput]}
          placeholder="E-posta"
          onChangeText={(value) => setFormData({ ...FormData, email: value })}
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
      <View
        style={[
          styles.inputView,
          {
            borderWidth: FormErrors.password != "" ? 1 : 0,
            borderColor: FormErrors.password != "" ? colors.red : colors.white,
          },
        ]}
      >
        <TextInput
          style={[styles.TextInput]}
          placeholder="Şifre"
          secureTextEntry={true}
          onChangeText={(value) =>
            setFormData({ ...FormData, password: value })
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
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Şifremi Unuttum</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => checkForm()}>
        <Text style={styles.loginText}>Giriş</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.logintext}>Hesabınız yok mu?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
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
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "black",
    fontSize: 16,
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
    color: "white",
    fontSize: 20,
  },
  logintext: {
    color: "black",
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  inputError: {
    backgroundColor: "red",
    borderColor: "red",
  },
});

export default Login;
