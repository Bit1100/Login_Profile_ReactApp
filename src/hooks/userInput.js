import { useState, useEffect } from "react";

const UserInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (e) => {
        setValue(e.target.value);
      },
    },
  };
};

export default UserInput;
