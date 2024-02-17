import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../Components/Headers/Headers";
import { db, auth } from "../../Utils/Exports";
import Theme from "../../Utils/Theme";
import styles from "./Style";
import { RadioButton } from "react-native-paper";
const CorrectAnswerScreen = ({ props, navigation }) => {
  const [quizno, setquizno] = useState(0);
  const [checked, setChecked] = React.useState();
  const [correctAns, setcorrectAns] = useState([]);
  const [alldata, setalldata] = useState([]);
  const [loader, Setloader] = React.useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    Setloader(true);
    const ref = db
      .ref("Users/")
      .child(auth.currentUser.uid)
      .child("questionData")
      .child("/alldata");
    ref.on("value", (snapshot) => {
      if (snapshot.exists()) {
        try {
          setalldata(Object.values(snapshot.val()));
          let total = 0;
          alldata.map((item, index) => {
            if (item?.checked === item?.Question?.CorrectAnswer)
              total = total + 1;
            // console.log("Your Answer==>", item?.checked);
            // console.log("Correct Answer==>", item?.Question?.CorrectAnswer);
            // console.log(total);
          });
          setTotal(total);
          Setloader(false);
        } catch (error) {
          Setloader(false);
          alert(error);
        }
      } else {
        Setloader(false);
      }
    });
  }, []);

  const renderItem = ({ item, index }) => {
    // alert(JSON.stringify(item, 0, 2));
    return (
      <View key={index} style={styles.MainView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <View>{/* <Text style={{fontSize: 25}}>{item.id}</Text> */}</View>
          <View style={{ alignItems: "center" }}>
            {item?.checked == item?.Question?.CorrectAnswer ? (
              <AntDesign
                name="checkcircle"
                style={{ fontSize: Theme.hp("4%") }}
                color={"green"}
              />
            ) : (
              <AntDesign
                name="closecircle"
                style={{ fontSize: Theme.hp("4%") }}
                color={"red"}
              />
            )}
            {item?.checked == item?.Question?.CorrectAnswer ? (
              <Text
                style={{
                  color:
                    item?.checked == item?.Question?.CorrectAnswer
                      ? "green"
                      : "red",
                  fontSize: Theme.txtSmall,
                }}
              >
                Correct
              </Text>
            ) : (
              <Text
                style={{
                  color:
                    item?.checked == item?.Question?.CorrectAnswer
                      ? "green"
                      : "red",
                  fontSize: Theme.txtSmall,
                }}
              >
                Wrong
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.setQuestion}>{item?.Question?.EntQue}</Text>
        </View>
        <View style={styles.option1}>
          <View style={{ width: Theme.wp("70%") }}>
            <Text style={styles.txtSize}>1- {item?.Question?.Option1}</Text>
          </View>
          <RadioButton
            color={Theme.green}
            value={item?.Question?.Option1}
            status={
              item?.Question?.Option1 == item?.checked ? "checked" : "unchecked"
            }
            // onPress={() => setChecked(item.Option1)}
          />
        </View>
        <View style={styles.option2}>
          <View style={{ width: Theme.wp("70%") }}>
            <Text style={styles.txtSize}>2- {item?.Question?.Option2}</Text>
          </View>
          <RadioButton
            color={Theme.green}
            value={item?.Question?.Option2}
            status={
              item?.Question?.Option2 == item?.checked ? "checked" : "unchecked"
            }
          />
        </View>
        <View style={styles.option2}>
          <View style={{ width: Theme.wp("70%") }}>
            <Text style={styles.txtSize}>3- {item?.Question?.Option3}</Text>
          </View>
          <RadioButton
            color={Theme.green}
            value={item?.Question?.Option3}
            status={
              item?.Question?.Option3 == item?.checked ? "checked" : "unchecked"
            }

            // onPress={() => setChecked(item.Option3)}
          />
        </View>
        <View style={styles.option2}>
          <View style={{ width: Theme.wp("70%") }}>
            <Text style={styles.txtSize}>4- {item?.Question?.Option4}</Text>
          </View>
          <View>
            <RadioButton
              color={Theme.green}
              value={item?.Question?.Option4}
              status={
                item?.Question?.Option4 == item?.checked
                  ? "checked"
                  : "unchecked"
              }
            />
          </View>
        </View>
        <View style={styles.option2}>
          <View style={{ width: Theme.wp("70%") }}>
            <Text style={styles.txtSize}>Your Answer: {item?.checked}</Text>
          </View>
        </View>
        <View style={{ borderWidth: 0.5, marginTop: 30 }}></View>
      </View>
    );
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
            data={alldata}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default CorrectAnswerScreen;
