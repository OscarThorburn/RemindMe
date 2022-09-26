import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

function RemindItem({ id, title, body, remindTime }) {
  const navigation = useNavigation();

  function remindPressHandler() {
    navigation.navigate("ManageReminder", {
      reminderId: id,
    });
  }

  return (
    <Pressable
      onPress={remindPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.remindItem}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
        </View>
        <View style={styles.remindTimeContainer}>
          <Text style={styles.remindTime}>{getFormattedDate(remindTime)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default RemindItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  remindItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.secondaryDark,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 9,
    elevation: 3,
    shadowColor: GlobalStyles.colors.primaryLight,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: "white",
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  remindTimeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  remindTime: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
