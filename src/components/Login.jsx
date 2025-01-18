import { useState } from 'react';

const Login = () => {
    const [signIn, setSignIn] = useState(true);

    const toggleSignInForm = () => {
        setSignIn(!signIn);
    };

    return (
        <>
            <div className="bg-loginBg bg-cover h-screen bg-black/10 absolute w-screen -z-1"></div>
            {/* Login Form */}

            <div className="relative flex justify-center items-center h-screen">
                <form
                    className="bg-opacity-70 bg-black p-10 flex flex-col gap-6 w-3/12 justify-center"
                    action=""
                >
                    <h2 className="text-white text-3xl font-bold">
                        {signIn ? 'Sign In' : 'Sign Up'}
                    </h2>
                    {!signIn && (
                        <input
                            type="text"
                            placeholder="Full name"
                            className="p-2 bg-black/20 text-white rounded-md border border-white"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 bg-black/20 text-white rounded-md border border-white"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 bg-black/20 rounded-md border border-white"
                    />
                    <button className="p-2 bg-red-500 text-white rounded-md border border-red-500 font-bold">
                        {signIn ? 'Sign in' : 'Sign up'}
                    </button>
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
