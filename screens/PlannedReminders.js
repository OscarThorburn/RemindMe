import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { RemindersContext } from "../store/reminders-context";
import RemindersList from "../components/RemindersOutput/RemindersList";
import { GlobalStyles } from "../constants/styles";

function PlannedReminders() {
  const remindersCtx = useContext(RemindersContext);

  const plannedReminders = remindersCtx.reminders.filter((reminder) => {
    const today = new Date();

    return reminder.remindTime >= today;
  });

  const sortedplannedReminders = plannedReminders
    .map((obj) => {
      return { ...obj, date: new Date(obj.remindTime) };
    })
    .sort((a, b) => a.date - b.date);

  return (
    <View style={styles.container}>
      <RemindersList reminders={sortedplannedReminders} />
    </View>
  );
}

export default PlannedReminders;

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
