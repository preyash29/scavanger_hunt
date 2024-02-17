import React from "react";
import { View, Text, ActivityIndicator, Modal } from "react-native";
import Theme from "../../Utils/Theme";

import styles from "./Style";

const LoaderModal = (props) => {
  const { label, modalVisible } = props;

  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalWrap}>
        <ActivityIndicator
          size="large"
          color={Theme.white}
          style={styles.indicator}
        />
        <Text style={styles.txtLoading}>{label}</Text>
      </View>
    </Modal>
  );
};
export default LoaderModal;
