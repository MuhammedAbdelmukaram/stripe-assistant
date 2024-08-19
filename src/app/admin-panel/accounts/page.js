"use client"
import React, {useEffect, useState} from 'react';
import AdminSidebar from "@/app/components/AdminSidebar";
import styles from "@/app/admin-panel/accounts/accounts.module.css";

const Page = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <AdminSidebar />
            <div style={{ marginLeft: 70, width: "100%", height: "100%", minWidth: "100vw", minHeight: "100vh", backgroundColor: "#1F1F1F", color: "#FFFFFF", padding: "20px" }}>
                <div className={styles.content}>
                    <h1>User Accounts</h1>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name || '???'}</td>
                                <td>{user.email || '???'}</td>
                                <td>{user.role || '???'}</td>
                                <td>{user.status || '???'}</td>
                                <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '???'}</td>
                                <td>{user.amount ? `$${user.amount.toLocaleString()}` : '???'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Page;
