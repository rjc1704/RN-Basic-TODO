import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import Task from "./components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [tasks, setTasks] = useState(null);
  const [category, setCategory] = useState("js"); // js, react, ct
  const [text, setText] = useState("");
  const [editingText, setEditingText] = useState("");
  const onChangeEditingText = (payload) => {
    setEditingText(payload);
  };

  const newTasks = {
    ...tasks,
    [Date.now()]: {
      text,
      isDone: false,
      isEditing: false,
      category,
    },
  };

  const addTask = async () => {
    if (text) {
      setTasks(newTasks);
      await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
      setText("");
    }
  };

  const deleteTask = (key) => {
    Alert.alert("Task 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "Cancel",
        style: "destructive",
      },
      {
        text: "OK. Delete it.",
        onPress: async () => {
          const newTasks = { ...tasks };
          delete newTasks[key];
          setTasks(newTasks);
          await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
        },
      },
    ]);
  };

  const onChangeText = (payload) => {
    setText(payload);
  };

  const setDone = async (key) => {
    const newTasks = { ...tasks };
    newTasks[key].isDone = !tasks[key].isDone;
    setTasks(newTasks);
    await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
  };

  const setEditing = async (key) => {
    const newTasks = { ...tasks };
    newTasks[key].isEditing = !tasks[key].isEditing;
    setTasks(newTasks);
    await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
  };

  const editText = async (key) => {
    const newTasks = { ...tasks };
    newTasks[key].text = editingText;
    setTasks(newTasks);
    await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
    setEditing(key);
  };

  const setTheCategory = async (category) => {
    await AsyncStorage.setItem("@category", category);
    setCategory(category);
  };

  useEffect(() => {
    const setTodos = async () => {
      const theTasks = await AsyncStorage.getItem("@tasks");
      const theCategory = await AsyncStorage.getItem("@category");
      setTasks(JSON.parse(theTasks));
      setCategory(theCategory);
    };
    setTodos();
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setTheCategory("js")}
            style={{
              ...styles.tab,
              backgroundColor: category === "js" ? "#0FBCF9" : "grey",
            }}
          >
            <Text style={styles.tabText}>Javascript</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTheCategory("react")}
            style={{
              ...styles.tab,
              backgroundColor: category === "react" ? "#0FBCF9" : "grey",
            }}
          >
            <Text style={styles.tabText}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTheCategory("ct")}
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
            value={text}
            onChangeText={onChangeText}
            returnKeyType="done"
            onSubmitEditing={addTask}
            placeholder="Enter your task"
            style={styles.input}
          />
        </View>
        <ScrollView>
          {tasks &&
            Object.keys(tasks).map((key) => {
              if (category === tasks[key].category) {
                return (
                  <Task
                    key={key}
                    isEditing={tasks[key].isEditing}
                    setEditing={() => setEditing(key)}
                    editText={() => editText(key)}
                    onChangeEditingText={onChangeEditingText}
                    isDone={tasks[key].isDone}
                    setDone={() => setDone(key)}
                    deleteTask={() => deleteTask(key)}
                    text={tasks[key].text}
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
