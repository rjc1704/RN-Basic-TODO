import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { dbService } from "../firebase";

export default function Task({ task: { id, text, isDone, isEditing } }) {
  const [editingText, setEditingText] = useState("");
  const deleteTask = () => {
    Alert.alert("Task 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "Cancel",
        style: "destructive",
      },
      {
        text: "OK. Delete it.",
        onPress: async () => {
          await deleteDoc(doc(dbService, "tasks", id));
        },
      },
    ]);
  };

  const onChangeEditingText = (payload) => {
    setEditingText(payload);
  };

  const setDone = async () => {
    await updateDoc(doc(dbService, "tasks", id), {
      isDone: !isDone,
    });
  };
  const setEditing = async () => {
    await updateDoc(doc(dbService, "tasks", id), {
      isEditing: !isEditing,
    });
  };

  const editText = async () => {
    // 수정 텍스트를 입력했을 경우만 수정처리
    if (editingText) {
      await updateDoc(doc(dbService, "tasks", id), {
        text: editingText,
      });
    }
    setEditing();
  };

  return (
    <View style={styles.task}>
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          autoFocus
          maxLength={15}
          onSubmitEditing={editText}
          placeholder={text}
          onChangeText={onChangeEditingText}
        />
      ) : (
        <Text
          style={{
            textDecorationLine: isDone ? "line-through" : "none",
          }}
        >
          {text}
        </Text>
      )}

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={setDone}>
          <AntDesign name="checksquare" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={setEditing}>
          <Feather
            style={{ marginLeft: 10 }}
            name="edit"
            size={24}
            color="black"
          />
        </TouchableOpacity>
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
  editInput: {
    backgroundColor: "white",
    flex: 1,
  },
});
