import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="flex gap-5">


                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/login'>Login</NavLink>
                        <NavLink to='/register'>Register</NavLink>
                        <NavLink to='/about'>About</NavLink>
                        <NavLink to='/map'>Map</NavLink>

                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">Bike Service</a>
                </div>

            </div>
        </div>
    );
};

export default Nav;