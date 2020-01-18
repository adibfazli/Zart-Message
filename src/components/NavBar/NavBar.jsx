import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) =>{
    return(
        <div>
            <Link to='/message' className='NavBar-link'>HI</Link>
            <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
        </div>
    );
}
export default NavBar