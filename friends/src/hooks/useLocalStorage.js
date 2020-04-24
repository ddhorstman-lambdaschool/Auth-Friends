import React from "react";
export default function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = React.useState(() => {
    const item = window.localStorage.getItem(key);
    //null indicates the item wasn't found by
    if (item === null || item === undefined) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } else return JSON.parse(item);
  });

  const setValueLocalStorage = newValue => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };
  return [value, setValueLocalStorage];
}
