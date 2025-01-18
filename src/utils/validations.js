function validateSignIn(email, password, name=null) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    if(name && !nameRegex.test(name)){
        return 'Please enter a valid name';
    }

    if (!emailRegex.test(email)) {
        console.log('Invalid email format');
        return 'Invalid email format';
    }

    if (!passwordRegex.test(password)) {
        return 'Password must contain at least one number, one uppercase and lowercase letter, and at least 6 characters';
    }

    return null;
}


export { validateSignIn };