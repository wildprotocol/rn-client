import {
  BookmarkSimple,
  Clock,
  Gear,
  Lock,
  PlusCircle,
  ShieldStar,
  User,
} from "phosphor-react-native"

interface Community {
  name: string
  uri?: string
}

interface RecentlyVisited {
  name: string
  uri: string
}

export const COMMUNITIES: Community[] = [
  {
    name: "sc/programming",
    uri: "https://reddit.com/r/programming",
  },
  {
    name: "sc/reactnative",
    uri: "https://reddit.com/r/reactnative",
  },
  {
    name: "sc/javascript",
    uri: "https://reddit.com/r/javascript",
  },
]

export const RECENTLY_VISITED: RecentlyVisited[] = [
  {
    name: "programming",
    uri: "https://reddit.com/r/programming",
  },
  {
    name: "reactnative",
    uri: "https://reddit.com/r/reactnative",
  },
  {
    name: "javascript",
    uri: "https://reddit.com/r/javascript",
  },
]

export const MENU_ITEMS = [
  { id: 1, title: "Profile", icon: User },
  { id: 2, title: "Create a community", icon: PlusCircle },
  { id: 3, title: "Vault", icon: Lock },
  { id: 4, title: "Wildcard Premium", icon: ShieldStar },
  { id: 5, title: "Saved", icon: BookmarkSimple },
  { id: 6, title: "History", icon: Clock },
  { id: 7, title: "Settings", icon: Gear },
]
