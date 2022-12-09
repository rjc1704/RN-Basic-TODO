import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
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

  const addTask = async () => {
    if (text) {
      await setTasks(newTasks);
      setText("");
    }
  };

  const onChangeText = (payload) => {
    setText(payload);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.tabs}>
          <View style={styles.tab}>
            <Text style={styles.tabText}>Javascript</Text>
          </View>
          <View style={{ ...styles.tab, backgroundColor: "grey" }}>
            <Text style={styles.tabText}>React</Text>
          </View>
          <View style={{ ...styles.tab, backgroundColor: "grey" }}>
            <Text style={styles.tabText}>Coding Test</Text>
          </View>
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
            Object.keys(tasks).map((key) => (
              <Task key={key} text={tasks[key].text} />
            ))}
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
