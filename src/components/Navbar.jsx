import { NavLink } from "react-router-dom"
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className="header-container">
        <div className="title-container">
          <NavLink className="nav" to="/">
            <h1>Genesis</h1>
          </NavLink>
        </div>
    </div>
  )
}

export default Navbar