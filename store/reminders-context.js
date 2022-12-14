import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RemindersContext = createContext({
  reminders: [],
  addReminder: ({ title, body, remindTime }) => {},
  deleteReminder: (id) => {},
  updateReminder: (id, { title, body, remindTime }) => {},
});

function RemindersReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableReminderIndex = state.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      const updatableReminder = state[updatableReminderIndex];
      const updatedItem = { ...updatableReminder, ...action.payload.data };
      const updatedReminder = [...state];
      updatedReminder[updatableReminderIndex] = updatedItem;
      return updatedReminder;
    case "DELETE":
      return state.filter((reminder) => reminder.id !== action.payload);
    default:
      return state;
  }
}

function RemindersContextProvider({ children }) {
  const [remindersState, dispatch] = useReducer(
    RemindersReducer,
    DUMMY_REMINDERS
  );

  useEffect(() => {
    storeData(remindersState);
  }, [remindersState]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      console.log("error trying to store async")
    }
  };

  function addReminder(reminderData) {
    dispatch({ type: "ADD", payload: reminderData });
  }

  function deleteReminder(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateReminder(id, reminderData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: reminderData } });
  }

  const value = {
    reminders: remindersState,
    addReminder: addReminder,
    deleteReminder: deleteReminder,
    updateReminder: updateReminder,
  };

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
}

export default RemindersContextProvider;

const DUMMY_REMINDERS = [
  {
    id: "1",
    title: "Take pills1",
    body: "Remember to take your medicin Perlodox",
    remindTime: new Date("2022-09-29T15:55:00"),
  },
  {
    id: "2",
    title: "Take pills2",
    body: "Remember to take your medicin Perlodox",
    remindTime: new Date("2022-09-27T15:55:00"),
  },
  {
    id: "3",
    title: "Take pills3",
    body: "Remember to take your medicin Perlodox",
    remindTime: new Date("2022-09-29T17:55:00"),
  },
  {
    id: "4",
    title: "Call Oscar",
    body: "Call Oscar About the pizza",
    remindTime: new Date("2022-09-18T17:00:00"),
  },
  {
    id: "5",
    title: "Feed the cat",
    body: "Give frank 2kg of dry food",
    remindTime: new Date("2022-09-25T07:27:00"),
  },
  {
    id: "6",
    title: "Pickup Felicia",
    body: "Hanna needs to be picked up at the airport",
    remindTime: new Date("2022-10-27T12:23:00"),
  },
  {
    id: "7",
    title: "Buy Milk",
    body: "Wer are out of milk",
    remindTime: new Date("2022-10-29T17:00:00"),
  },
  {
    id: "8",
    title: "Take pills",
    body: "Remember to take your medicin Perlodox",
    remindTime: new Date("2022-10-21T15:55:00"),
  },
];
