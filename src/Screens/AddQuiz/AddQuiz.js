import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Theme from "../../Utils/Theme";
import styles from "./Style";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../Components/Headers/Headers";
import { db, auth } from "../../Utils/Exports";

const reviewSchema = yup.object({
  QueQty: yup
    .number()
    .required()
    .test(
      //test only get value in true and false
      "is-num-1-5",
      "Questions must be a number between 1-5",
      (val) => {
        return parseInt(val) < 6 && parseInt(val) >= 1;
      }
    ),
});
const reviewSchema1 = yup.object({
  EntQue: yup
    .string()
    .required("Question field not empty")
    .max(100, "Question required minimum 10 strings"),
  Option1: yup
    .string()
    .required("Option 1 is must field")
    .max(40, "Charater exceed"),

  Option2: yup
    .string()
    .required("Option 2 is must field")
    .max(40, "Charater exceed"),
  Option3: yup
    .string()
    .required("Option 3 is must field")
    .max(40, "Charater exceed"),
  Option4: yup
    .string()
    .required("Option 4 is must field")
    .max(40, "Charater exceed"),

  CorrectAnswer: yup
    .string()
    .required("Answer is must field")
    .max(40, "Charater exceed"),
  // CorrectAnswer2: yup
  //   .string()
  //   .required('Answer is must field')
  //   .max(20, 'Charater exceed'),
});

const AddQuiz = ({ props, navigation }) => {
  const [entQue, setEntQue] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [addMore, setAddMore] = useState(false);
  const [loader, Setloader] = React.useState(false);
  const [quesData, setQuesData] = useState([
    {
      id: 1,
      EntQue:
        "Question:1: Hello What you are doing right know? hgghgh jjghjhjh hgghj hggj gygghghgh ghghghghgh",
      Option1: "pl",
      Option2: "gr",
      Option3: "gl",
      Option4: "pr",
      checked: "",
      correctAns: "gr",
    },
    {
      id: 2,
      EntQue: "Question:2: Hello What you are doing right know? DDDDDDDDDD",
      Option1: "bl",
      Option2: "cl",
      Option3: "br",
      Option4: "st",
      checked: "",
      correctAns: "br",
    },
    {
      id: 3,
      EntQue: "Question:3: Hello What you are doing right know?",
      Option1: "br",
      Option2: "ca",
      Option3: "dr",
      Option4: "bl ",
      checked: "",
      correctAns: "ca",
    },
    {
      id: 4,
      EntQue: "Question:4: Hello What you are doing right know?",
      Option1: "fl",
      Option2: "sk",
      Option3: "fr ",
      Option4: "sl",
      checked: "",
      correctAns: "fl",
    },
    {
      id: 5,
      EntQue: "Question:5: Hello What you are doing right know?",
      Option1: "sp",
      Option2: "pl",
      Option3: "pr ",
      Option4: "st",
      checked: "",
      correctAns: "st",
    },
  ]);

  const [quesData1, setQuesData1] = useState([]);
  useEffect(() => {
    Setloader(true);
    // onSubmitData();
    // const ref = db.ref('test/questionData');
    // ref.set(quesData);
    // const ref1 = db.ref('test/CorrectAnserData');
    // ref1.set(CorrectAnserData);
    onSubmitData();
  }, []);

  // const onSubmitData = () => {
  //   try {
  //     const ref = db.ref('test/questionData');
  //     console.log(4);
  //     // ref.update({quesData});
  //     alert('Data Entered');
  //     Setloader(false);
  //   } catch (error) {
  //     Setloader(false);
  //     alert(error);
  //   }
  // };

  const onSubmitData = (
    EntQue,
    option1,
    option2,
    option3,
    option4,
    CorrectAnswer,
    EnterAnswer
  ) => {
    const currentUid = auth.currentUser.uid;
    const ref = db.ref("Users/" + currentUid).child("/questionData");
    var newquizes = db
      .ref("Users/" + currentUid)
      .child("/questionData")
      .push().key;
    // console.log(2);
    ref.once("value", (snapshot) => {
      // console.log(3);
      if (snapshot.val()) {
        let quizes = [];
        quizes = Object.values(snapshot.val());
        quizes.push({
          Question: EntQue,
          FirstOption: option1,
          SecondOption: option2,
          ThirdOption: option3,
          ForthOption: option4,
          Coreect: CorrectAnswer,
        });
        ref.set(quizes);
        // console.log(4);
        // console.log('New Quiz', quizes);
      } else {
        ref.child(newquizes).set({
          Question: EntQue,
          FirstOption: option1,
          SecondOption: option2,
          ThirdOption: option3,
          ForthOption: option4,
          Coreect: CorrectAnswer,
        });
      }
    });

    // db.ref('Users/' + currentUid)
    //   .child('/Custom-Coords')
    //   .child('info')
    //   .set({
    //     Postname: item2,
    //   });
  };

  return (
    <View style={styles.MainView}>
      <Header
        label="Add Quiz"
        labelIcon={true}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        {addMore === true ? (
          <>
            <View style={{ alignItems: Theme.align, marginTop: "30%" }}>
              <Image
                source={require("../../Assets/tick.jpg")}
                style={styles.imgTick}
              />
              <Text style={styles.txtPost}>Quiz Added Successfully</Text>
            </View>
            <View style={styles.flexJustify}>
              <TouchableOpacity
                style={styles.btnGoBack}
                onPress={() => navigation.navigate("HomePage")}
              >
                <Text style={styles.txtGoBack}>Exit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.btnGoBack, backgroundColor: Theme.primary }}
                onPress={() => {
                  // setAddMore(false);
                  // setCount(count + 1);
                }}
              >
                <Text
                  style={{
                    ...styles.txtGoBack,
                    color: Theme.txtWhite,
                    textAlign: Theme.align,
                  }}
                >
                  Add More Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.setWidth}>
            <View
              style={{
                width: "95%",
                alignSelf: "center",
              }}
            >
              <Text style={styles.txtQueQty}>Enter Your Question ?</Text>
              <Formik
                initialValues={{
                  EntQue: entQue,
                  Option1: option1,
                  Option2: option2,
                  Option3: option3,
                  Option4: option4,
                }}
                validationSchema={reviewSchema1} //check validation
                onSubmit={(values, actions) => {
                  // action is use  for call reset form
                  onSubmitData(values);
                  actions.resetForm();
                }}
              >
                {(props) => (
                  <>
                    <TextInput
                      placeholder="Input your Question "
                      style={styles.inputTxtPlace}
                      // maxLength={30}
                      placeholderTextColor={"gray"}
                      multiline={true}
                      value={props.values.EntQue}
                      onChangeText={props.handleChange("EntQue")}
                    />
                    <Text style={styles.errorTxt}>
                      {props.touched.EntQue && props.errors.EntQue}
                    </Text>

                    <View style={styles.flexAlign}>
                      <Text style={styles.txtOption}>Option-1 :</Text>
                      <View>
                        <TextInput
                          placeholder="Option 1"
                          style={styles.inputTxtOption}
                          placeholderTextColor="gray"
                          value={props.values.Option1}
                          onChangeText={props.handleChange("Option1")}
                        />
                        <Text style={{ ...styles.errorTxt, left: 10 }}>
                          {props.touched.Option1 && props.errors.Option1}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.flexAlign}>
                      <Text style={styles.txtOption}>Option-2 :</Text>
                      <View>
                        <TextInput
                          placeholder="Option 2"
                          style={styles.inputTxtOption}
                          // maxLength={30}
                          placeholderTextColor="gray"
                          value={props.values.Option2}
                          onChangeText={props.handleChange("Option2")}
                        />
                        <Text style={{ ...styles.errorTxt, left: 10 }}>
                          {props.touched.Option2 && props.errors.Option2}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.flexAlign}>
                      <Text style={styles.txtOption}>Option-3 :</Text>
                      <View>
                        <TextInput
                          placeholder="Option 3"
                          style={styles.inputTxtOption}
                          // maxLength={30}
                          placeholderTextColor="gray"
                          value={props.values.Option3}
                          onChangeText={props.handleChange("Option3")}
                        />
                        <Text style={{ ...styles.errorTxt, left: 10 }}>
                          {props.touched.Option3 && props.errors.Option3}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.flexAlign}>
                      <Text style={styles.txtOption}>Option-4 :</Text>
                      <View>
                        <TextInput
                          placeholder="Option 4"
                          style={styles.inputTxtOption}
                          // maxLength={30}
                          placeholderTextColor="gray"
                          value={props.values.Option4}
                          onChangeText={props.handleChange("Option4")}
                        />
                        <Text style={{ ...styles.errorTxt, left: 10 }}>
                          {props.touched.Option4 && props.errors.Option4}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.flexAlign}>
                      <Text style={styles.txtOption}>Answer :{""}</Text>
                      <View>
                        <TextInput
                          placeholder="Answer Of Question "
                          style={styles.inputTxtOption}
                          // maxLength={30}
                          placeholderTextColor="gray"
                          value={props.values.CorrectAnswer}
                          onChangeText={props.handleChange("CorrectAnswer")}
                        />
                        <Text style={{ ...styles.errorTxt, left: 10 }}>
                          {props.touched.CorrectAnswer &&
                            props.errors.CorrectAnswer}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        // _validation();
                        props.handleSubmit();
                        // navigation.goBack();
                      }}
                      style={styles.btnEnter}
                    >
                      <Text style={styles.txtEnter}>Add</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default AddQuiz;
