import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./Style";
import * as Animatable from "react-native-animatable";
const HomePageFL = ({ navigation, data }) => {
  return (
    <View style={{ flex: 1 ,backgroundColor:'red'}}>

      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <Animatable.View
              style={styles.setWidth}
              animation="fadeInUpBig"
              delay={index * 100}
              useNativeDriver
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.flexJustify1}
                onPress={() => {
                  if (item?.City !== (undefined && null))
                    navigation.navigate("UserSideMap", {
                      PostId: item?.PostId,
                      UserId: item?.UserId,
                    });
                }}
              >
                <View style={styles.alignFlexJustify}>
                  <View>
                    <Text style={styles.txtName}>
                      City :{" "}
                      <Text
                        style={{
                          ...styles.txtName,
                          fontStyle: "italic",
                          fontSize: 15,
                          fontWeight: "normal",
                        }}
                      >
                        {/* {item.TutorCity} */}
                        {item?.City}
                      </Text>
                    </Text>
                    {/* <Text style={{ color: "black", fontWeight: "100" }}>
                              Created By
                              <Text
                                style={[styles.txtName, { fontWeight: "100" }]}
                              >
                                {" "}
                                {item.Name}
                              </Text>
                            </Text> */}
                    <Text style={{ ...styles.txtName }}>
                      StartingAddress :{" "}
                      <Text style={{ fontWeight: "normal" }}>
                        {item?.StartingAddress}
                      </Text>
                    </Text>
                    <Text style={{ ...styles.txtName }}>
                      EndingAddress :{" "}
                      <Text style={{ fontWeight: "normal" }}>
                        {item?.EndingAddress}
                      </Text>
                    </Text>
                    {/* <Text
                              style={{ ...styles.txtName, fontWeight: "100" }}
                            >
                              Street : {item.Street}
                            </Text> */}
                  </View>
                  {/* <Text style={styles.txtTime}>{item.Time}</Text> */}
                </View>
              </TouchableOpacity>
            </Animatable.View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default HomePageFL;
