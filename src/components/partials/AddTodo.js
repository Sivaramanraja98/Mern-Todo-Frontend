import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create } from "../../services/api";

const AddTodo = ({ showModal, setShowModal, setRefreshList }) => {
  const [todoDesc, setTodoDesc] = useState("");

  const handleSubmit = async () => {
    if (todoDesc === "") {
      toast.error("Todo is required");
    } else {
      try {
        const result = await create({ desc: todoDesc });
        if (result.status === 200 && result.data.status === 200) {
          toast.success(result.data.message);
          setRefreshList(new Date());
          setTodoDesc(""); // Reset todoDesc after successful submission
          setShowModal(false);
        } else {
          toast.error(result.data.message);
        }
      } catch (error) {
        console.error("Error adding todo:", error);
        toast.error("An error occurred while adding todo.");
      }
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
        >
          {/* Modal content */}
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New TODO</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Form to add new todo */}
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter todo..."
                    value={todoDesc}
                    onChange={(e) => setTodoDesc(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodo;
