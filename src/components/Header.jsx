import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { removeUser } from '../utils/userSlice';

const Header = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth)
        dispatch(removeUser())
    }

    return (
        <header className="relative bg-gradient-to-b from-black mx-20 z-10">
            <nav className="flex space-between">
                <Link to="/browse">
                    <img
                        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                        alt="Netflix Logo"
                        className="h-[100px] object-contain"
                    />
                </Link>
                <div className='flex gap-2 items-center ml-auto'>
                    <p>
                        {user.displayName}
                    </p>
                    <img
                    className='w-[40px] h-[40px]'
                    src="https://occ-0-4173-299.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229" />
                    <button
                        onClick={handleSignOut}
                        className="p-2 bg-red-500 text-white rounded-md border border-red-500 font-medium"
                    >
                        Sign Out
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
