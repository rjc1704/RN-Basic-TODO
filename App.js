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
} from "react-native";
import Task from "./components/Task";

import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { dbService } from "./firebase";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [category, setCategory] = useState(""); // js, react, ct
  const [text, setText] = useState("");

  const addTask = async () => {
    if (text) {
      // addDoc 이용 시 doc.id는 임의로 자동생성 된다는 점!
      // 만약 doc.id를 지정해서 추가하고 싶다면 setDoc 을 이용할 것!
      await addDoc(collection(dbService, "tasks"), {
        text,
        isDone: false,
        isEditing: false,
        category,
        createdAt: Date.now(),
      });
      setText("");
    }
  };

  const onChangeText = (payload) => {
    setText(payload);
  };

  const setTheCategory = async (category) => {
    await setDoc(doc(dbService, "currentCategory", "category"), {
      category,
    });
    setCategory(category);
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "tasks"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      // firestore의 tasks 라는 콜렉션(폴더) 내에 변화가 생길 때 마다 실행되는 이벤트리스너
      const newTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskList(newTasks);
    });

    const getCategory = async () => {
      const categorySnap = await getDoc(
        doc(dbService, "currentCategory", "category")
      );

      setCategory(categorySnap.data().category || "js");
    };
    getCategory();
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
          {taskList.map((task) => {
            if (category === task.category) {
              return <Task key={task.id} task={task} />;
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
