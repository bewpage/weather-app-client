import React, { useState, FormEvent, ChangeEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthActionEnum, AuthEnums, useAuthContext } from '../../store/auth';

const Navigation = () => {
  let navigate = useNavigate();
  const {
    state: { authTokens, isAuthTokens },
    dispatch: authDispatch,
  } = useAuthContext();
  const [search, setSearch] = useState('');

  const searchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearch('');
    navigate('/search');
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const logout = () => {
    authDispatch({
      type: AuthActionEnum.LOGOUT,
      payload: {
        authTokens: '',
        isAuthTokens: false,
        userId: null,
      },
    });
    localStorage.removeItem(AuthEnums.TOKEN);
    localStorage.removeItem(AuthEnums.USER_ID);
    navigate('/');
  };

  const navItems = {
    login: (
      <NavLink className="nav-link" to="/login">
        Log In
      </NavLink>
    ),
    logout: (
      <a className="nav-link" onClick={logout} href="/">
        Logout
      </a>
    ),
    signup: (
      <NavLink className="nav-link" to="/signup">
        Sign Up
      </NavLink>
    ),
    searchBar: (
      <form onSubmit={searchSubmit}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control mr-sm-2"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-outline-info">
              Search
            </button>
          </div>
        </div>
      </form>
    ),
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <div className="row w-100 align-items-start">
          <div className="col d-flex justify-content-start">
            <NavLink
              className="navbar-brand"
              to={isAuthTokens ? '/weatherservice' : '/'}
              style={{ width: '80px' }}>
              Weather App
            </NavLink>
          </div>
          <div className="col d-flex justify-content-end">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={isAuthTokens ? '/weatherservice' : '/'}>
                    Home
                  </NavLink>
                </li>
                {isAuthTokens ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/weatherservice">
                      Weather Service
                    </NavLink>
                  </li>
                ) : null}
                <li className="nav-item">
                  {isAuthTokens ? navItems.logout : navItems.login}
                </li>
                <li className="nav-item">
                  {isAuthTokens ? null : navItems.signup}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
