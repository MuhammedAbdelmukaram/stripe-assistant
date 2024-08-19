"use client";
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import styles from './AdminSidebar.module.css';
import Cookies from 'js-cookie';

const SidebarItem = ({iconSrc, label, onClick}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={styles.sidebarItem}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image src={iconSrc} alt={label} width={24} height={24}/>
            {isHovered && <div className={styles.tooltip}>{label}</div>}
        </div>
    );
};

const AdminSidebar = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = (path) => {
        router.push(path);
    };

    const handleLogout = async () => {
        Cookies.remove('adminToken'); // Remove admin token from cookies
        router.push('/admin-signin'); // Redirect to admin sign-in page
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmLogout = async () => {
        closeModal();
        await handleLogout();
    };

    return (
        <div className={isModalOpen ? styles.blurredBackground : ''}>
            <div className={styles.sidebar}>

                <SidebarItem
                    iconSrc="/HomeIcon.png"
                    label="Home"
                    onClick={() => navigate('/admin-panel')}
                />

                <SidebarItem
                    iconSrc="/AccountIcon.png"
                    label="Accounts"
                    onClick={() => navigate('/admin-panel/accounts')}
                />

                <SidebarItem
                    iconSrc="/GenerateLink.png"
                    label="Signup Links"
                    onClick={() => navigate('/admin-panel/generate-link')}
                />


                <SidebarItem
                    iconSrc="/Logout.png"
                    label="Logout"
                    onClick={openModal}
                />
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 style={{textAlign:"left"}}>Are you sure you want to logout?</h2>
                        <div className={styles.buttons}>
                            <button onClick={confirmLogout}>Log out</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSidebar;
