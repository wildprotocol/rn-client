export interface Reply {
  id: string
  postId: number
  parentId: string | null
  author: string
  authorAvatar: string
  content: string
  timestamp: Date
  votes: number
  replies?: Reply[]
}

// Helper function to create timestamps relative to now
const getRelativeTime = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date
}

export const dummyReplies: Record<number, Reply[]> = {
  1: [
    {
      id: "1a",
      postId: 1,
      parentId: null,
      author: "CodingWizard",
      authorAvatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop",
      content: "Learning to code. I initially learned it as a hobby, but it turned into a career.",
      timestamp: getRelativeTime(2),
      votes: 1523,
      replies: [
        {
          id: "1a1",
          postId: 1,
          parentId: "1a",
          author: "TechEnthusiast",
          authorAvatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop",
          content: "What programming language did you start with?",
          timestamp: getRelativeTime(1),
          votes: 438,
          replies: [
            {
              id: "1a1a",
              postId: 1,
              parentId: "1a1",
              author: "CodingWizard",
              authorAvatar:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop",
              content: "Python! It's really beginner-friendly and versatile.",
              timestamp: getRelativeTime(1),
              votes: 221,
            },
          ],
        },
      ],
    },
    {
      id: "1b",
      postId: 1,
      parentId: null,
      author: "LifeHacker42",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
      content:
        "Excel. Everyone jokes about it being a basic skill but it's incredibly powerful once you master it.",
      timestamp: getRelativeTime(2),
      votes: 892,
    },
  ],

  2: [
    {
      id: "2a",
      postId: 2,
      parentId: null,
      author: "MoneyMaster",
      authorAvatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop",
      content:
        "Congratulations! The snowball method worked wonders for me too. Did you consider the avalanche method?",
      timestamp: getRelativeTime(1),
      votes: 672,
      replies: [
        {
          id: "2a1",
          postId: 2,
          parentId: "2a",
          author: "OP",
          authorAvatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
          content:
            "I did! But the psychological win of paying off smaller debts first kept me motivated.",
          timestamp: getRelativeTime(1),
          votes: 445,
        },
      ],
    },
  ],

  3: [
    {
      id: "3a",
      postId: 3,
      parentId: null,
      author: "QuantumPhysicist",
      authorAvatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format&fit=crop",
      content: "This is groundbreaking! The implications for cryptography are huge.",
      timestamp: getRelativeTime(0),
      votes: 789,
      replies: [
        {
          id: "3a1",
          postId: 3,
          parentId: "3a",
          author: "CryptoExpert",
          authorAvatar:
            "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=100&auto=format&fit=crop",
          content: "We'll need to completely rethink our current encryption standards.",
          timestamp: getRelativeTime(0),
          votes: 234,
        },
      ],
    },
  ],

  4: [],

  5: [
    {
      id: "5a",
      postId: 5,
      parentId: null,
      author: "PhotoPro",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
      content: "Amazing shot! What camera setup did you use?",
      timestamp: getRelativeTime(3),
      votes: 1234,
      replies: [
        {
          id: "5a1",
          postId: 5,
          parentId: "5a",
          author: "OP",
          authorAvatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop",
          content: "Sony A7III with a 16-35mm f/2.8 lens",
          timestamp: getRelativeTime(3),
          votes: 892,
          replies: [
            {
              id: "5a1a",
              postId: 5,
              parentId: "5a1",
              author: "CameraNewbie",
              authorAvatar:
                "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop",
              content: "Is that a good beginner camera?",
              timestamp: getRelativeTime(2),
              votes: 127,
              replies: [
                {
                  id: "5a1a1",
                  postId: 5,
                  parentId: "5a1a",
                  author: "PhotoPro",
                  authorAvatar:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
                  content:
                    "It's more of a professional camera. For beginners, I'd recommend starting with something like a Sony a6000.",
                  timestamp: getRelativeTime(2),
                  votes: 245,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
