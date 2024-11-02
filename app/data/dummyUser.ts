export interface UserAward {
  id: string
  name: string
  icon: string
  count: number
}

export interface UserStats {
  postKarma: number
  commentKarma: number
  awardeeKarma: number
  awarderKarma: number
  totalKarma: number
  followers: number
  following: number
  accountAge: Date
}

export interface UserProfile {
  id: string
  username: string
  displayName: string
  avatar: string
  banner: string
  bio: string
  stats: UserStats
  awards: UserAward[]
  isVerified: boolean
  isPremium: boolean
  isModerator: boolean
}

export const dummyUser: UserProfile = {
  id: "user123",
  username: "WildcardUser",
  displayName: "Wildcard",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop",
  banner:
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop",
  bio: "Passionate about technology, design, and building great user experiences. Love exploring new ideas and sharing knowledge with the community.",
  stats: {
    postKarma: 15234,
    commentKarma: 28976,
    awardeeKarma: 1234,
    awarderKarma: 567,
    totalKarma: 46011,
    followers: 1234,
    following: 321,
    accountAge: new Date("2021-01-01"),
  },
  awards: [
    {
      id: "gold1",
      name: "Gold",
      icon: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=100&auto=format&fit=crop",
      count: 5,
    },
    {
      id: "silver1",
      name: "Silver",
      icon: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=100&auto=format&fit=crop",
      count: 12,
    },
    {
      id: "helpful1",
      name: "Helpful",
      icon: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=100&auto=format&fit=crop",
      count: 25,
    },
  ],
  isVerified: true,
  isPremium: true,
  isModerator: true,
}
