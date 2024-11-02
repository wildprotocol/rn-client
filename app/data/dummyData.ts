// Subcategory icons using random Unsplash images
export const subcategoryIcons = {
  AskWildcard:
    "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?w=100&auto=format&fit=crop", // Question mark
  personalfinance:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&auto=format&fit=crop", // Money
  science:
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=100&auto=format&fit=crop", // Science lab
  technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop", // Tech
  pics: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&auto=format&fit=crop", // Camera
  aww: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&auto=format&fit=crop", // Cat
  movies: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=100&auto=format&fit=crop", // Cinema
  gaming: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&auto=format&fit=crop", // Gaming
  IAmA: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", // Person
  space: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop", // Space
}

// Add author interface
export interface Author {
  username: string
  display_name: string
  avatar: string
}

// Add some dummy authors
const authors = {
  wildcard_mod: {
    username: "wildcard_mod",
    display_name: "Wildcard Moderator",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&auto=format&fit=crop",
  },
  finance_guru: {
    username: "finance_guru",
    display_name: "Personal Finance Expert",
    avatar: "https://images.unsplash.com/photo-1553514029-1318c9127859?w=100&auto=format&fit=crop",
  },
  quantum_scientist: {
    username: "quantum_scientist",
    display_name: "Dr. Quantum",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&auto=format&fit=crop",
  },
  tech_insider: {
    username: "tech_insider",
    display_name: "Tech Insider",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop",
  },
  nature_photographer: {
    username: "nature_photographer",
    display_name: "Canyon Explorer",
    avatar: "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=100&auto=format&fit=crop",
  },
  cat_lover: {
    username: "cat_lover",
    display_name: "Crazy Cat Person",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop",
  },
  movie_buff: {
    username: "movie_buff",
    display_name: "Cinema Enthusiast",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
  },
  gaming_insider: {
    username: "gaming_insider",
    display_name: "Pro Gamer",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop",
  },
  bill_gates: {
    username: "thisisbillg",
    display_name: "Bill Gates",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&auto=format&fit=crop",
  },
  astronaut: {
    username: "space_explorer",
    display_name: "Astronaut Jane",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
  },
  rog_gaming: {
    username: "rog_official",
    display_name: "ROG Gaming",
    avatar:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&auto=format&fit=crop",
  },
}

// Update each post in dummyPosts to include an author
export const dummyPosts = [
  // Text posts
  {
    id: 1,
    author: authors.wildcard_mod,
    type: "text" as const,
    subcategory: "AskWildcard",
    subcategoryIcon: subcategoryIcons.AskWildcard,
    title: "What's a skill you thought was useless but turned out to be incredibly valuable?",
    preview:
      "I'll start: Learning to touch type. I thought it was just a gimmick in school, but it's saved me countless hours in my professional life.",
    imageUrl:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=800&auto=format&fit=crop",
    votes: 0,
    comments: 4,
    tips: 10,
    promoted: true,
  },
  {
    id: 2,
    author: authors.finance_guru,
    type: "text" as const,
    subcategory: "personalfinance",
    subcategoryIcon: subcategoryIcons.personalfinance,
    title: "I just paid off all my student loans! Here's how I did it.",
    preview:
      "It took me 5 years, but I finally did it. Here's my strategy: 1. Lived with roommates to save on rent. 2. Cooked all my meals at home. 3. Used the snowball method to tackle debts...",
    imageUrl:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop",
    votes: 15200,
    comments: 2,
    tips: 5,
  },

  // Link posts
  {
    id: 3,
    author: authors.quantum_scientist,
    type: "link" as const,
    subcategory: "science",
    subcategoryIcon: subcategoryIcons.science,
    title: "New study reveals potential breakthrough in quantum computing",
    linkUrl: "https://www.nature.com/articles/d41586-023-00029-w",
    source: "nature.com",
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    votes: 8900,
    comments: 2,
    tips: 3,
    promoted: true,
  },
  {
    id: 4,
    author: authors.tech_insider,
    type: "link" as const,
    subcategory: "technology",
    subcategoryIcon: subcategoryIcons.technology,
    title: "Apple announces new M3 chip with breakthrough AI capabilities",
    linkUrl: "https://www.theverge.com/2023/6/5/23738500/apple-m3-chip-announcement-wwdc-2023",
    source: "theverge.com",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop",
    votes: 12400,
    comments: 0,
    tips: 2,
  },

  // Media posts
  {
    id: 5,
    author: authors.nature_photographer,
    type: "media" as const,
    subcategory: "pics",
    subcategoryIcon: subcategoryIcons.pics,
    title: "Sunset over the Grand Canyon",
    imageUrl:
      "https://images.unsplash.com/photo-1502375751885-4f494926ce5c?w=800&auto=format&fit=crop",
    votes: 45600,
    comments: 4,
    tips: 15,
  },
  {
    id: 6,
    author: authors.cat_lover,
    type: "media" as const,
    subcategory: "aww",
    subcategoryIcon: subcategoryIcons.aww,
    title: "My rescue kitten's first day home",
    imageUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop",
    votes: 28900,
    comments: 0,
    tips: 8,
  },

  // Poll posts
  {
    id: 7,
    author: authors.movie_buff,
    type: "poll" as const,
    subcategory: "movies",
    subcategoryIcon: subcategoryIcons.movies,
    title: "What's the best Christopher Nolan movie?",
    pollOptions: [
      "Inception",
      "The Dark Knight",
      "Interstellar",
      "Memento",
      "Other (comment below)",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop",
    votes: 0,
    comments: 0,
    tips: 1,
  },
  {
    id: 8,
    author: authors.gaming_insider,
    type: "poll" as const,
    subcategory: "gaming",
    subcategoryIcon: subcategoryIcons.gaming,
    title: "Which next-gen console do you prefer?",
    pollOptions: ["PlayStation 5", "Xbox Series X", "Nintendo Switch", "PC Master Race"],
    imageUrl:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop",
    votes: 8900,
    comments: 0,
    tips: 2,
  },

  // AMA posts
  {
    id: 9,
    author: authors.bill_gates,
    type: "AMA" as const,
    subcategory: "IAmA",
    subcategoryIcon: subcategoryIcons.IAmA,
    title: "I'm Bill Gates, co-chair of the Bill & Melinda Gates Foundation. Ask Me Anything.",
    AMAHost: "Bill Gates",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop",
    votes: 62100,
    comments: 0,
    tips: 50,
  },
  {
    id: 10,
    author: authors.astronaut,
    type: "AMA" as const,
    subcategory: "space",
    subcategoryIcon: subcategoryIcons.space,
    title: "I'm an astronaut who's spent 6 months on the ISS. Ask Me Anything!",
    AMAHost: "Astronaut Jane Doe",
    imageUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop",
    votes: 41200,
    comments: 0,
    tips: 25,
  },

  // Promoted post
  {
    id: 11,
    author: authors.rog_gaming,
    type: "link" as const,
    subcategory: "gaming",
    subcategoryIcon: subcategoryIcons.gaming,
    title: "Experience the next level of mobile gaming with ROG Phone 6",
    linkUrl: "https://rog.asus.com/phones/rog-phone-6-model/",
    source: "asus.com",
    imageUrl:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop",
    votes: 0,
    comments: 0,
    promoted: true,
  },
]

export const SUBCATEGORIES_API_RESPONSE = [
  {
    title: "react",
    uri: "https://w7.pngwing.com/pngs/403/269/png-transparent-react-react-native-logos-brands-in-colors-icon-thumbnail.png",
    onlineCount: 123,
  },
  {
    title: "rust",
    uri: "https://balticanebula.com/content/images/2023/06/rust_banner.png",
    onlineCount: 231,
  },
  {
    title: "react-native",
    uri: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
    onlineCount: 123,
  },
  {
    title: "javascript",
    uri: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    onlineCount: 54,
  },
  {
    title: "typescript",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDJsL2jqKN1l5dZjnPbbwvg5uhOTFhSO2yBoRSEij9VFltD0CKWUu06g7QZfkYlSiiIo&usqp=CAU",
    onlineCount: 267,
  },
]
