import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { convertFirebaseErrorToStrings } from '../utils/helpers/strings';
import { validateSignUp } from '../utils/validations';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    // State
    const [signIn, setSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [validatingLogin, setValidatingLogin] = useState(false);

    // Refs
    const formRef = useRef(null);

    // Reducers
    const dispatch = useDispatch();

    // Handlers
    const toggleValidatingLogin = () => setValidatingLogin(!validatingLogin);

    const toggleSignInForm = () => {
        setSignIn(!signIn);
        setErrorMessage('');
        formRef.current.reset();
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        const formElements = formRef.current.elements;
        const email = formElements.email.value;
        const password = formElements.password.value;
        const name = formElements.name ? formElements.name.value : null;
        // Sign up logic
        if (!signIn) {
            const validationErrors = validateSignUp(email, password, name);
            setErrorMessage(validationErrors);
            if (!validationErrors) {
                toggleValidatingLogin();
                createUserWithEmailAndPassword(auth, email, password, name)
                    .then((userCredential) => {
                        // Signed up
                        const user = userCredential.user;
                        console.log('USER WAS CREATED', user);
                        updateProfile(auth.currentUser, {
                            displayName: name,
                            photoURL:
                                'https://occ-0-4173-299.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'
                        }).then(() => {
                            const { uid, email, displayName } = user;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName
                                })
                            );
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage(
                            convertFirebaseErrorToStrings(errorCode)
                        );
                        // ..
                    });
            }
        }
        if (signIn) {
            toggleValidatingLogin();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log('USER SIGNED IN', user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    setErrorMessage(convertFirebaseErrorToStrings(errorCode));
                });
            setValidatingLogin(false);
        }
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
                    autoComplete="off"
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
                    <Link
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
                    </Link>
                </form>
            </div>
        </>
    );
};

export default Login;
