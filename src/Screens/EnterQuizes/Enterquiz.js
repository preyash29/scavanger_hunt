import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "../../Components/Headers/Headers";
import { db, auth } from "../../Utils/Exports";
import AntDesign from "react-native-vector-icons/AntDesign";
import Theme from "../../Utils/Theme";
import styles from "./Style";
import { RadioButton } from "react-native-paper";
const Enterquiz = ({ props, navigation }) => {
  const [quizno, setquizno] = useState(0);
  const [checked, setChecked] = useState();
  const [correctAns, setcorrectAns] = useState([]);
  const [alldata, setalldata] = useState([]);
  const [loader, Setloader] = useState(false);
  const [result, setResult] = useState(0);

  useEffect(() => {
    Setloader(true);
    const currentUid = auth.currentUser.uid;
    const questions = [];
    const ref = db.ref("Users/" + currentUid).child("/questionData");
    ref.on("value", (snapshot) => {
      if (snapshot.exists()) {
        try {
          snapshot.forEach((doc) => {
            doc.forEach((sDoc) => {
              questions.push(sDoc.val());
            });
          });
          // alert(JSON.stringify(questions, 0, 4));
          setalldata(questions);
        } catch (error) {
          Setloader(false);
          alert(error);
        }
      } else {
        Setloader(false);
      }
    });
  }, []);

  // console.log("RESULT===>", JSON.stringify(alldata[0], 0, 2));

  const getResult = () => {
    let marks = 0;
    alldata.map((item) => {
      if (item.correctAns === item.checked) {
        marks = marks + 1;
      }
    });
    return marks;
  };

  const onsubmit = (index) => {
    setquizno(quizno + 1);
    let data = alldata;
    data[index].checked = checked;
    setalldata(data);
    if (index === alldata.length - 1) {
      console.log("USER SCORE: ", getResult());
      const ref = db
        .ref("Users/")
        .child(auth.currentUser.uid)
        .child("questionData");
      ref
        .set({ alldata })
        .then(() => {
          // alert("Data entered suceesfully");
          navigation.navigate("CorrectAnswerScreen");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const renderItem = ({ item, index }) => {
    if (quizno === index) {
      return (
        <View key={index} style={styles.MainView}>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: Theme.txtMedium2, color: Theme.primary }}>
              Choose Correct Options
            </Text>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.setQuestion}>{item?.Question?.EntQue}</Text>
          </View>
          <View style={styles.option1}>
            <View style={{ width: Theme.wp("70%") }}>
              <Text style={styles.txtSize}>1-: {item?.Question?.Option1}</Text>
            </View>
            <RadioButton
              value={item?.Question?.Option1}
              status={
                checked === item?.Question?.Option1 ? "checked" : "unchecked"
              }
              onPress={() => setChecked(item.Question.Option1)}
            />
          </View>
          <View style={styles.option2}>
            <View style={{ width: Theme.wp("70%") }}>
              <Text style={styles.txtSize}>2-: {item?.Question?.Option2}</Text>
            </View>
            <RadioButton
              value={item?.Question?.Option2}
              status={
                checked === item?.Question?.Option2 ? "checked" : "unchecked"
              }
              onPress={() => setChecked(item?.Question?.Option2)}
            />
          </View>
          <View style={styles.option2}>
            <View style={{ width: Theme.wp("70%") }}>
              <Text style={styles.txtSize}>3-: {item?.Question?.Option3}</Text>
            </View>
            <RadioButton
              value={item?.Question?.Option3}
              status={
                checked === item?.Question?.Option3 ? "checked" : "unchecked"
              }
              onPress={() => setChecked(item?.Question?.Option3)}
            />
          </View>
          <View style={styles.option2}>
            <View style={{ width: Theme.wp("70%") }}>
              <Text style={styles.txtSize}>4-: {item?.Question?.Option4}</Text>
            </View>
            <View>
              <RadioButton
                value={item?.Question?.Option4}
                status={
                  checked === item?.Question?.Option4 ? "checked" : "unchecked"
                }
                onPress={() => setChecked(item?.Question?.Option4)}
              />
            </View>
          </View>

          {index === alldata.length - 1 ? (
            <TouchableOpacity
              style={styles.wrpbtn}
              onPress={() => onsubmit(index)}
            >
              <Text style={{ color: Theme.white }}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.wrpbtn}
              onPress={() => onsubmit(index)}
            >
              <AntDesign
                name="right"
                color="white"
                style={{
                  fontSize: Theme.hp("5%"),
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Header
          label="Your Quiz"
          labelIcon={true}
          onPress={() => navigation.goBack()}
        />
        <View style={{}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            vertical
            pagingEnabled
            data={alldata}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Enterquiz;
