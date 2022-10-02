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

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const reminderData = {
      title: inputs.title.value,
      body: inputs.body.value,
      remindTime: new Date("2022-10-29T17:00:00"),
    };

    onSubmit(reminderData);
  }

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <Input
          style={styles.titleInput}
          label="Title"
          invalid={false}
          textInputConfig={{
            value: inputs.title.value,
            onChangeText: inputChangeHandler.bind(this, 'title'),
          }}
        />
        <Input
          style={styles.bodyInput}
          label="Body"
          invalid={false}
          textInputConfig={{
            value: inputs.body.value,
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'body'),
          }}
        />
        <Input
          style={styles.dateInput}
          label="2022-10-21T15:55:00"
          invalid={false}
          textInputConfig={{
            placeholder: "2022-10-21T15:55:00",
            value: inputs.remindTime.value,
            onChangeText: inputChangeHandler.bind(this, 'remindTime'),
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
