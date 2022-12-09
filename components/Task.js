import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Task({ text }) {
  return (
    <View style={styles.task}>
      <Text>{text}</Text>
      <View style={{ flexDirection: "row" }}>
        <AntDesign name="checksquare" size={24} color="black" />
        <Feather
          style={{ marginLeft: 10 }}
          name="edit"
          size={24}
          color="black"
        />
        <AntDesign
          style={{ marginLeft: 10 }}
          name="delete"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
