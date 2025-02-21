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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email } = user
                dispatch(addUser({uid: uid, email: email}));
                navigate('/browse')
            }else {
                dispatch(removeUser);
                navigate('/');
            }
        })
    }, [])

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
