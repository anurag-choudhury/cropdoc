import './Navbar.css'
import {Link} from "react-router-dom"

export default function App() {
    return (
        <>
          <div className='logotext'>CropDoc</div>
          <div className = 'navbar'> 
            <div>

            <Link to="/" className='logo'>
            <img width="48" height="48" src="https://img.icons8.com/color/48/moisture.png" alt="moisture"/>
            </Link>
            <Link to = "/IrrigationPage" className='logo'>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/plant-under-rain.png" alt="plant-under-rain"/>
            </Link>
            <Link to = "/WeatherPage" className='logo'>
            <img width="48" height="48" src="https://img.icons8.com/color/48/windsock--v1.png" alt="windsock--v1"/>
            </Link>
            <Link to = "/DiseasePage" className='logo'>
            <img width="48" height="48" src="https://img.icons8.com/color/48/virus.png" alt="virus"/>
            </Link>
            </div>
          </div>
        </>
      );
}

