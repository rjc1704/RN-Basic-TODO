import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tabs from "./components/Tabs";
import Todo from "./components/Todo";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "./firebase";

export default function App() {
  // delete todo
  // 삭제 이모티콘 터치 시 해당 todo 삭제
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState(""); // js, react, ct
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  const newTodo = {
    // id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
    createdAt: Date.now(),
  };

  const addTodo = async () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
    await addDoc(collection(dbService, "todos"), newTodo);
  };

  const deleteTodo = (id) => {
    // 1. id 값을 받아서 해당 배열 요소를 제외한 나머지를 새로운 배열로 받는다.
    // 2. setTodos
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소 클릭!"),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
          await deleteDoc(doc(dbService, "todos", id));
        },
      },
    ]);
  };

  const setEdit = async (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
    await updateDoc(doc(dbService, "todos", id), {
      isEdit: newTodos[idx].isEdit,
    });
  };

  const editTodo = async (id) => {
    // 1. id 값받아서 해당 배열의 요소를 찾는다. idx 찾기
    // 2. todos[idx].text = editText;
    // const newTodos = [...todos];
    // const idx = newTodos.findIndex((todo) => todo.id === id);
    // newTodos[idx].text = editText;
    // newTodos[idx].isEdit = false;
    // setTodos(newTodos);
    await updateDoc(doc(dbService, "todos", id), {
      text: editText,
      isEdit: false,
    });
  };

  const setDone = async (id) => {
    // 1. id를 매개변수로 받는다.
    // 2. id에 해당하는 배열의 요소를 찾는다.
    // 3. 그 배열의 요소의 isDone 값을 토글링한 후에 setTodos.
    // const newTodos = [...todos];
    const idx = todos.findIndex((todo) => todo.id === id);
    // newTodos[idx].isDone = !newTodos[idx].isDone;
    // setTodos(newTodos);
    try {
      await updateDoc(doc(dbService, "todos", id), {
        isDone: !todos[idx].isDone,
      });
    } catch (err) {
      console.log("err:", err);
    }
  };

  const setCat = async (cat) => {
    setCategory(cat);
    // await AsyncStorage.setItem("category", cat);
    await updateDoc(doc(dbService, "category", "currentCategory"), {
      category: cat,
    });
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "todos"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTodos = snapshot.docs.map((doc) => {
        const newTodo = {
          id: doc.id,
          ...doc.data(),
        };
        return newTodo;
      });
      setTodos(newTodos);
    });

    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, "category", "currentCategory")
      );
      setCategory(snapshot.data().category ?? "js");
    };
    getCategory();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Tabs setCat={setCat} category={category} />
        <View style={styles.inputWrapper}>
          <TextInput
            onSubmitEditing={addTodo}
            onChangeText={setText}
            value={text}
            placeholder="Enter your task"
            style={styles.input}
          />
        </View>
        <ScrollView>
          {todos.map((todo) => {
            if (category === todo.category) {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  setEditText={setEditText}
                  editText={editText}
                  editTodo={editTodo}
                  setDone={setDone}
                  setEdit={setEdit}
                  deleteTodo={deleteTodo}
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
