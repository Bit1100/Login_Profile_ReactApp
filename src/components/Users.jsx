import { useContext } from "react";
import { context } from "../context";
import { ZERO } from "../constants";
import { BiEdit } from "react-icons/bi";
import { FaUserSecret } from "react-icons/fa";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";


const TabularData = () => {
  const { setShowLoader,setFormdata, usersData, setError, setModalActive } = useContext(
    context
  );
  const { users } = usersData;
  return (
    <div className="table-wrapper">
      <table>
        <caption>LoggedIn Users </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>DateOfBirth</th>
            <th>Religion</th>
            <th>Height</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > ZERO &&
            users.map((user) => {
              const { _id, name, dob, religion, height } = user;
              return (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>
                    <FaUserSecret size="3rem" />
                  </td>
                  <td>{name}</td>
                  <td>{dob}</td>
                  <td>{religion}</td>
                  <td>{height}ft</td>
                  <td>
                    <Tippy
                      delay={400}
                      placement="right"
                      content={<h3>Edit your Profile</h3>}
                    >
                      <button
                        onClick={() => {
                          setError({ msg: "", errStatus: false, msgClass: "" });
                          setFormdata(user);
                          setShowLoader(true);
                          setModalActive(true);
                        }}
                        className="btn btn-primary"
                      >
                        <BiEdit size="3rem" />
                      </button>
                    </Tippy>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TabularData;
