import { className } from "@/constants"
import { colors } from "@/constants/palette"
import { Box, Button } from "@chakra-ui/react"
import React from "react"
import { GitHubAuthButton } from "../shared/SocialAuthButton/GitHubAuthButton"
import { FacebookAuthButton } from "../shared/SocialAuthButton/FacebookAuthButton"
import { GoogleAuthButton } from "../shared/SocialAuthButton/GoogleAuthButton"

type Props = {
  isSignIn: boolean
}

export const SocialAuth = ({ isSignIn = false }: Props) => (
    <Box display="flex" flexDirection="column" gap={4}>
        <GitHubAuthButton isSignIn={isSignIn} />
        <FacebookAuthButton isSignIn={isSignIn} />
        <GoogleAuthButton isSignIn={isSignIn} />
    </Box>
)