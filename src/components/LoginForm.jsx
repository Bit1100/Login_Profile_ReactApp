import { useContext } from "react";
import { context } from "../context";
import useInput from "../hooks/userInput";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  let navigate = useNavigate();
  const {
    validateLoginData,
    error,
    setError,
    hasValidated,
    setHasValidated,
  } = useContext(context);

  const { bind: bindUsername, reset: resetUsername } = useInput("");

  const { bind: bindPassword, reset: resetPassword } = useInput("");

  function resetForm() {
    resetUsername();
    resetPassword();
    setHasValidated(false);
  }

  const handleRedirect = () => {
    navigate("../profile");
    setError({ msg: "", errStatus: false, msgClass: "" });
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          validateLoginData(e);
          if (hasValidated) {
            resetForm();
            handleRedirect();
          }
        }}
        className="form flex flex-col items-center"
      >
        <h2 className="heading">Login Form</h2>
        {error.errStatus ? (
          <p className="form-error">{error.msg}</p>
        ) : error.msgClass ? (
          <p className={`form-error ${error.msgClass}`}>{error.msg}</p>
        ) : (
          ""
        )}
        <input
          name="id"
          type="hidden"
          value={new Date().getTime().toString()}
        />
        <input
          name="username"
          type="text"
          {...bindUsername}
          placeholder="Enter your username"
        />
        <input
          name="password"
          type="password"
          {...bindPassword}
          placeholder="Enter your email"
        />
        <div className="confirmation flex justify-betweem items-center">
          <button
            type="submit"
            className={
              error.errStatus
                ? "btn btn-secondary danger"
                : error.msgClass
                ? "btn btn-primary success"
                : "btn btn-secondary"
            }
          >
            {hasValidated ? "Redirect" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
