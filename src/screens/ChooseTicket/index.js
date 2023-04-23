import React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
import ExpeditionCard from "../../components/ExpeditionCard";
import { Card } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../constants/colors";
import { useDispatch } from "react-redux";
import { SeatList, TicketData } from "../../store/system/ApiAction";

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function ChooseTicket({ route, navigation }) {
  const { voyage } = route.params;

  console.log("voyage", voyage);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();

  const onChoose = (item) => {
    dispatch(TicketData(item));
    dispatch(SeatList(item.fullSeat));
    navigation.navigate("DetailTicket", {
      company: item.company,
      chairType: "2+2",
      emptyChair: item.emptySeat,
      time: item.time,
      price: item.price,
      fullSeat: item.fullSeat,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Animated.FlatList
        data={voyage}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const pacityinputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.9),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: pacityinputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                width: wp("90%"),
                height: wp("40%"),
                shadowOpacity: 0.3,
                shadowRadius: 20,
                opacity,
                transform: [{ scale }],
              }}
            >
              <TouchableOpacity
                onPress={onChoose.bind(this, item)}
                style={styles.containerCard}
              >
                <View></View>
                <Card.Actions
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: wp("80%"),
                  }}
                >
                  <Card.Content
                    style={{
                      display: "flex",
                      start: 3,
                      borderWidth: 0.4,
                      width: wp("40%"),
                      height: wp("10%"),
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: colors.primary,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={[styles.firmaText, { color: colors.white }]}>
                      {item.company}
                    </Text>
                  </Card.Content>
                  <Card.Content>
                    <Text style={styles.firmaText}>
                      Bos Koltuk : {item.emptySeat}
                    </Text>
                  </Card.Content>
                </Card.Actions>

                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: wp("80%"),
                    padding: 5,
                  }}
                >
                  <View style={{}}>
                    <Text style={styles.firmaText}>
                      Kakış Zamanı:{item.time}
                    </Text>
                  </View>
                  <Text>-</Text>
                  <View style={{}}>
                    <Text style={styles.firmaText}>
                      Ücret : {item.price} TL
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: wp("80%"),
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: wp("4.5%") }}>
                    Sefer Tarihi:{" "}
                    {new Date(item.startDate).toLocaleDateString()}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  firmaText: {
    fontSize: wp("4.5%"),
    color: colors.black,
  },
  cardtext: {
    color: "white",
    fontSize: 15,
    marginHorizontal: 20,
  },
  fiyatText: {
    color: "#E0E1DD",
    fontSize: 18,
  },
  containerCard: {},
  btnSec: {
    backgroundColor: "#757575",
    borderRadius: 5,
    borderWidth: 0.4,
    padding: 10,
    margin: 5,
  },
});
export default ChooseTicket;
