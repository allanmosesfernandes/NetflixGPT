import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Header = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
        dispatch(removeUser())
        navigate('/');
    }

    return (
        <header className="relative bg-gradient-to-b from-black mx-20 z-10">
            <nav className='flex space-between'>
                <Link to='/browse'>
                    <img
                        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                        alt="Netflix Logo"
                        className="h-[100px] object-contain"
                    />
                </Link>
                <button
                    onClick={handleSignOut}
                    className='p-2 bg-red-500 text-white rounded-md border border-red-500 font-bold'>
                    Sign Out
                </button>
            </nav>
        </header>
    );
};

export default Header;
