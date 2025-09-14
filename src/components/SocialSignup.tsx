import { Box, Button } from "@chakra-ui/react"
import React from 'react'

export const SocialSignup = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Button>GitHub으로 계정 생성</Button>
      <Button>Facebook으로 계정 생성</Button>
      <Button>Google로 계정 생성</Button>
    </Box>
  )
}
