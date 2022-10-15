import { FC, ReactNode } from 'react'

export type LayoutProps = {
  children?: ReactNode
}

export type Layout<Props = {}> = FC<LayoutProps & Props>
