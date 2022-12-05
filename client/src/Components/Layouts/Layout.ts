import { FC, ReactNode } from 'react'

export interface LayoutProps {
  className?: string
  children?: ReactNode
}

export type Layout<Props = {}> = FC<LayoutProps & Props>
