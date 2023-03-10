import { Box } from '@mui/material'
import React from 'react'

import { Layout, LayoutStyles } from './Layout'
import { PageContextProvider } from './PageContext'
import { Header } from '../UI/Header/Header'
import { AgeGatePage, useAgeGate } from '../User/AgeGate'

interface PublicLayoutProps {
  thinHeader?: boolean
  disableAgeGate?: boolean
  tagId?: string
  galleryId?: string
}

export const PublicLayout: Layout<PublicLayoutProps> = ({
  disableAgeGate = true,
  tagId,
  galleryId,
  children,
}) => {
  const { verified: ageVerified } = useAgeGate()
  if (!disableAgeGate && !ageVerified) return <AgeGatePage />

  return (
    <Box sx={LayoutStyles.layout}>
      <Box sx={LayoutStyles.header}>
        <Header />
      </Box>

      <Box component="main" sx={LayoutStyles.main}>
        <PageContextProvider tagId={tagId} galleryId={galleryId}>
          <Box sx={LayoutStyles.content}>
            {children}
          </Box>
        </PageContextProvider>

        <Box sx={{ textAlign: 'center', padding: 2 }}>
          &copy; Zeragamba {new Date().getFullYear()}
        </Box>
      </Box>
    </Box>
  )
}
