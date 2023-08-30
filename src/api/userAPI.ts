import { baseAPI, options } from './baseAPI';
import { config } from '../config';
import { AuthAPIType } from '../store/auth';
import { FormDataType } from '../components/UserAuth/useForm';

const { USERS_API_URL } = config;

const loginUser = async ({
  username,
  password,
}: FormDataType): Promise<AuthAPIType> => {
  return await baseAPI(
    `${USERS_API_URL}/login`,
    options({ method: 'POST', body: { username, password } })
  );
};

const singUpUser = async ({ email, password, username }: FormDataType) => {
  return await baseAPI(
    `${USERS_API_URL}/signup`,
    options({ method: 'POST', body: { email, password, username } })
  );
};

const getUser = async (apiToken: string) => {
  return await baseAPI(`${USERS_API_URL}/me`, options({ apiToken }));
};

export { loginUser, singUpUser, getUser, options };
