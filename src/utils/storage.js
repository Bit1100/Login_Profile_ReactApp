export const getUsers = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  const fetchStatus = JSON.parse(localStorage.getItem("fetchStatus"));
  return {
    users,
    fetchStatus,
  };
};

export const setUsers = (usersData) => {
  localStorage.setItem("users", JSON.stringify(usersData.users));
  localStorage.setItem("fetchStatus", JSON.stringify(usersData.fetchStatus));
};
