import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";
import Todo from "./components/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("js"); // js, react, ct
  const [editText, setEditText] = useState("");
  const newTodo = {
    id: Date.now(),
    text,
    category,
    isDone: false,
    isEdit: false,
  };
  const addTodo = async () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };
  const setDone = (id) => {
    // 1. todos 에서 클릭한 todo의 id를 매개변수로 받는다.
    // 2. todos 배열에서 해당 id를 가진 요소의 idx를 구한다.
    // 3. todos[idx].isDone 값을 토글링한 후 setTodos 한다.
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };
  const deleteTodo = (id) => {
    // 1. 클릭한 todo의 id를 받아서 idx를 찾는다.
    // 2. todos.splice 로 해당 idx 요소를 제거한 후 setTodos.
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const newTodos = [...todos];
          const idx = newTodos.findIndex((todo) => todo.id === id);
          newTodos.splice(idx, 1);
          setTodos(newTodos);
        },
      },
    ]);
  };
  const editTodo = (id, text) => {
    // id 에 해당하는 배열요소를 찾아서 text 변경
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = text;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  const setEdit = (id) => {
    // id 에 해당하는 배열요소를 찾아서 text 변경
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setCategory("js")}
            style={{
              ...styles.tab,
              backgroundColor: category === "js" ? "#0FBCF9" : "grey",
            }}
          >
            <Text style={styles.tabText}>Javascript</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCategory("react")}
            style={{
              ...styles.tab,
              backgroundColor: category === "react" ? "#0FBCF9" : "grey",
            }}
          >
            <Text style={styles.tabText}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCategory("ct")}
            style={{
              ...styles.tab,
              backgroundColor: category === "ct" ? "#0FBCF9" : "grey",
            }}
          >
            <Text style={styles.tabText}>Coding Test</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            onSubmitEditing={addTodo}
            value={text}
            onChangeText={setText}
            placeholder="Enter your task"
            style={styles.input}
          />
        </View>
        <ScrollView>
          {todos.map((todo) => {
            if (todo.category === category) {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  setDone={setDone}
                  deleteTodo={deleteTodo}
                  setEdit={setEdit}
                  editTodo={editTodo}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    backgroundColor: "#0FBCF9",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "30%",
    alignItems: "center",
  },
  tabText: {
    fontWeight: "600",
  },
  inputWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
