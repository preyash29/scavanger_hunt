import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import styles from "./Style";
import Header from "../../Components/Headers/Headers";
import { db, auth } from "../../Utils/Exports";
import QuizFlatList from "../../Components/FlatLists/QuizFlatList/QuizFlatList";

const UserDoQuiz = (props) => {
  const [valuePresence, SetvaluePresence] = useState("");
  console.log("valuePresence ==== ", valuePresence);
  const [page, Setpage] = useState("");

  const [FlatListValue, SetFlatListValue] = useState([]);

  // console.log('FlatListValue=======', FlatListValue);
  const [AnsScreen, SetAnsScreen] = React.useState(false);
  // const [checked, setChecked] = React.useState('');

  // console.log(checked);

  //AddAnother
  const [addMore, setAddMore] = useState(false);

  const HandleOption = (val) => {
    // console.warn(val);
    setOption1(val);
  };

  const UserInputValue = (value) => {
    console.log("User Ki Value ======== ", value);
  };

  const Countpage = (index) => {
    Setpage(index + 1);
  };
  // console.warn(option1);
  const renderPagination = (index, total, context) => {
    // Countpage(index);

    return (
      <View style={styles.paginationStyle}>
        <Text style={{ color: "grey", paddingTop: 5 }}>
          <Text style={styles.paginationText}>{index + 1}</Text>/{total}
        </Text>
      </View>
    );
  };
  const getValues = async () => {
    const currentUid = auth.currentUser.uid;
    const ref = db
      .ref("Users")
      .child(currentUid)
      .child("Custom-Coords")
      .child("1")
      .child("Quiz");
    // .child('Question-Page-1');

    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        console.log("Data From FireBAse================", Object.values(data));
        SetFlatListValue(Object.values(snapshot.val()));

        console.log("FlatList=>>>", FlatListValue);
        // console.log('Data---------------', FlatListValue);

        // Object.values(snapshot.val()).map(item => {
        //   console.log('For Each', item);
        // });
      } else {
      }
    });
  };
  useEffect(() => {
    getValues();
  }, []);

  const setCheck = (value, index) => {
    console.log("CheckItems", value);
    SetvaluePresence(value);
  };

  return (
    <View style={styles.MainView}>
      <ScrollView>
        <Header
          label="Quiz for post"
          labelIcon={true}
          onPress={() => navigation.goBack()}
        />

        {AnsScreen === true ? (
          <>
            <View
              style={{
                width: "95%",
                alignSelf: "center",
                paddingVertical: "5%",
              }}
            >
              <QuizFlatList
                AnsScreen1={true}
                MainData={FlatListValue}
                // fetchUserValue={UserInputValue}
                selectedVal={setCheck}
              />
            </View>
          </>
        ) : (
          <View style={styles.setWidth}>
            <Swiper
              // style={styles.wrapper}
              renderPagination={renderPagination}
              showsButtons
              buttonWrapperStyle={{
                flexDirection: "row",
                position: "absolute",
                top: "30%",
                padding: 5,

                // paddingHorizontal: 20,
                paddingTop: "30%",
              }}
              loop={false}
            >
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  paddingVertical: "5%",
                }}
              >
                <View style={{}}>
                  <Text style={styles.txtQueQty}>Answer the questions !</Text>
                </View>

                <QuizFlatList
                  QuestionScreen1={true}
                  MainData={FlatListValue}
                  selectedVal={setCheck}
                />
                {valuePresence == "" ? (
                  <></>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        SetAnsScreen(true);
                      }}
                      style={styles.btnEnter}
                    >
                      <Text style={styles.txtEnter}>Submit</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </Swiper>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default UserDoQuiz;
