import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { FeedScreen, SubCategoryScreen } from "@/screens"
import { useAppTheme } from "@/utils"

import { HomeTabParamList } from "./types"

const HomeTab = createNativeStackNavigator<HomeTabParamList>()

export function HomeTabNavigator() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <HomeTab.Navigator
      screenOptions={{
        animation: "fade",
        animationDuration: 200,
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <HomeTab.Screen name="Feed" component={FeedScreen} />
      <HomeTab.Screen name="SubCategory" component={SubCategoryScreen} />
    </HomeTab.Navigator>
  )
}
