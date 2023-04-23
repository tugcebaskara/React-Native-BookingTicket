import * as React from "react";
import { View } from "react-native";
import { List, Divider, useTheme } from "react-native-paper";

const Modal = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  const theme = useTheme();
  const [nereden, setNereden] = React.useState("");
  const [nereye, setNereye] = React.useState("");

  return (
    <View style={{ width: "80%" }}>
      <List.Section>
        <List.Accordion
          titleStyle={{ color: theme.colors.textColor }}
          style={{ color: theme.colors.secondColor,borderRadius:50 }}
          title={nereden || "Nereden"}
        >
          <List.Item
            style={{
              backgroundColor: theme.colors.threeColor,
              borderWidth: 1,
            }}
            titleStyle={{ color: theme.colors.textColor }}
            title="Sinop"
            onPress={() => setNereden("Ankara")}
          />
          <List.Item
            style={{
              backgroundColor: theme.colors.threeColor,
              borderWidth: 1,
            }}
            titleStyle={{ color: theme.colors.textColor }}
            title="İstanbul"
            onPress={() => setNereden("İstanbul")}
          />

          <List.Item
            style={{
              backgroundColor: theme.colors.threeColor,
              borderWidth: 1,
            }}
            titleStyle={{ color: theme.colors.textColor }}
            title="Antalya"
            onPress={() => setNereden("Bolu")}
          />
        </List.Accordion>

        <Divider
          horizontalInset
          style={{ margin: 8 }}
          theme={{ colors: theme.colors.background }}
        />

        <List.Accordion
          titleStyle={{ color: theme.colors.textColor }}
          style={{ color: theme.colors.secondColor }}
          title={nereye || "Nereye"}
          expanded={expanded}
          onPress={handlePress}
        >
          <List.Item
            style={{
              backgroundColor: theme.colors.threeColor,
              borderWidth: 1,
            }}
            titleStyle={{ color: theme.colors.textColor }}
            onPress={() => setNereye("Ankara")}
            title="Sinop"
          />
          <List.Item
            style={{
              backgroundColor: theme.colors.threeColor,
              borderWidth: 1,
            }}
            titleStyle={{ color: theme.colors.textColor }}
            title="İstanbul"
            onPress={() => setNereye("İstanbul")}
          />
          <List.Item
            style={{
              backgroundColor: theme.colors.threeColor,
              borderWidth: 1,
            }}
            titleStyle={{ color: theme.colors.textColor }}
            title="Antalya"
            onPress={() => setNereye("Bolu")}
          />
        </List.Accordion>
      </List.Section>
    </View>
  );
};

export default Modal;
