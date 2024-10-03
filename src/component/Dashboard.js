import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
})

const Dashboard = () => {
    const [search, setSearch] = useState("")
    const [filterUsers, setFilterUsers] = useState([])
    const [editingUserId, setEditingUserId] = useState("")
    const [users, setUsers] = useState([
        { id: 1, name: 'Kirti', email: 'ishwari@gmail.com' },
        { id: 2, name: 'Ram', email: 'ram@gmail.com' },
        { id: 3, name: 'Kavya', email: 'kavya@gmail.com' },
        { id: 4, name: 'Raj', email: 'Raj@gmail.com' },
        { id: 5, name: 'Kishor', email: 'kishor@gmail.com' },
        { id: 6, name: 'Pooja', email: 'pooja@gmail.com' },
        { id: 7, name: 'Bhavna', email: 'bhavna@gmail.com' },
        { id: 8, name: 'Diksha', email: 'diksha@gmail.com' },
        { id: 9, name: 'Purvi', email: 'purvi@gmail.com' },
        { id: 10, name: 'Apurva', email: 'ishwari01@gmail.com' },
        { id: 11, name: 'Arjun', email: 'arjun@gmail.com' },
        { id: 12, name: 'Krishna', email: 'krishna@gmail.com' },
        { id: 13, name: 'Samay', email: 'samay@gmail.com' },
        { id: 14, name: 'Poonam', email: 'poonam@gmail.com' },
        { id: 15, name: 'Priya', email: 'priya@gmail.com' },
    ]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        if (search) {
            setFilterUsers(users.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase())
            ));
        } else {
            setFilterUsers(users)
        }
    }, [search, users])

    const handleEdit = (user) => {
        setEditingUserId(user.id)
        formik.setValues({
            name: user.name,
            email: user.email,
        });
        console.log(user, "user data")
    };

    const handleUpdateUser = (updatedUser) => {
        const updatedUsers = users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        )
        setUsers(updatedUsers)
        setEditingUserId()
        formik.resetForm()
        console.log(updatedUser, "updated data")
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (editingUserId) {
                handleUpdateUser({
                    id: editingUserId,
                    name: values.name,
                    email: values.email,
                });
                // console.log(editingUserId,"updated values")
            }
        },
    });

    const handleCancel = () => {
        setEditingUserId()
        formik.resetForm();
    }

    return (
        <div className='input-container'>
            <h1 style={{ textAlign: "center" }}>Search User</h1>
            <input
                type='text'
                placeholder='Enter name here...'
                name='search'
                value={search}
                onChange={handleSearch}
            />

            <table className='table'>
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>
                                {editingUserId == user.id ? (
                                    <>
                                        <input style={{ width: 100, height: 9 }}
                                            type="text"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div style={{ color: 'red' }}>{formik.errors.name}</div>
                                        ) : null}
                                    </>
                                ) : (
                                    user.name
                                )}
                            </td>

                            <td>
                                {editingUserId == user.id ? (
                                    <>
                                        <input style={{ width: 160, height: 9 }}
                                            type="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div style={{ color: 'red' }}>{formik.errors.email}</div>
                                        ) : null}
                                    </>
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(user)} className='editBtn'>Edit</button></td>
                            <td>
                                <button onClick={formik.handleSubmit} className='saveBtn' type='submit'>Save</button>
                            </td>
                            <td>
                                <button onClick={handleCancel} className='cancelBtn'>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>
        </div>
    )
}

export default Dashboard;
