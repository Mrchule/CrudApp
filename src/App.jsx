import React, { useEffect, useState } from "react";
import { data } from "./data";
import "./App.css";

export default function App() {
  const [items, setItems] = useState(data);
  const [formData, setFormData] = useState({ id: "", first_name: "", last_name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearData = () => {
    setFormData({ id: "", first_name: "", last_name: "", email: "" });
  };

  const saveData = () => {
    const updatedItems = items.map((item) => {
      if (item.id === formData.id) {
        return { ...item, first_name: formData.first_name, last_name: formData.last_name, email: formData.email };
      }
      return item;
    });
    setItems(updatedItems);
    clearData();
  };

  const addData = () => {
    if(formData.id=="" && formData.first_name=="" && formData.email==""){
      alert("please enter all data");
      return;
    }
    const newItems = [...items, formData];
    setItems(newItems);
    clearData();
  };

  const editItem = (id) => {
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setFormData(selectedItem);
    }
  };

  const deleteItem = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <input className="form-control mt-1" type="text" placeholder="Enter ID" name="id" value={formData.id} onChange={handleChange} />
        <input className="form-control mt-1" type="text" placeholder="Enter First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
        <input className="form-control mt-1" type="text" placeholder="Enter Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
        <input className="form-control mt-1" type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} />
        <button className="btn btn-primary" onClick={addData}>Add</button>
        <button className="btn btn-primary" onClick={saveData}>Update</button>
        <button className="btn btn-primary" onClick={clearData}>Clear</button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sl.</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>
                <button className="btn btn-success m-1" onClick={() => editItem(item.id)}>Edit</button>
                <button className="btn btn-danger m-1" onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
