import React, {useState, ChangeEvent, ReactElement} from "react";

let UserForm: () => ReactElement;
UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {target: {value: name}} = event;
    setName(name);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {target: {value: email}} = event;
    setEmail(email);
  };

  return (
    <>
      <input value={name} onChange={handleNameChange}/>
      <input value={email} onChange={handleEmailChange}/>
    </>
  );
};

export { UserForm };
