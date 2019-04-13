import React from "react";
import { View, Text } from "react-native";

import styles from "./style";

const Loading = () => (
  <View style={styles.loading}>
    <Text style={styles.text}>Loading...</Text>
  </View>
);

export default Loading;
