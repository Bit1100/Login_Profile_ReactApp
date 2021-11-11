import { useContext, useState } from "react";
import { context } from "../context";
import useInput from "../hooks/userInput";
import { FaUserCircle, FaBroadcastTower } from "react-icons/fa";
import { GiBodyHeight, GiCancel } from "react-icons/gi";
import { BiErrorCircle } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { ImHappy } from "react-icons/im";
import { AiFillSave } from "react-icons/ai";
import { MdPermIdentity } from "react-icons/md";
import { IconContext } from "react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  let {
    formdata,
    setFormdata,
    updateUserData,
    error,
    setError,
    setModalActive,
  } = useContext(context);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const { bind: bind_Id, reset: reset_Id } = useInput(formdata["_id"]);
  const { bind: bindName, reset: resetName } = useInput(formdata["name"]);
  const { bind: bindReligion, reset: resetReligion } = useInput(
    formdata["religion"]
  );
  const { bind: bindHeight, reset: resetHeight } = useInput(formdata["height"]);

  function resetLocalState() {
    reset_Id();
    resetName();
    resetReligion();
    resetHeight();
  }

  return formdata &&
    Object.keys(formdata).length === 0 &&
    formdata.constructor === Object ? (
    ""
  ) : (
    <div className="container">
      <IconContext.Provider value={{ className: "icons" }}>
        <form
          onSubmit={updateUserData}
          className="form flex flex-col items-center"
        >
          {error.errStatus ? (
            <p className="form-error">
              <BiErrorCircle />
              {error.msg}
            </p>
          ) : error.msgClass ? (
            <p className={`form-error ${error.msgClass}`}>
              <ImHappy />
              {error.msg}
            </p>
          ) : (
            ""
          )}
          <div className="form-item">
            <MdPermIdentity />
            <input name="id" type="text" {...bind_Id} disabled />
          </div>
          <div className="form-item">
            <FaUserCircle />
            <input
              name="name"
              type="text"
              {...bindName}
              placeholder="Enter your Full Name"
            />
          </div>
          <div className="form-item">
            <BsFillCalendarDateFill />
            <DatePicker
              name="dob"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="Pp"
              closeOnScroll
              minDate={new Date().setFullYear(new Date().getFullYear() - 31)}
              maxDate={new Date()}
              filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
              placeholderText="Enter your Date of Birth"
              isClearable
              showTimeSelect
              showYearDropDown
              scrollableYearDropDown
              required
            />
          </div>
          <div className="form-item">
            <GiBodyHeight />
            <input
              name="height"
              type="string"
              {...bindHeight}
              placeholder="Enter your height in feet"
            />
          </div>
          <div className="form-item">
            <FaBroadcastTower />
            <input
              name="religion"
              type="text"
              placeholder="Enter your Religion"
              {...bindReligion}
            />
          </div>
          <div className="confirmation flex justify-betweem items-center">
            <button
              type="submit"
              className={
                error.errStatus
                  ? "btn btn-primary danger"
                  : error.msgClass
                  ? "btn btn-primary success"
                  : "btn btn-primary"
              }
            >
              Save
              <AiFillSave />
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
              <GiCancel />
            </button>
          </div>
        </form>
      </IconContext.Provider>
    </div>
  );
};

export default Form;
