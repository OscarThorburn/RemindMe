import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

import RemindForm from "../components/ManageReminder/RemindForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { RemindersContext } from "../store/reminders-context";

function ManageReminder({ route, navigation }) {
  const reminderCtx = useContext(RemindersContext);
  const editedReminderId = route.params?.reminderId;
  const isEditing = !!editedReminderId;

  const selectedReminder = reminderCtx.reminders.find(
    (reminder) => reminder.id === editedReminderId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Reminder" : "Add Reminder",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    reminderCtx.deleteReminder(editedReminderId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(reminderData) {
    if (isEditing) {
      reminderCtx.updateReminder(editedReminderId, reminderData);
    } else {
      reminderCtx.addReminder(reminderData);
    }
    console.log(reminderData)
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <RemindForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedReminder}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={"red"}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primaryGrey,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primaryDark,
    alignItems: "center",
  },
});
