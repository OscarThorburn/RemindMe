import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { RemindersContext } from "../store/reminders-context";
import RemindersList from "../components/RemindersOutput/RemindersList";
import { GlobalStyles } from "../constants/styles";

function HistoricReminders() {
  const remindersCtx = useContext(RemindersContext);

  const historicReminders = remindersCtx.reminders.filter((reminder) => {
    const today = new Date();

    return reminder.remindTime <= today;
  });

  const sortedHistoricReminders = historicReminders
    .map((obj) => {
      return { ...obj, date: new Date(obj.remindTime) };
    })
    .sort((a, b) => a.date - b.date);

  return (
    <View style={styles.container}>
      <RemindersList reminders={sortedHistoricReminders} />
    </View>
  );
}

export default HistoricReminders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primaryGrey,
  },
  infoText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginTop: 32,
  },
});
