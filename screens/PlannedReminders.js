import { View, Text } from "react-native";
import { useContext } from "react";
import { RemindersContext } from "../store/reminders-context";

function PlannedReminders() {
  const remindersCtx = useContext(RemindersContext);

  const plannedReminders = remindersCtx.reminders.filter((reminder) => {
    const today = new Date();

    return reminder.remindTime >= today;
  });

  return (
    <View>
      <Text>Planned Screen</Text>
    </View>
  );
}

export default PlannedReminders;
