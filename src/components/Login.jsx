import { useRef, useState } from 'react';
import { validateSignIn } from '../utils/validations';

const Login = () => {
    const [signIn, setSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);

    const toggleSignInForm = () => {
        setSignIn(!signIn);
        setErrorMessage('');
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        const formElements = formRef.current.elements;
        const email = formElements.email.value;
        const password = formElements.password.value;
        const name = formElements.name ? formElements.name.value : null;
        const errorMessage = validateSignIn(email, password, name);
        setErrorMessage(errorMessage);
    };
``
    return (
        <>
            <div className="bg-loginBg bg-cover h-screen bg-black/10 absolute w-screen -z-1"></div>
            {/* Login Form */}
            <div className="relative flex justify-center items-center h-screen">
                <form
                    className="bg-opacity-70 bg-black p-10 flex flex-col gap-6 w-3/12 justify-center"
                    ref={formRef}
                    onSubmit={handleFormSubmission}
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
                        className="p-2 bg-red-500 text-white rounded-md border border-red-500 font-bold"
                    >
                        {signIn ? 'Sign in' : 'Sign up'}
                    </button>
                    <p className='text-red-500 font-bold text-center'>{errorMessage}</p>
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
