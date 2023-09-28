import  { useEffect, useState } from "react";
// Define a custom React hook called useLocalStorage, which is generic and takes two parameters:
// 'key' for the localStorage key and 'initialValue' for the initial state value.
function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Initialize a state variable 'value' and its corresponding 'setValue' function
  // using the useState hook. The initial state is computed by a callback function.
  const [value, setValue] = useState<T>(() => {
    // Inside the callback function:
    // 1. Attempt to retrieve a value from localStorage using the provided 'key'.
    const jsonValue = localStorage.getItem(key) || null;

    // 2. Log the retrieved value to the console.
    console.log(jsonValue);

    // 3. If a value is found in localStorage, parse it from JSON format.
    if (jsonValue) return JSON.parse(jsonValue);

    // 4. If no value is found in localStorage, check whether 'initialValue' is a function.
    if (typeof initialValue === "function") {
      // 5. If 'initialValue' is a function, call it to generate the initial value.
      return (initialValue as () => T)();
    } else {
      // 6. If 'initialValue' is not a function, use it directly as the initial value.
      return initialValue;
    }
  });

  // Use the useEffect hook to set a new value in localStorage whenever 'key' or 'value' changes.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return an array containing the current 'value' and 'setValue' function
  // with TypeScript type annotations [typeof value, typeof setValue].
  return [value, setValue] as [typeof value, typeof setValue];
}

export default useLocalStorage;

/**
 *Now, let's explain the TypeScript-specific aspects:

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {

This line defines a TypeScript generic function useLocalStorage. The <T> syntax indicates that it can work with values of any type T.
It takes two parameters: key, which is a string representing the localStorage key, and initialValue, which can be either of type T or a function returning T.
const [value, setValue] = useState<T>(() => {

Here, we use the useState hook to declare a state variable value of type T and its corresponding setter function setValue.
The initial state value is computed using a callback function that returns a value of type T.
Inside the callback function provided to useState, we perform various actions:

Retrieve a value from localStorage using the provided key.
Log the retrieved value to the console.
Parse the value from JSON format if it exists in localStorage.
Check whether initialValue is a function and call it if it is, or use it directly if it's not.
useEffect(() => { ... }, [key, value]);

The useEffect hook is used to set a new value in localStorage whenever the key or value changes. The dependency array [key, value] ensures that the effect runs when either of these values changes.
return [value, setValue] as [typeof value, typeof setValue];

Finally, the hook returns an array containing the current value and the setValue function with TypeScript type annotations [typeof value, typeof setValue]. This helps TypeScript understand the types of these values correctly.
 */
