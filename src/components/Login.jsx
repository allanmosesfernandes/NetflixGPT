import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { auth } from '../utils/firebase';
import { convertFirebaseErrorToStrings } from '../utils/helpers/strings';
import { validateSignIn } from '../utils/validations';
import Loader from './Loader';

const Login = () => {
    // State
    const [signIn, setSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [validatingLogin, setValidatingLogin] = useState(false);

    // Refs
    const formRef = useRef(null);

    // Handlers
    const toggleValidatingLogin = () => setValidatingLogin(!validatingLogin);

    const toggleSignInForm = () => {
        setSignIn(!signIn);
        setErrorMessage('');
        formRef.current.reset();
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        toggleValidatingLogin();
        // Sign up logic
        const formElements = formRef.current.elements;
        const email = formElements.email.value;
        const password = formElements.password.value;
        const name = formElements.name ? formElements.name.value : null;
        const errorMessage = validateSignIn(email, password, name);
        setErrorMessage(errorMessage);
        if (errorMessage === null) {
            if (!signIn) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log('USER', user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(
                        convertFirebaseErrorToStrings(errorCode)
                    );
                    // ..
                });
            } else {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log('USER SIGNED IN', user);
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });
            }
        }
        setValidatingLogin(false);
    };

    return (
        <>
            <div className="bg-loginBg bg-cover h-screen bg-black/10 absolute w-screen -z-1"></div>
            {/* Login Form */}
            <div className="relative flex justify-center items-center h-screen">
                <form
                    className="bg-opacity-70 bg-black p-10 flex flex-col gap-6 w-3/12 justify-center"
                    ref={formRef}
                    onSubmit={handleFormSubmission}
                    autoComplete='off'
                >
                    <h2 className="text-white text-3xl font-bold">
                        {signIn ? 'Sign In' : 'Sign Up'}
                    </h2>
                    {!signIn && (
                        <input
                            type="text"
                            name="name"
                            required
                            minLength={3}
                            placeholder="Full name"
                            className="p-2 bg-black/20 text-white rounded-md border border-white"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        className="p-2 bg-black/20 text-white rounded-md border border-white"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 bg-black/20 rounded-md border border-white"
                        name="password"
                        required
                    />
                    <button
                        className={`p-2 bg-red-500 text-white rounded-md border border-red-500 font-bold ${
                            validatingLogin
                                ? 'opacity-70 cursor-not-allowed'
                                : ''
                        }`}
                        disabled={validatingLogin} // disable button when validating
                    >
                        {validatingLogin ? (
                            <Loader />
                        ) : signIn ? (
                            'Sign in'
                        ) : (
                            'Sign up'
                        )}
                    </button>

                    <p className="text-red-500 font-bold text-center">
                        {errorMessage}
                    </p>
                    <p
                        className="text-white text-center min-h-20 cursor-pointer"
                        onClick={toggleSignInForm}
                    >
                        {signIn
                            ? 'New to Netflix? '
                            : 'Already have an account? '}
                        <span className="font-bold">
                            Sign {signIn ? 'up' : 'in'} now
                        </span>
                        .
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
