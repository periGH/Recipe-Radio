import cookies from 'next-cookies'
import jwt_decode from 'jwt-decode'
import ActiveLink from './ActiveLink'


export default class Header extends React.Component {

	render () {

		return (
		  <div>
		    <ActiveLink href='/'>Home</ActiveLink>
		    <ActiveLink href='/recipes'>Recipes</ActiveLink>
		    <ActiveLink href='/user/login'>Login</ActiveLink>
		    <ActiveLink href='/user/sign-up'>Sign Up</ActiveLink>
		    <ActiveLink href='/user/profile'>Profile</ActiveLink>
		  </div>
		)
	}
}