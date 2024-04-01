/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, FlatList, Text } from "react-native";
import styles from "./Style";
import { RadioButton } from "react-native-paper";
const QuizFlatList = (props) => {
  const { MainData, AnsScreen1, AnsScreen2, QuestionScreen1, QuestionScreen2 } =
    props;

  const [value, setValue] = React.useState("");
  console.log("RadioButton Value ===== ", value);
  return (
    <View
      style={{
        width: "95%",
        alignSelf: "center",
      }}
    >
      <FlatList
        data={MainData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          // console.log('Log', index, item);
          // console.log('Item==', item);

          return (
            <>
              {QuestionScreen1 === true ? (
                <View>
                  <View style={[styles.flexAlign, { paddingLeft: 10 }]}>
                    <Text style={{ color: "black", alignSelf: "center" }}>
                      {index + 1}
                    </Text>

                    <View style={styles.RadioBtnWrapper2}>
                      <Text style={{ color: "black" }}>{item.Question}</Text>
                    </View>
                  </View>

                  {item.QuestionOptions.map((i, ind) => {
                    console.log("Inside Map Function Values ===== ", i);
                    // console.log('I =========== ', i.checked);
                    return (
                      <View>
                        <View style={styles.flexAlign}>
                          <View style={styles.RadioBtnWrapper2}>
                            <RadioButton
                              value={i.checked}
                              key={ind}
                              status={
                                value === i.option ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                setValue(i.option);
                                props.selectedVal(value);
                              }}
                              // onPress={() => (i.option)}
                            />
                            <Text
                              style={{
                                // color:
                                //   i.istrue == true && value !== ''
                                //     ? 'green'
                                //     : 'black',
                                color: "black",
                              }}
                            >
                              {i.option}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                  {/* <Text>fff</Text> */}
                </View>
              ) : null}

              {QuestionScreen2 === true ? <></> : null}

              {AnsScreen1 === true ? (
                <View style={{ marginTop: "10%" }}>
                  <View style={styles.flexAlign}>
                    <Text
                      style={{
                        color: "black",
                        // alignSelf: 'center',
                        paddingLeft: "5%",
                        // marginTop: '4%',
                      }}
                    >
                      {index + 1} {": "}
                    </Text>

                    <View style={styles.RadioBtnWrapper2}>
                      <Text style={{ color: "black" }}>{item.Question}</Text>
                    </View>
                  </View>

                  {item.QuestionOptions.map((i, ind) => {
                    console.log("Inside Map Function Values ===== ", i.option);
                    console.log("I =========== ", i);
                    return (
                      <View style={styles.flexAlign}>
                        <View
                          style={[
                            styles.AnsBox,
                            {
                              borderColor: i.istrue == true ? "green" : "red",

                              borderRadius: 10,
                              borderWidth: 1,
                            },
                          ]}
                        >
                          {/* <RadioButton
                            value={i.checked}
                            key={ind}
                            status={
                              i.option === value ? 'checked' : 'unchecked'
                            }
                          /> */}
                          <Text
                            style={{
                              color: i.istrue == true ? "green" : "red",
                            }}
                          >
                            {(ind = ind + 1)} {": "} {i.option}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                  {/* <Text>fff</Text> */}
                </View>
              ) : null}

              {AnsScreen2 === true ? <></> : null}
            </>
          );
        }}
      />
    </View>
  );
};
export default QuizFlatList;
