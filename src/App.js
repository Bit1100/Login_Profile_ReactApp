import { useState, useEffect } from "react";
import { getUsers, setUsers } from "./utils/storage";
import { contextProvider as Provider } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./assets/styles/main.scss";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_DECIMAL_LENGTH,
  ZERO,
} from "./constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [usersData, setUsersData] = useState({
    users: [],
    fetchStatus: false,
  });
  const [error, setError] = useState({ msg: "", errStatus: false });
  const [hasValidated, setHasValidated] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [modalActive, setModalActive] = useState(false);

  // Getting the data from localStorage on Page Refresh
  useEffect(() => {
    // Get the data stored in localStorage on Page Refresh
    setUsersData({
      ...usersData,
      users: getUsers().users,
      fetchStatus: getUsers().fetchStatus,
    });

    // Get the ursersData from the array/remote for the first time only
    !getUsers().fetchStatus &&
      setUsersData({ ...usersData, users: [], fetchStatus: true });
  }, [setUsersData]);

  // Storing the new data into the localStorage
  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  //  Success msg Popup method
  const redirectPopup = (msg) => {
    toast.info(<h2>{msg}...</h2>, {
      position: "top-right",
      autoClose: 2200,
      closeOnClick: true,
      theme: "colored",
      rtl: true,
      pauseOnHover: false,
      newestOnTop: true,
    });
  };
  // Aet Error if it exists while form validation
  function showError(error) {
    const { msg, errStatus, msgClass } = error;
    setError({ msg, errStatus, msgClass });
  }

  // Validate Login Data
  function validateLoginData(e) {
    // Regex Patterns
    const usernamePattern = new RegExp(
      `[a-zA-Z0-9]{${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}}`
    );

    const passwordPattern = new RegExp(
      `(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[.!@#%^&]).{${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}}`
    );

    e.preventDefault();

    const { id, username, password } = e.target;

    let _users = usersData.users;

    let validUserdata = Object.create({});

    // Form Validation
    /* Check for Empty Fields */
    if (!username.value.trim() || !password.value.trim()) {
      showError({ msg: "All Fields Required", errStatus: true });
      return;
    } else {
      showError({ msg: "", errStatus: false, msgClass: "" });
    }

    /* Username Validation */
    if (!usernamePattern.test(username.value.trim())) {
      showError({
        msg: "Username must be at least 5 and at most 15 characters long",
        errStatus: true,
        msgClass: "",
      });
      return;
    } else if (_users.some((item) => item.username === username.value.trim())) {
      showError({
        msg: "Username already taken",
        errStatus: true,
        msgClass: "",
      });
      return;
    } else {
      validUserdata.username = username.value;
      showError({ msg: "", errStatus: false, msgClass: "" });
    }

    /* Password Validation */
    if (!passwordPattern.test(password.value.trim())) {
      showError({
        msg: `Invalid Password. It must include at least 8 characters, 1 lowercase, 1 uppercase, 1 special character.`,
        errStatus: true,
        msgClass: "",
      });
      return;
    } else {
      validUserdata.password = password.value;
      showError({
        msg: "Validation Complete",
        errStatus: false,
        msgClass: "success",
      });
    }

    setHasValidated(true);

    validUserdata = {
      ...validUserdata,
      _id: id.value,
      name: "",
      image: "/images/Bit.jpg",
      religion: "",
      dob: "",
      height: "",
    };

    // Add the new valid user to the list
    _users.push(validUserdata);
    setUsersData({ ...usersData, users: _users });
  }

  // Update the user data in the table after form validation
  function updateUserData(e) {
    // Regex Patterns
    const namePattern = new RegExp(
      `[a-zA-Z0-9]{${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}}`
    );

    const heightPattern = new RegExp(
      `^([1-9]|10)\.?([0-9]{${ZERO},${MAX_DECIMAL_LENGTH}})$`
    );

    let _usersData = usersData.users;
    e.preventDefault();
    let { id, name, dob, religion, height } = e.target;

    /* Update the data if any*/
    let updateUser = _usersData.find((item) => item._id === id.value);
    const updateUserIndex = _usersData.findIndex(
      (item) => item._id === id.value
    );

    // Form Validation
    /* Check for Empty Fields */
    if (
      !name.value.trim() ||
      !dob.value.trim() ||
      !religion.value.trim() ||
      !height.value.trim()
    ) {
      showError({ msg: "All Fields Required", errStatus: true });
      return;
    } else {
      showError({ msg: "", errStatus: false, msgClass: "" });
    }

    /* Name Validation */
    if (!namePattern.test(name.value.trim())) {
      showError({
        msg: "Name must be at least 5 and at most 20 characters long",
        errStatus: true,
      });
      return;
    } else {
      updateUser.name = name.value;
      showError({ msg: "", errStatus: false, msgClass: "" });
    }

    /* PAN Card Validation */
    if (!heightPattern.test(height.value)) {
      showError({ msg: "Impractical Height", errStatus: true });
      return;
    } else {
      updateUser.height = height.value;
      updateUser.dob = dob.value;
      updateUser.religion = religion.value;
      showError({
        msg: "Profile Updated",
        errStatus: false,
        msgClass: "success",
      });
    }

    // Replace the old value by new if updated
    _usersData.splice(updateUserIndex, 1, updateUser);
    setUsersData({ ...usersData, users: _usersData });
  }

  return (
    <Router>
      <Provider
        value={{
          redirectPopup,
          formdata,
          setFormdata,
          updateUserData,
          validateLoginData,
          hasValidated,
          setHasValidated,
          error,
          setError,
          usersData,
          modalActive,
          setModalActive,
          showLoader,
          setShowLoader
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
