import React, { ChangeEvent, createContext, FunctionComponent, useState } from "react";

type DefaultValue = {
  name: string,
  password: string,
  setPassword: (password: string) => void;
  setName: (name: string) => void;
};

const defaultValue: DefaultValue = {
  name: "",
  password: "",
  setName: () => {},
  setPassword: () => {},
};

const { Provider: UserProvider, Consumer: UserConsumer } = createContext(defaultValue);

const useUser = (defaultValue: DefaultValue) => {
  const [name, setName] = useState(defaultValue.name);
  const [password, setPassword] = useState(defaultValue.password);

  return { name, password, setName, setPassword };
};

const Provider: FunctionComponent = ({ children }) => {
  const { name, password, setName, setPassword } = useUser(defaultValue);

  return <UserProvider value={{ name, password, setName: setName, setPassword: setPassword }}>{children}</UserProvider>;
};

interface UserFormProps {
  setName: (name: string) => void;
  setPassword: (password: string) => void;
}

const UserForm: FunctionComponent<UserFormProps> = ({ setName, setPassword }) => {
  return (
    <>
      <input onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
      <br />
      <input onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
    </>
  );
};

const Child: FunctionComponent = () => {
  return (
    <UserConsumer>
      {({ name, password, setName, setPassword }) => {
        return (
          <div>
            <span>{name}</span>
            <br />
            <span>{password}</span>
            <UserForm setName={setName} setPassword={setPassword} />
          </div>
        );
      }}
    </UserConsumer>
  );
};

const Father: FunctionComponent = () => {
  return (
    <div>
      <Child />
    </div>
  );
};

const ContextDemo: FunctionComponent = () => {
  return (
    <Provider>
      <h3>context demo</h3>
      <Father />
    </Provider>
  );
};

export { ContextDemo };
