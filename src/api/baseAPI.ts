type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type OptionsType = {
  method?: Method;
  apiToken?: string;
  body?: any;
};
const options = ({
  method = 'GET',
  apiToken,
  body,
}: OptionsType): RequestInit => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: apiToken ? `Bearer ${apiToken}` : '',
  },
  body: JSON.stringify(body),
});

const baseAPI = async (url: string, options?: any): Promise<any> => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

export { baseAPI, options };
