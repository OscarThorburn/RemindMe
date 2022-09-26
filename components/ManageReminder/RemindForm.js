import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import { getFormattedDate } from "../../util/date";

function RemindForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    body: {
      value: defaultValues ? defaultValues.body : "",
      isValid: true,
    },
    remindTime: {
      value: defaultValues ? getFormattedDate(defaultValues.remindTime) : "",
    },
  });

  function submitHandler() {}

  function inputChangeHandler(inputIdentifier, enteredValue) {}

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <Input
          style={styles.titleInput}
          label="Title"
          invalid={false}
          textInputConfig={{
            value: inputs.title.value,
          }}
        />
        <Input
          style={styles.bodyInput}
          label="Body"
          invalid={false}
          textInputConfig={{
            value: inputs.body.value,
            multiline: true,
          }}
        />
        <Input
          style={styles.dateInput}
          label="YYYY-MM-DD HH:MM"
          invalid={false}
          textInputConfig={{
            value: inputs.remindTime.value,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default RemindForm;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
