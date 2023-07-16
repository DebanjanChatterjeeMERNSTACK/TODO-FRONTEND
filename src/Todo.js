
import React, { useEffect, useState } from "react";
import { BsX, BsPencil, BsTrash } from "react-icons/bs";

const Todo = () => {
    const [inputs, setInputs] = useState({});
    const [data, SetData] = useState([])
    const [idd, setIdd] = useState()
    const [togal, setTogal] = useState(false)
    const [close, setClose] = useState(false)
    const [deletee, setDelete] = useState(false)

    const [count, setCount] = useState(1)
    const [showPage, setshowPage] = useState(5)
    const value = showPage * count
    const values = value - showPage

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value, id: new Date().getTime().toString() })
    }

    const handleSubmit = () => {
        fetch("http://localhost:9000/create", {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: { "Content-Type": "application/json", }
        })
        setInputs("")



    }

    useEffect(() => {
        fetch("http://localhost:9000/read")
            .then(err => err.json())
            .then(json => SetData(json))
    }, [data])


    const handleSave = () => {
        const { username, email, address, phone } = inputs
        fetch("http://localhost:9000/update", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                address: address,
                phone: phone,
                id: idd
            }),
            headers: { "Content-Type": "application/json", }
        })
        setClose(false)
        setInputs("")
        setTogal(false)
    }

    const handleEdit = (id) => {
        const update = data.filter((even) => {
            return even.id === id
        })
        setClose(true)
        setTogal(true)
        setIdd(id)
        setInputs({
            username: update[0].username,
            email: update[0].email,
            address: update[0].address,
            phone: update[0].phone
        })
    }

    const handleDelete = (id) => {
        fetch("http://localhost:9000/delete", {
            method: "POST",
            body: JSON.stringify({ id: id }),
            headers: { "Content-Type": "application/json", }
        })
        setInputs("")
        setTogal(false)
    }

    const handleDeleted = () => {
        fetch("http://localhost:9000/removeall", {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((json) => alert(json.message))
        setDelete(false)
    }
    const handleCancel = () => {
        setInputs("")
        setDelete(false)
    }
    const handleAdd = () => {
        setClose(true)
    }
    const handleCross = () => {
        setClose(false)
        setDelete(false)
    }
    const handleDeletedform = () => {
        setDelete(true)
    }





    const handleNext = () => {
        if (Math.ceil(data.length / showPage) === count) {
            setCount(count)
        } else {
            setCount(count + 1)
        }
    }
    const handlePrivics = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <>
            <div className="header">
                <div className="header-con">
                    <div className="header-text">
                        <h6 className="manage">Manage Employees</h6>
                    </div>
                    <div className="header-btn">
                        <button type="button" className="btn btn-danger" onClick={handleDeletedform}>Delete</button>
                        <button type="button" className="btn btn-success" onClick={handleAdd}>Add New Employee</button>
                    </div>
                </div>
            </div>



            <div className={`${close === false ? "form1" : "form"}`}>
                <div className="add-form">
                    <div className="from-head">
                        <p>Add Employee</p>
                        <a onClick={handleCross}><BsX /></a>
                    </div>
                    <hr />
                    <div className="from-fill">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text"
                                className="form-control"
                                id="formGroupExampleInput"
                                name="username" value={inputs.username || ""} onChange={handlechange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name="email" value={inputs.email || ""} onChange={handlechange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea className="form-control "
                                id="exampleFormControlTextarea1"
                                rows="4"
                                cols="4"
                                name="address" value={inputs.address || ""} onChange={handlechange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name="phone" value={inputs.phone || ""} onChange={handlechange} />
                        </div>
                    </div>
                    <hr />
                    <div className="from-head">
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                        {togal === true ? <input type={"submit"} value="Save" className="btn btn-success" onClick={handleSave} /> : <input type={"submit"} value="Add" className="btn btn-success" onClick={handleSubmit} />}
                    </div>


                </div>
            </div>


            <div className={`${deletee === false ? "form1" : "form"}`}>
                <div className="add-form">
                    <div className="from-head">
                        <p>Delete Employee</p>
                        <a onClick={handleCross}><BsX /></a>
                    </div>
                    <hr />
                    <div className="from-fill">
                        <p className="h7">Are you sure you want to delete these Recodes ?</p>
                    </div>
                    <hr />
                    <div className="from-head">
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                        <input type={"submit"} value="Delete" className="btn btn-danger" onClick={handleDeleted} />
                    </div>
                </div>
            </div>





            <div  className="hight">

                <table>
                    <tbody>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>

                        </tr>
                        {data && data.slice(values, value).map((eve, ind) => {
                            return (
                                <tr key={ind}>
                                    <td >{eve.username}</td>
                                    <td >{eve.email}</td>
                                    <td >{eve.address}</td>
                                    <td>{eve.phone}</td>
                                    <td><BsPencil className="icon" title="Edit" onClick={() => handleEdit(eve.id)} />  <BsTrash className="icon" title="Delete" onClick={() => handleDelete(eve.id)} /></td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

                <div className="page">
                    <div className="pagenation">
                        <button type="button" className="btn btn-primary" onClick={handlePrivics}>Previous</button>
                        <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todo;