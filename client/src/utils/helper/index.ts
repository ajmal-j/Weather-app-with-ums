type SetLocalStorage = (userData: object) => void;

export const setToLocalStorage: SetLocalStorage = (userData: object) => {
  const data = JSON.stringify(userData);
  localStorage.setItem("userCredentials", data);
};

type userCredentialsType = () => {
  token: string;
  name: string;
  id: string;
  profile: string;
  email: string;
};

type UserUpdateType = {
  name?: string;
  email?: string;
  contact?: string;
  profile?: string;
};

export const getLocalStorage: userCredentialsType = (): {
  token: string;
  name: string;
  id: string;
  profile: string;
  email: string;
} => {
  const userData = localStorage.getItem("userCredentials");
  if (!userData) throw new Error("UserData not found");
  const data = JSON.parse(userData);
  return data;
};

export const updateLocalStorage = ({
  email,
  contact,
  name,
  profile,
}: UserUpdateType) => {
  const current = getLocalStorage();
  let data = {};
  if (email && name && contact) {
    data = {
      ...current,
      email,
      name,
      contact,
    };
  } else if (profile) {
    data = {
      ...current,
      profile,
    };
  }
  setToLocalStorage(data);
};