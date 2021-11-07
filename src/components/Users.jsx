import { useContext } from "react";
import { context } from "../context";
import { ZERO } from "../constants";

const TabularData = () => {
  const { setFormdata, usersData, setError, setModalActive } = useContext(
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
              const { _id, image, name, dob, religion, height } = user;
              return (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>
                    <img src={image} alt="User Profile Pic" />
                  </td>
                  <td>{name}</td>
                  <td>{dob}</td>
                  <td>{religion}</td>
                  <td>{height}ft</td>
                  <td>
                    <button
                      onClick={() => {
                        setError({ msg: "", errStatus: false, msgClass: "" });
                        setFormdata(user);
                        setModalActive(true);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
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
