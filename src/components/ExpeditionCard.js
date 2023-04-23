import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

const ExpeditionCard = ({
  firmaName,
  fiyat,
  kalkisSaati,
  bosKoltuk,
  koltukTipi,
}) => {
  const navigation = useNavigation();

  return (
    <Card style={styles.containerCard}>
      <Card.Actions style={{}}>
        <Card.Content
          style={{
            display: "flex",
            position: "absolute",
            start: 3,
            borderWidth: 0.4,
            backgroundColor:'#757575',
            borderRadius:5,
          }}
        >
          <Text style={styles.firmaText}>{firmaName}</Text>
        </Card.Content>
        <Card.Content style={{}}>
          <Text style={styles.firmaText}>{koltukTipi}</Text>
        </Card.Content>
        <Card.Content style={{}}>
          <Text style={styles.firmaText}>{bosKoltuk} Bos Koltuk</Text>
        </Card.Content>
      </Card.Actions>

      <Card.Actions>
        <Card.Content style={{}}>
          <Text style={styles.firmaText}>{kalkisSaati}</Text>
        </Card.Content>
        <Card.Content style={{}}>
          <Text style={styles.firmaText}>{fiyat} TL</Text>
        </Card.Content>
        <TouchableOpacity
          style={styles.btnSec}
          onPress={() =>
            navigation.navigate("DetailTicket", {
              firmaName: firmaName,
              koltukTipi: koltukTipi,
              bosKoltuk: bosKoltuk,
              kalkisSaati: kalkisSaati,
              fiyat: fiyat,
            })
          }
        >
          <Text style={styles.cardtext}>Koltuk Seç</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    padding: 5,
    margin: 5,
    backgroundColor: "#778899",
  },
  firmaText: {
    fontSize: 20,
    color: "#E0E1DD",
  },
  cardtext: {
    color:'white',
    fontSize: 15,
    marginHorizontal: 20,
  },
  fiyatText: {
    color: "#E0E1DD",
    fontSize: 18,
  },
  btnSec: {
    backgroundColor:"#757575",
    borderRadius:5,
    borderWidth:0.4,
    padding: 10,
    margin: 5,
  },
});

export default ExpeditionCard;
