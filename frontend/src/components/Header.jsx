import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return <header className='header'>
    <div className='logo'>
      <Link href='/'>GoalSetter</Link>
    </div>
    <ul>
      <li>
        <Link href='/login'>
          <FaSignInAlt /> Login
        </Link>
      </li>
      <li>
        <Link href='/register'>
          <FaUser /> Register
        </Link>
      </li>
    </ul>
  </header>
}

export default Header
