import { NavLink,   useNavigate
} from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import React, { useState, useRef, useEffect } from 'react';

import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';



const links = [
    { path: '/', text: 'Home' },
    { path: 'about', text: 'About' },
    { path: 'profile', text: 'Profile' },
    { path: 'login', text: 'Login' },
];

const Navbar = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const [navbarOpen, setNavbarOpen] = useState(false);


    const handleLogout = () => {
        logout();
        navigate('/login');

    };

    const ref = useRef();
    useEffect(() => {
        const handler = (event) => {
            if (
                navbarOpen &&
                ref.current &&
                !ref.current.contains(event.target)
            ) {
                setNavbarOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handler);
        };
    }, [navbarOpen]);


    return (
        <>

            <nav ref={ref} className="navbar">

                <button
                    className="toggle"
                    onClick={() => setNavbarOpen((prev) => !prev)}
                >
                    {navbarOpen ? (
                        <MdClose style={{ width: '32px', height: '32px' }} />
                    ) : (
                        <FiMenu
                            style={{
                                width: '32px',
                                height: '32px',
                            }}
                        />
                    )}
                </button>


                <ul className={`menu-nav${navbarOpen ? ' show-menu' : ''}`}>

                    {links.map((link) => {
                        return (
                            <React.Fragment key={link.text}>
                                {link.path === 'login' ? (
                                    !user && (
                                        <li>
                                            <NavLink to={link.path}
                                                     onClick={() => setNavbarOpen(false)}


                                            >
                                                {link.text}

                                            </NavLink>
                                        </li>
                                    )
                                ) : link.path === 'profile' ? (
                                    user && (
                                        <li>
                                            <NavLink to={link.path}
                                                     onClick={() => setNavbarOpen(false)}
                                            >
                                                {link.text}
                                            </NavLink>
                                        </li>
                                    )
                                ) : (
                                    <li>
                                        <NavLink to={link.path}
                                                 onClick={() => setNavbarOpen(false)}

                                        >{link.text}</NavLink
                                        >
                                    </li>
                                )}
                            </React.Fragment>
                        );
                    })}

                </ul>

                {!user && (
                    <li className="log-in">
                        <span>Log in to edit to-dos</span>
                    </li>
                )}


            </nav>

            {user && (
                <div className="logout">
                    <p>{user}</p>
                    {<button onClick={handleLogout}>Logout</button>}
                </div>
            )}

        </>


    );
};
export default Navbar;
