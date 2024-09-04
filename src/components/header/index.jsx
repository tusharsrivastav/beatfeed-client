import React from 'react'
import SearchBar from './searchBar';
import './header.css';

const Header = ({ query, sendQueryToParent }) => {
  return (
    <div className='header-wrapper'>
        <div className='logo poppins-bold'>BeatFeed</div>
        {/* <SearchBar query={query} sendQueryToParent={sendQueryToParent} /> */}
        <ul className='login-signup-btn-wrapper poppins-regular'>
          <li>
            <a href="">Login</a>
          </li>
          <li>
            <a href="">Signup</a>
          </li>
        </ul>
    </div>
  )
}

export default Header;