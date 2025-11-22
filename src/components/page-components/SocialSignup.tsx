import { className } from "@/constants"
import { colors } from "@/constants/palette"
import { Box, Button } from "@chakra-ui/react"
import React from 'react'

export const SocialSignup = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Button
        className={className.pomatoButton}
        backgroundColor={colors.social.github}
        borderRadius={8}      
      >
        GitHub 계정으로 계정 생성
      </Button>
            <Button
        className={className.pomatoButton}
        backgroundColor={colors.social.facebook}
        borderRadius={8}      
      >
        Facebook 계정으로 계정 생성
      </Button>
      <Button
        className={className.pomatoButton}
        backgroundColor={colors.social.google}
        color={colors.text.black}
        borderRadius={8}      
      >
        Google 계정으로 계정 생성
      </Button>
    </Box>
  )
}
