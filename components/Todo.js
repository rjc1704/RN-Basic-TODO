import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Todo({ todo, setDone, deleteTodo, setEdit, editTodo }) {
  const [newText, setNewText] = useState("");
  const inputRef = useRef(null);
  return (
    <View key={todo.id} style={styles.task}>
      {todo.isEdit ? (
        <TextInput
          autoFocus={true}
          style={{ backgroundColor: "white", flex: 1 }}
          onSubmitEditing={() => editTodo(todo.id, newText)}
          value={newText}
          placeholder={todo.text}
          onChangeText={setNewText}
          ref={inputRef}
        />
      ) : (
        <Text
          style={{
            textDecorationLine: todo.isDone ? "line-through" : "none",
          }}
        >
          {todo.text}
        </Text>
      )}

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => setDone(todo.id)}>
          <AntDesign name="checksquare" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setEdit(todo.id);
            setNewText("");
            if (inputRef.current) inputRef.current.focus();
          }}
        >
          <Feather
            style={{ marginLeft: 10 }}
            name="edit"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
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
