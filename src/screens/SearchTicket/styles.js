import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { shadow } from "../../constants/shadow";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  ustContainer: {
    width: "100%",
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  araBtn: {
    width: "50%",
    marginBottom: 20,
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#778899",
    color: "#E0E1DD",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dateContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    width: wp("80%"),
  },
  dateView: {
    width: "100%",
    alignItems: "flex-start",
  },
  dateSet: {
    flexDirection: "row",
    margin: wp("5%"),
    justifyContent: "space-around",
    justifyContent: "center",
    alignItems: "center",
  },
  textA: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  textB: {
    color: "white",
    fontSize: 21,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    width: wp("85%"),
    height: wp("12.5%"),
    paddingHorizontal: 8,
    marginBottom: 10,
    ...shadow.light,
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
  inputView: {
    backgroundColor: "white",
    borderRadius: 15,
    width: wp("85%"),
    height: wp("12.5%"),
    marginBottom: wp("2.3%"),
    ...shadow.light,
  },
});

export default styles;
