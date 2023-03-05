import { Link } from "react-router-dom"
import LoginForm from "../Form/LoginForm"
const Login = ({ setIsAuthenticated }) => {
  return (
    <div>
        <LoginForm setIsAuthenticated={ setIsAuthenticated } />
        <Link to={"/signup"}>Signup</Link>
    </div>
  )
}

export default Login