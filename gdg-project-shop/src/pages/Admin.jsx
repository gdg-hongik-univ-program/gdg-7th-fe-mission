import Add from '../components/Add';
import Restock from '../components/Restock';
import Delete from '../components/Delete';

function Admin({ update }) {
  return (
    <div className="admin-view flex flex-col gap-8">
      <Add update={update} />
      <Restock update={update} />
      <Delete update={update} />
    </div>
  );
}

export default Admin;
