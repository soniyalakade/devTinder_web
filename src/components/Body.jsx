import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'
import Footer from './Footer'

const Body = () => {

    const fetchUser = async () => {
        const user = await axios.get()
    }
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );

};
 export default Body;
