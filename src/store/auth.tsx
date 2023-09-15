import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

enum AuthEnums {
  TOKEN = 'token',
  USER_ID = 'userId',
}

export type UserInfoType = {
  username: string;
  email: string;
};

export type AuthAPIType = {
  token: string | null;
  user_id: string | null;
};

type AuthDataType = {
  authTokens: AuthAPIType['token'];
  userId: AuthAPIType['user_id'];
  userInfo?: UserInfoType;
  errorMessages: string;
  showError: boolean;
  isAuthTokens: boolean;
};

type AuthActionType = {
  type: AuthActionEnum;
  payload: {
    authTokens?: AuthAPIType['token'];
    userId?: AuthAPIType['user_id'];
    userInfo?: UserInfoType;
    errorMessages?: string;
    showError?: boolean;
    isAuthTokens?: boolean;
  };
};

type AuthStateType = {
  state: AuthDataType;
};

type AuthDispatchType = Dispatch<AuthActionType>;

type AuthContextType = {
  state: AuthDataType;
  dispatch: AuthDispatchType;
};

export enum AuthActionEnum {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SET_USER_ID = 'SET_USER_ID',
  GET_USER_INFO = 'GET_USER_INFO',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
}

// Define the type for the children prop
type AuthContextProviderProps = {
  children: ReactNode;
};

export const INITIAL_STATE: AuthContextType = {
  state: {
    authTokens: 'null',
    userId: 'null',
    userInfo: {
      username: '',
      email: '',
    },
    errorMessages: '',
    showError: false,
    isAuthTokens: false,
  },
  dispatch: () => null,
};

// check if there is a token in local storage
let storage = localStorage.getItem(AuthEnums.TOKEN);
if (storage !== 'undefined') {
  storage = JSON.parse(storage || 'null');
}
const initialToken = () => storage || 'null';

// check if there is a userId in local storage
let storageUserId = localStorage.getItem(AuthEnums.USER_ID);
if (storageUserId !== 'undefined') {
  storageUserId = JSON.parse(storageUserId || 'null');
}

const initialUserId = () => storageUserId || 'null';

// check if authTokens as a string is null or empty
const checkAuthTokens = (authTokens: string | null | undefined): boolean => {
  if (authTokens === undefined) {
    return false;
  }
  return authTokens !== 'null' && authTokens !== null && authTokens.length > 0;
};

const initialState = {
  ...INITIAL_STATE,
  state: {
    authTokens: initialToken(),
    userId: initialUserId(),
    errorMessages: '',
    showError: false,
    isAuthTokens: checkAuthTokens(initialToken()),
  },
};

const AuthContext = createContext<AuthContextType>(initialState);
export const useAuth = () => useContext(AuthContext);

export const authReducer = (
  state: AuthStateType,
  action: AuthActionType
): AuthStateType => {
  switch (action.type) {
    case AuthActionEnum.LOGIN:
      const authTokens = action.payload.authTokens;
      return {
        state: {
          ...state.state,
          ...action.payload,
          isAuthTokens: checkAuthTokens(authTokens),
        },
      };
    case AuthActionEnum.SET_USER_ID:
      const userId = action.payload.userId;
      return {
        state: {
          ...state.state,
          userId,
        },
      } as AuthStateType;
    case AuthActionEnum.LOGOUT:
      return {
        state: {
          ...state.state,
          ...action.payload,
          isAuthTokens: checkAuthTokens(action.payload.authTokens),
        },
      };
    case AuthActionEnum.GET_USER_INFO:
      return {
        state: {
          ...state.state,
          ...action.payload,
        },
      };
    case AuthActionEnum.ERROR_MESSAGE:
      let { errorMessages } = action.payload;
      return {
        state: {
          ...state.state,
          errorMessages: errorMessages || '',
          showError: errorMessages !== undefined && errorMessages.length > 0,
        },
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const value = { ...state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};

export { AuthContextProvider, useAuthContext, AuthEnums };
