import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "./ErrorModal";

function AddUser(props) {
  const [userNameInput, setUserNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [error, setError] = useState();

  const AddUserHandler = (e) => {
    e.preventDefault();
    if (userNameInput.trim().length === 0 || ageInput.trim().length === 0) {
      setError({
        title: "invalid entry of username",
        message: "please enter valid name and age (non-empty values)",
      });
      return;
    }
    if (+ageInput < 1) {
      setError({
        title: "invalid entry of age",
        message: "please enter valid name and age (non-empty values)",
      });
      return;
    }

    props.onAddUser(userNameInput, ageInput);
    setUserNameInput("");
    setAgeInput("");
  };

  const userNameChangeHandler = (e) => {
    setUserNameInput(e.target.value);
  };
  const ageChangeHandler = (e) => {
    setAgeInput(e.target.value);
  };

  const ErrorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          messegge={error.message}
          onConfirm={ErrorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={AddUserHandler}>
          <label htmlFor='username'>username</label>
          <input
            id='username'
            type='text'
            autoComplete='off'
            value={userNameInput}
            onChange={userNameChangeHandler}
          />
          <label htmlFor='age'>Age (years)</label>
          <input
            id='age'
            type='number'
            autoComplete='off'
            value={ageInput}
            onChange={ageChangeHandler}
          />
          <Button type='submit'>Sumbit</Button>
        </form>
      </Card>
    </>
  );
}

export default AddUser;
