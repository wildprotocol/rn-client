import { TxKeyPath } from "app/i18n"
import * as Screens from "app/screens"
import { Article, Bell, Chat, Coins, Plus } from "phosphor-react-native"

import { TabParamList } from "@/navigators"
import { HomeTabNavigator } from "@/navigators/HomeTabNavigator"

export enum RouteName {
  Home = "Home",
  Login = "Login",
  Feed = "Feed",
  TippingArena = "TippingArena",
  Points = "Points",
  Notifications = "Notifications",
  Wallet = "Wallet",
  Chat = "Chat",
  CreatePost = "CreatePost",
}

export const TAB_ROUTES: Array<{
  component: React.FC<any>
  icon: React.ElementType
  name: keyof TabParamList
  translationKey: TxKeyPath
}> = [
  {
    component: HomeTabNavigator,
    icon: Article,
    name: RouteName.Home,
    translationKey: "tabNavigator:feed",
  },
  {
    component: Screens.PointsScreen,
    icon: Coins,
    name: RouteName.Points,
    translationKey: "tabNavigator:points",
  },
  {
    component: Screens.CreatePostScreen,
    icon: Plus,
    name: RouteName.CreatePost,
    translationKey: "tabNavigator:createPost",
  },
  {
    component: Screens.NotificationsScreen,
    icon: Bell,
    name: RouteName.Notifications,
    translationKey: "tabNavigator:notifications",
  },
  // {
  //   component: Screens.WalletScreen,
  //   icon: Wallet,
  //   name: RouteName.Wallet,
  //   translationKey: "tabNavigator:wallet",
  // },
  {
    component: Screens.ChatScreen,
    icon: Chat,
    name: RouteName.Chat,
    translationKey: "tabNavigator:chat",
  },
]
