import Register from "./Register";
import Add from "./Add";
import Delete from "./Delete";

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
