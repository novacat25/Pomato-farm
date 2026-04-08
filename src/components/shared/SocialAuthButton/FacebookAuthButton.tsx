import React from 'react'
import { Button } from "@chakra-ui/react"
import { className } from '@/constants'
import { colors } from '@/constants/palette'

type Props = {
    isSignIn: boolean
}

export const FacebookAuthButton = ({ isSignIn = false}: Props) => {
    const authText = isSignIn ? "로그인" : "계정 생성"

  return (
      <Button
        className={className.pomatoButton}
        backgroundColor={colors.social.facebook}
        borderRadius={8}
      >
        Facebook 계정으로 {authText}
      </Button>
  )
}
