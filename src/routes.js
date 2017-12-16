import { StackNavigator } from 'react-navigation'

import Search from './screens/Search'
import UserDetails from './screens/UserDetails'

export default StackNavigator({
  Search: { screen: Search },
  User: { screen: UserDetails },
})
