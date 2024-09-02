import { useContext } from "react"
import { PostContext } from "./PostContext"

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) throw new Error("Not within a PostProvider")
  return context
}
