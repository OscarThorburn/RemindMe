import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import Button from "../UI/Button";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import { IsValidTile } from "../../util/validation";

function RemindForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [date, setDate] = useState(new Date());

  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    body: {
      value: defaultValues ? defaultValues.body : "",
      isValid: true,
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
      timeZoneOffsetInMinutes: 0,
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
      remindTime: date,
    };

    const titleIsValid = IsValidTile(reminderData.title)
    
    if(!titleIsValid){
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          body: curInputs.body,          
        };
      });
      return;
    }
    onSubmit(reminderData);
  }

  

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <Input
          style={styles.titleInput}
          label="Title"
          invalid={!inputs.title.isValid}
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
