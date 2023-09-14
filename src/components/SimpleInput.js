import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = props => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputError,
		valueChangeHandler: nameChangedHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInput(value => value.trim() !== "");

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputError,
		valueChangeHandler: emailChangedHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput
	} = useInput(value => value.trim() !== "")

	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const formSubmissionHandler = event => {
		event.preventDefault();

		if (!enteredName || !enteredEmail) {
			return;
		}
		resetNameInput();
		resetEmailInput();
	};

	const nameInputClasses = !nameInputError
		? "form-control"
		: "form-control invalid";

	const emailInputClasses = !emailInputError
		? "form-control"
		: "form-control invalid";

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameChangedHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{nameInputError && (
					<p className="error-text">Name must not be empty.</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">E-mail Address</label>
				<input
					type="email"
					id="email"
					onChange={emailChangedHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{emailInputError && (
					<p className="error-text">Email must be valid.</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
