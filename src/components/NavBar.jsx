import { NavLink } from "react-router-dom"
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/admin">Admin Portal</NavLink>
        <NavLink to="/chat">Chat</NavLink>
    </nav>
  )
}