// pages/admin-panel/Page.js
"use client";
import React, { useEffect, useState } from 'react';
import AdminSidebar from "@/app/components/AdminSidebar";
import InfoCard from "@/app/components/InfoCard"; // Assuming this is the InfoCard from your previous code

const Page = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch the total user count
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch('/api/user-count');
                if (!response.ok) {
                    throw new Error('Failed to fetch user count');
                }
                const data = await response.json();
                setTotalUsers(data.totalUsers);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalUsers();
    }, []);

    return (
        <div>
            <AdminSidebar />
            <div style={{ marginLeft: 70, width: "100%", height: "100%", minWidth: "100vw", minHeight: "100vh", backgroundColor: "#1F1F1F" }}>
                <div style={{ width: "59%", marginLeft: 120, paddingTop: 80 }}>
                    {/* Total Users Info Card */}
                    <InfoCard
                        label="Total Users"
                        value={isLoading ? "Loading..." : totalUsers.toString()}
                        percentage="N/A"  // Placeholder, calculate actual percentage if needed
                        sevenDayValues={[]} // You can pass in relevant data if needed
                    />
                    {/* Add any additional components/cards here */}
                </div>
            </div>
        </div>
    );
};

export default Page;
