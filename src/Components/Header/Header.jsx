import React from "react";
import './Header.css'

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>Pranav Trivedi</div>
        <nav>
          <ul>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/'>About Me</a>
            </li>
            <li>
              <a href='/'>Projects</a>
            </li>
            <li>
              <a href='/'>Contact Me</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}