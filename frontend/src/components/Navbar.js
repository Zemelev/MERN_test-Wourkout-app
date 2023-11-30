import { Link } from 'react-router-dom' //using Link to handle /request  || this link do not make a request to backend

const Navbar = () => {  // navbar component

    return(
        <header>
            <div className="container"> 
                <Link to="/">              
                    <h1>Workout Buddy</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar //exporting Navbar