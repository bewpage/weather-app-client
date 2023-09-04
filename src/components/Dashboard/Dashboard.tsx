import React, { useEffect } from 'react';
import { AuthActionEnum, useAuthContext } from '../../store/auth';
import { getUser } from '../../api/userAPI';

const Dashboard = () => {
  const {
    state: { userInfo, authTokens, errorMessages, isAuthTokens },
    dispatch,
  } = useAuthContext();

  useEffect(() => {
    if (isAuthTokens && authTokens !== null && authTokens !== undefined) {
      (async () => {
        try {
          const userInfo = await getUser(authTokens);
          dispatch({
            type: AuthActionEnum.GET_USER_INFO,
            payload: { userInfo },
          });
        } catch (error) {
          dispatch({
            type: AuthActionEnum.ERROR_MESSAGE,
            payload: { errorMessages: error as string },
          });
        }
      })();
    } else {
      console.log('no auth tokens');
    }
  }, []);

  return (
    <div>
      <div className="container mt-5">
        {userInfo && (
          <div className="card mt-4">
            <div className="card-header">User Information</div>
            <div className="card-body">
              <h5 className="card-title">{userInfo.username}</h5>
              <p className="card-text">Email: {userInfo.email}</p>
              {/* TODO: Add more user dashboard functionality here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
