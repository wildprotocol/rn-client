import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { DrawerScreenProps as DrawerScreenPropsType } from "@react-navigation/drawer"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"

import { PostCardProps } from "@/components/PostCard"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export interface AppStackParamList {
  Welcome: undefined
  DrawerNavigator: undefined
  CreateCast: undefined
  Drafts: undefined
  Scheduled: undefined
  GifPicker: undefined
  PostDetails: {
    post: PostCardProps
    showComments?: boolean
  }
  Profile: undefined
  PostTo: undefined
}

// Auth Stack
export type AuthStackParamList = {
  Login: undefined
}

// Home Tab Stack
export type HomeTabParamList = {
  Feed: undefined
  SubCategory: {
    subcategoryId: string
    title: string
  }
}

// Main Tab Stack
export type TabParamList = {
  Home: undefined
  TippingArena: undefined
  Points: undefined
  Notifications: undefined
  Wallet: undefined
  Chat: undefined
  CreatePost: undefined
}

// Drawer Navigator
export type DrawerParamList = {
  TabNavigator: NavigatorScreenParams<TabParamList>
  Settings: undefined
  Profile: undefined
}

// Add AllNavigatorParams that combines all possible routes
export type AllNavigatorParams = AppStackParamList &
  AuthStackParamList &
  HomeTabParamList &
  TabParamList &
  DrawerParamList

// Add generic NavigationProp
export type NavigationProps = NativeStackNavigationProp<AllNavigatorParams>

// Navigation Props Types
export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type DrawerScreenProps<T extends keyof DrawerParamList> = CompositeScreenProps<
  DrawerScreenPropsType<DrawerParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>
