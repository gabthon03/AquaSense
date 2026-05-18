import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import styles from "../styles/HomeStyle"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
    <Image style={styles.img}
  source={require('../../assets/icon.png')}
    /> 
      <Text>aaaaaaaaaaaaaa</Text>


      <StatusBar style="auto" />
    </View>
  );
}

