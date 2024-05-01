// App.js
import React, { useState } from 'react';

function AppTest() {
    const [currentPage, setCurrentPage] = useState('home');

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="App">
            <div className="sidebar">
                <ul>
                    <li><button onClick={() => changePage('home')}>Home</button></li>
                    <li><button onClick={() => changePage('about')}>About</button></li>
                    <li><button onClick={() => changePage('contact')}>Contact</button></li>
                </ul>
            </div>
            <div className="main-content">
                {currentPage === 'home' && <Home />}
                {currentPage === 'about' && <About />}
                {currentPage === 'contact' && <Contact />}
            </div>
        </div>
    );
}

function Home() {
    return (
        <div>
            <h2>Welcome to Home Page</h2>
            <p>This is the home page content.</p>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About Us</h2>
            <p>This is the about page content.</p>
        </div>
    );
}

function Contact() {
    return (
        <div>
            <h2>Contact Us</h2>
            <p>This is the contact page content.</p>
        </div>
    );
}

export default AppTest;
