import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== "";
const isEmail = value => value.includes("@");

const BasicForm = props => {
	const {
		value: firstName,
		isValid: firstNameValid,
		hasError: firstNameError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlueHandler: firstNameBlurHandler,
		reset: resetFirstName,
	} = useInput(isNotEmpty);

	const {
		value: lastName,
		isValid: lastNameValid,
		hasError: lastNameError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlueHandler: lastNameBlurHandler,
		reset: resetLastName,
	} = useInput(isNotEmpty);

	const {
		value: email,
		isValid: emailIsValid,
		hasError: emailError,
		valueChangeHandler: emailChangeHandler,
		inputBlueHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail);

	let formIsValid = false;

	if (firstNameValid && lastNameValid && emailIsValid) {
		formIsValid = true;
	}

	const submitFormHandler = event => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		console.log("Submitted!");
		console.log(firstName, lastName, email);
		resetFirstName();
		resetLastName();
		resetEmail();
	};

	const firstNameClasses = firstNameError
		? "form-control invalid"
		: "form-control";
	const lastNameClasses = lastNameError
		? "form-control invalid"
		: "form-control";
	const emailClasses = emailError ? "form-control invalid" : "form-control";

	return (
		<form onSubmit={submitFormHandler}>
			<div className="control-group">
				<div className={firstNameClasses}>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						onChange={firstNameChangeHandler}
						onBlur={firstNameBlurHandler}
						value={firstName}
					/>
					{firstNameError && <p>First name cannot be blank.</p>}
				</div>
				<div className={lastNameClasses}>
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						onChange={lastNameChangeHandler}
						onBlur={lastNameBlurHandler}
						value={lastName}
					/>
					{lastNameError && <p>Last name cannot be blank.</p>}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor="email">E-Mail Address</label>
				<input
					type="email"
					id="email"
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={email}
				/>
				{emailError && <p>Must be valid e-mail.</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
