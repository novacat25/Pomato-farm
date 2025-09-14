import { Box, Button } from "@chakra-ui/react"
import React from 'react'

export const SocialLogin = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Button>GitHub 계정으로 로그인</Button>
      <Button>Facebook 계정으로 로그인</Button>
      <Button>Google 계정으로 로그인</Button>
    </Box>
  )
}
