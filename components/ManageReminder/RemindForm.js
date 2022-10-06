import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import Button from "../UI/Button";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import { getFormattedDate } from "../../util/date";

function RemindForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [date, setDate] = useState(new Date(1598051730000));

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      display: "spinner",
      minimumDate: new Date(),
      style: styles.asd
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

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
            onChangeText: inputChangeHandler.bind(this, "title"),
          }}
        />
        <Input
          style={styles.bodyInput}
          label="Body"
          invalid={false}
          textInputConfig={{
            value: inputs.body.value,
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, "body"),
          }}
        />
        <View style={styles.DateTimeButtons}>
          <IconButton
            icon="alarm-outline"
            color={GlobalStyles.colors.primaryDark}
            size={46}
            onPress={showTimepicker}
          />
          <IconButton
            icon="calendar-outline"
            color={GlobalStyles.colors.primaryDark}
            size={46}
            onPress={showDatepicker}
          />
        </View>
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
  asd: {
    backgroundColor: "coral",
    color: "#000"
  },
  DateTimeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40
  },
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
