import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Task({ text, setDone, isDone, deleteTask }) {
  return (
    <View style={styles.task}>
      <Text
        style={{
          textDecorationLine: isDone ? "line-through" : "none",
        }}
      >
        {text}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={setDone}>
          <AntDesign name="checksquare" size={24} color="black" />
        </TouchableOpacity>
        <Feather
          style={{ marginLeft: 10 }}
          name="edit"
          size={24}
          color="black"
        />
        <TouchableOpacity onPress={deleteTask}>
          <AntDesign
            style={{ marginLeft: 10 }}
            name="delete"
            size={24}
            color="black"
          />
        </TouchableOpacity>
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
