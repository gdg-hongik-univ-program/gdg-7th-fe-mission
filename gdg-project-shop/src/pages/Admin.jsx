import Add from '../components/Add';
import Restock from '../components/Restock';
import Delete from '../components/Delete';

function Admin() {
  return (
    <div className="admin-view flex flex-col gap-8">
      <Add />
      <Restock />
      <Delete />
    </div>
  );
}

export default Admin;
