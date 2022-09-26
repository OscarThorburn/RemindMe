import { FlatList } from "react-native";

import RemindItem from "./RemindItem";

function renderRemindItem(itemData) {
  return <RemindItem {...itemData.item} />;
}

function RemindersList({ reminders }) {
  return (
    <FlatList
      data={reminders}
      renderItem={renderRemindItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default RemindersList;
