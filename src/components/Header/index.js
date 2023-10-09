import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const goToLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav>
      <ul>
        <Link to="/" className="logo-link">
          <li>
            <h1 className="logo">QuadB</h1>
          </li>
        </Link>

        <li>
          <button type="button" onClick={goToLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
