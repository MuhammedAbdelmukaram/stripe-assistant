"use client";
import React, { useState, Suspense } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import AdminSignUpForm from "@/app/components/AdminSignUpForm";
import { motion } from "framer-motion";
import AdminSignInForm from "@/app/components/AdminSignInForm";
import SignUpForm from "@/app/components/SignUpForm";

const Home = () => {
    const [view, setView] = useState('home');

    const handleDeveloperClick = () => {
        setView('developer');
    };

    const handleSaaSClick = () => {
        setView('saas');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
        >
            <main className={styles.main}>
                <p style={{ textAlign: "center" }}>user</p>
                <div className={styles.mainWrapper}>
                    {/* Logo */}
                    <div className={styles.logo}>
                        <Image src="/logoWhite.png" alt="Logo" width={230} height={230} />
                    </div>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>Create Your Account</p>

                    {/* Wrapping SignUpForm with Suspense */}
                    <Suspense fallback={<div>Loading...</div>}>
                        <SignUpForm />
                    </Suspense>
                </div>
                {/* Footer */}
            </main>
        </motion.div>
    );
};

export default Home;
