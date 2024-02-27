import React, { useEffect, useState } from "react";
import Header from "./partials/Header";
import Todo from "./partials/Todo";
import AddTodo from "./partials/AddTodo";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTodoList, getToken } from "../services/api";
import { SiAddthis } from "react-icons/si";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!getToken()) {
        navigate("/login");
        return;
      }

      try {
        const { status, data } = await getTodoList();
        if (status === 200 && data.status === 200) {
          setTodoList(data.data.todos.reverse());
        }
      } catch (error) {
        console.error("Error fetching todo list:", error);
      }
    };

    fetchData();
  }, [navigate, refreshList]);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredList(todoList);
    } else {
      const filtered = todoList.filter(todo =>
        todo.desc.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [todoList, searchText]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <div className="container">
        <div className="row justify-content-center mt-3">
          {filteredList.map(todo => (
            <Todo key={todo.id} todo={todo} setRefreshList={setRefreshList} />
          ))}
        </div>
      </div>
      <div style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
        <SiAddthis size={42}/> ADD
        </Button>
      </div>

      <AddTodo
        showModal={showModal}
        setShowModal={setShowModal}
        setRefreshList={setRefreshList}
      />
    </div>
  );
};

export default Home;
