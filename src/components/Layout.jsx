import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import Header from './Header';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
                navigate('/browse', { replace: true });
            } else {
                dispatch(removeUser());
                navigate('/', { replace: true });
            }
        });

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return unsubscribe;
    }, []);

    return (
        <div>
            {user && <Header />}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
