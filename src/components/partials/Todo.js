import React from "react";
import moment from "moment";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { Delete, Markcompleted } from "../../services/api";

const Todo = ({ todo, setRefreshList }) => {
  const handleDelete = async () => {
    try {
      const result = await Delete({
        todo_id: todo._id,
      });

      if (result.data.status === 200) {
        setRefreshList(new Date());
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("An error occurred while deleting todo.");
    }
  };
  const handleMark = async () => {
    try {
      const result = await Markcompleted({
        todo_id: todo._id, 
      });

      if (result.data.status === 200) {
        setRefreshList(new Date());
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error Marking Status of todo:", error);
      toast.error("An error occurred while marking todo.");
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
      <Card className={todo.isCompleted ? "border-success" : "border-danger"}>
      <Card.Header>
      {todo.isCompleted ? <TiTick color="green" size={20}/> : <ImCross color="red" size={20}/>}
      <h6 style={{padding:'5px'}}>{todo.isCompleted ? "Completed" : "Not Completed"}</h6>
    </Card.Header>
        <Card.Body>
          <Card.Title style={{height:'100%'}}>{todo.desc}</Card.Title>
          <Card.Text>{moment(todo.date).fromNow()}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="danger" onClick={handleDelete}>
          <MdDelete size={24}/>Delete
          </Button>
          <Button variant="primary" onClick={handleMark}>
            {todo.isCompleted ? "Uncomplete" : "Complete"}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Todo;