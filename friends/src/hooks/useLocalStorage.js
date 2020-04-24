import React from "react";
/**
 * This hooks works similarly to useState, except that it caches values
 * in localStorage and can retrieve a value stored in a previous session,
 * adding data persistence.
 * NOTE: All values will be stringified, be careful when accessing them directly.
 * @param {string} key The key to be used in localStorage
 * @param {any} initialValue (Optional) The initial value
 */
export default function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = React.useState(() => {
    const item = window.localStorage.getItem(key);
    //null indicates the item wasn't found by
    if (item === null || item === undefined) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } else return JSON.parse(item);
  });
  /**
   * Updates the value both in useState (internally) and localStorage.
   * @param {any} newValue The updated value
   */
  const setValueLocalStorage = newValue => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };
  return [value, setValueLocalStorage];
}
