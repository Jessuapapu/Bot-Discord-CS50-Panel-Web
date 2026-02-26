import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbars from '../Components/Navbar/Navbar';

export const Layout: React.FC = () => {
    return (
        <>
            <Navbars></Navbars>
            <main className="">
                {/* Aquí se renderizarán tus páginas hijas */}
                <Outlet />
            </main>
        </>
    );
};