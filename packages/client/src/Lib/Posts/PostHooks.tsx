import { useContext } from "react"
import { PostContext } from "./PostContext.tsx"

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) throw new Error("Not within a PostProvider")
  return context
}
