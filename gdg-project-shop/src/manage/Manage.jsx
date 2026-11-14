import Register from "./Register";
import Add from "./Add";
import Delete from "./Delete";

function Manage(){
    return(
        <div className="flex flex-col items-center">
            <Register/>
            <Add/>
            <Delete/>
        </div>
    )
}

export default Manage;
