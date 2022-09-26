import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function RemindForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  function submitHandler() {}

  return (
    <View style={styles.buttons}>
      <Button style={styles.button} onPress={onCancel}>
        Cancel
      </Button>
      <Button style={styles.button} onPress={submitHandler}>
        {submitButtonLabel}
      </Button>
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
