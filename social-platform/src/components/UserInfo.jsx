import { displayObject } from "./Tools"

const UserInfo = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      <h2 className="title">Personal Information</h2>
      <ul>{displayObject(currentUser)}</ul>
    </div>
  );
}
export default UserInfo;