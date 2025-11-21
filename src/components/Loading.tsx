import React from 'react'
import { AbsoluteCenter, HStack, Spinner, Text } from "@chakra-ui/react"

export const LoadingDisplay = () => {
  return (
  <AbsoluteCenter backdropFilter="blur(2px)" rounded="md" p="4">
    <HStack gap="3">
      <Spinner size="sm" colorPalette="blue" />
      <Text color="fg.muted">
        Loading...
      </Text>
    </HStack>
  </AbsoluteCenter>
  )
}
