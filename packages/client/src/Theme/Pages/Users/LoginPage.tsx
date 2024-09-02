import { FC } from "react"
import { Navigate } from "react-router-dom"

import { useCurrentUser$ } from "../../../Queries"
import { LoadingSpinner, LoginForm } from "../../Components"

type LoginPageProps = {
  slots?: Partial<LoginPageSlots>
}

type LoginPageSlots = {
  LoginForm: FC
  LoadingSpinner: FC
}

const defaultSlots: LoginPageSlots = {
  LoginForm,
  LoadingSpinner,
}

export const LoginPage: FC<LoginPageProps> = ({ slots = {} }) => {
  const { LoginForm, LoadingSpinner } = { ...defaultSlots, ...slots }

  const user$ = useCurrentUser$()
  if (user$.isFetching) return <LoadingSpinner />
  if (user$.data) return <Navigate to={"/"} />

  return <LoginForm />
}
