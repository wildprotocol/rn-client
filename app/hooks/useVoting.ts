import { useState } from "react"

interface UseVotingProps {
  initialVotes: number
  initialVoteStatus?: "up" | "down" | null
}

/**
 * Hook for managing post voting functionality
 *
 * Handles upvoting and downvoting logic with the following features:
 * - Tracks current vote count
 * - Manages user's vote status (up/down/none)
 * - Handles vote toggling and cancellation
 *
 * @param initialVotes - Starting vote count
 * @param initialVoteStatus - User's initial vote status
 * @returns Object containing vote state and handler functions
 *
 * @example
 * ```tsx
 * const { votes, voteStatus, handleUpvote, handleDownvote } = useVoting({
 *   initialVotes: post.votes,
 *   initialVoteStatus: null
 * })
 * ```
 */
export function useVoting({ initialVotes, initialVoteStatus = null }: UseVotingProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [voteStatus, setVoteStatus] = useState<"up" | "down" | null>(initialVoteStatus)

  const handleUpvote = () => {
    if (voteStatus === "up") {
      // Cancel upvote - reset to initial
      setVoteStatus(null)
      setVotes(initialVotes)
    } else if (voteStatus === "down") {
      // Change from downvote to upvote
      setVoteStatus("up")
      setVotes(initialVotes + 1)
    } else {
      // New upvote from neutral
      setVoteStatus("up")
      setVotes(initialVotes + 1)
    }
  }

  const handleDownvote = () => {
    if (voteStatus === "down") {
      // Cancel downvote - reset to initial
      setVoteStatus(null)
      setVotes(initialVotes)
    } else if (voteStatus === "up") {
      // Change from upvote to downvote
      setVoteStatus("down")
      setVotes(initialVotes - 1)
    } else {
      // New downvote from neutral
      setVoteStatus("down")
      setVotes(initialVotes - 1)
    }
  }

  return {
    votes,
    voteStatus,
    handleUpvote,
    handleDownvote,
  }
}
