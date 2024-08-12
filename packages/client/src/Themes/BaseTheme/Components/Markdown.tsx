import { MuiMarkdown } from 'mui-markdown'
import React, { FC } from 'react'

interface MarkdownOutputProps {
  children: string | null | undefined
}

export const Markdown: FC<MarkdownOutputProps> = ({
  children,
}) => <MuiMarkdown>{children}</MuiMarkdown>
