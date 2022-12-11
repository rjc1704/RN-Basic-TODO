import { useState } from "react";
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

export default function App() {
  const [tasks, setTasks] = useState(null);
  const [category, setCategory] = useState("js"); // js, react, ct
  const [text, setText] = useState("");

  const newTasks = {
    ...tasks,
    [Date.now()]: {
      text,
      isDone: false,
      isEditing: false,
      category,
    },
  };

  const addTask = () => {
    if (text) {
      setTasks(newTasks);
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
        onPress: () => {
          const newTasks = { ...tasks };
          delete newTasks[key];
          setTasks(newTasks);
        },
      },
    ]);
  };

  const onChangeText = (payload) => {
    setText(payload);
  };

  const setDone = (key) => {
    const newTasks = { ...tasks };
    newTasks[key].isDone = !tasks[key].isDone;
    setTasks(newTasks);
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
