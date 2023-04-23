import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { Container } from './styles';
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { IsUserActive, UserInfo } from "../../store/system/ApiAction";
const ProfileScreen = () => {
  const dispatch = useDispatch();

  const logout = () => {
   // dispatch(UserInfo([]));
    dispatch(IsUserActive(false));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <View style={[styles.horizontalLine, { marginTop: wp("1.%") }]}></View>
      <TouchableOpacity style={styles.listView} onPress={logout}>
        <View style={styles.leftSide}>
          <AntDesign name="logout" style={styles.icon} />
        </View>
        <View style={styles.center}>
          <Text style={styles.listTitle}>Çıkış Yap</Text>
        </View>
        <View style={styles.rightSide}>
          <MaterialIcons name="arrow-forward-ios" style={styles.rightIcon} />
        </View>
      </TouchableOpacity>
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  horizontalLine: {
    width: wp("90%"),
    alignSelf: "center",
    height: 0.5,
    backgroundColor: colors.dark,
  },
  contentView: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: colors.white,
    marginHorizontal: 0,
    // borderTopRightRadius: wp('13%'),
    // borderTopLeftRadius: wp('13%')
  },
  listView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("1%"),
  },
  leftSide: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp("2%"),
    flex: 0.1,
  },
  center: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 0.8,
    padding: 10,
    marginHorizontal: wp("3%"),
  },
  rightSide: {
    flex: 0.1,
  },
  listTitle: {
    color: colors.text_color,
    fontSize: wp("3.5%"),
  },
  icon: {
    fontSize: wp("5.5%"),
    color: colors.secondry_text_color,
  },
  rightIcon: {
    fontSize: wp("3.5%"),
    color: colors.secondry_text_color,
  },
});
