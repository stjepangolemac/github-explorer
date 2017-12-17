import { StackNavigator } from 'react-navigation'

import Search from './screens/Search'
import UsersDetails from './screens/UsersDetails'

export default StackNavigator({
  Search: { screen: Search },
  Users: { screen: UsersDetails },
})
