import { useContext } from "react";
import { context } from "../context";
import useInput from "../hooks/userInput";

const Form = () => {
  let {
    formdata,
    setFormdata,
    updateUserData,
    error,
    setError,
    setModalActive,
  } = useContext(context);

  const { bind: bind_Id, reset: reset_Id } = useInput(formdata["_id"]);
  const { bind: bindName, reset: resetName } = useInput(formdata["name"]);
  const { bind: bindDob, reset: resetDob } = useInput(formdata["dob"]);
  const { bind: bindReligion, reset: resetReligion } = useInput(
    formdata["religion"]
  );
  const { bind: bindHeight, reset: resetHeight } = useInput(formdata["height"]);

  function resetLocalState() {
    reset_Id();
    resetName();
    resetDob();
    resetReligion();
    resetHeight();
  }

  return formdata &&
    Object.keys(formdata).length === 0 &&
    formdata.constructor === Object ? (
    ""
  ) : (
    <div className="container">
      <form
        onSubmit={updateUserData}
        className="form flex flex-col items-center"
      >
        {error.errStatus ? <p className="form-error">{error.msg}</p> : ""}
        <input name="id" type="text" {...bind_Id} disabled />
        <input name="image" type="file" placeholder="Upload your image" />
        <input
          name="name"
          type="text"
          {...bindName}
          placeholder="Enter your Full Name"
        />
        <input
          name="dob"
          type="date"
          {...bindDob}
          placeholder="Enter your DoB"
        />
        <input
          name="height"
          type="string"
          {...bindHeight}
          placeholder="Enter your height in feet"
        />
        <input
          name="religion"
          type="text"
          placeholder="Enter your Religion"
          {...bindReligion}
        />
        <div className="confirmation flex justify-betweem items-center">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            onClick={() => {
              setFormdata({});
              resetLocalState();
              setError({ msg: "", errStatus: false });
              setModalActive(false);
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
