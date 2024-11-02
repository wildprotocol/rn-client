import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RouteName } from "app/constants"
import * as Screens from "app/screens"
import { colors } from "app/theme"

import { AuthStackParamList } from "./types"

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

export const AuthNavigator = function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName={RouteName.Login}
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
    >
      <AuthStack.Screen name={RouteName.Login} component={Screens.LoginScreen} />
    </AuthStack.Navigator>
  )
}
