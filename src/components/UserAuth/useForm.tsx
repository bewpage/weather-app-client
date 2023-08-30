import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthActionEnum, AuthEnums, useAuthContext } from '../../store/auth';
import { loginUser, singUpUser } from '../../api/userAPI';

export type FormDataType = {
  email: string;
  password: string;
  passwordCheck?: string;
  username?: string;
};
const useForm = () => {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const loginPathname = pathname === '/login';
  const {
    state: { authTokens, errorMessages, isAuthTokens },
    dispatch,
  } = useAuthContext();
  const [loginData, setLoginData] = useState<FormDataType>({
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
  });

  useEffect(() => {
    if (isAuthTokens) {
      navigate('/recipes');
    }
  }, [isAuthTokens]);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginPathname) {
      (async () => callAPILoginUser(loginData))();
    } else {
      if (validateUserSingUpForm(loginData)) {
        (async () => callAPISignUpUser(loginData))();
      }
    }
    // setLoginData({
    //   email: '',
    //   password: '',
    // });
    // // clean form inputs
    // e.currentTarget.reset();
  };
  const handleAnyInput = (
    e: ChangeEvent<HTMLInputElement>,
    nameInState: string
  ): void => {
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [nameInState]: value,
    });
  };

  const callAPILoginUser = async (
    userFormData: FormDataType
  ): Promise<void> => {
    // clean error messages
    dispatch({
      type: AuthActionEnum.ERROR_MESSAGE,
      payload: {
        errorMessages: '',
      },
    });
    try {
      const response = await loginUser(userFormData);
      let jwtToken = response['token'];
      let userId = response['user_id'];
      if (
        jwtToken !== 'null' &&
        jwtToken !== null &&
        jwtToken !== 'undefined' &&
        jwtToken !== undefined
      ) {
        dispatch({
          type: AuthActionEnum.LOGIN,
          payload: {
            authTokens: jwtToken,
            userId,
          },
        });
        localStorage.setItem(AuthEnums.TOKEN, JSON.stringify(jwtToken));
        // localStorage.setItem(AuthEnums.USER_ID, JSON.stringify(userId));
        navigate('/dashboard');
      }
    } catch (err: any) {
      dispatch({ type: AuthActionEnum.ERROR_MESSAGE, payload: err });
    }
  };

  // form data validation
  const validateUserSingUpForm = (userFormData: FormDataType): boolean => {
    // check if the email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userFormData.email)) {
      dispatch({
        type: AuthActionEnum.ERROR_MESSAGE,
        payload: {
          errorMessages: 'Invalid email',
        },
      });
      return false;
    }
    // check if the password is valid
    if (userFormData.password?.length < 4) {
      dispatch({
        type: AuthActionEnum.ERROR_MESSAGE,
        payload: {
          errorMessages: 'Password must be at least 4 characters',
        },
      });
      return false;
    }
    // check if the password and passwordCheck are the same
    if (userFormData.password !== userFormData.passwordCheck) {
      dispatch({
        type: AuthActionEnum.ERROR_MESSAGE,
        payload: {
          errorMessages: 'Passwords do not match',
        },
      });
      return false;
    }
    // check if the name is valid
    if (
      userFormData.username !== undefined &&
      userFormData.username?.length < 3
    ) {
      dispatch({
        type: AuthActionEnum.ERROR_MESSAGE,
        payload: {
          errorMessages: 'Name must be at least 3 characters',
        },
      });
      return false;
    }
    return true;
  };

  const callAPISignUpUser = async (
    userFormData: FormDataType
  ): Promise<void> => {
    // clean error messages
    dispatch({
      type: AuthActionEnum.ERROR_MESSAGE,
      payload: {
        errorMessages: '',
      },
    });
    try {
      await singUpUser(userFormData);
      navigate('/login');
    } catch (err: any) {
      dispatch({
        type: AuthActionEnum.ERROR_MESSAGE,
        payload: {
          errorMessages: err,
        },
      });
    }
  };

  return {
    submitForm,
    handleAnyInput,
    loginPathname,
    errorMessages,
  };
};

export default useForm;
