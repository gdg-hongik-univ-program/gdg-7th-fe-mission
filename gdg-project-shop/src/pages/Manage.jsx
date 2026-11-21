import Register from "../components/manage/Register";
import Add from "../components/manage/Add";
import Delete from "../components/manage/Delete";

function Manage({ refresh }) {
  return (
    <div className="flex flex-col items-center">
      <Register refresh={refresh} />
      <Add refresh={refresh} />
      <Delete refresh={refresh} />
    </div>
  );
}

export default Manage;
