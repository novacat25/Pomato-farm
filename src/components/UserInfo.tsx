"use client"

import React from 'react'
import { useRouter } from "next/navigation"
import { Text, Flex, Button } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { DEFAULT_DISPLAY_NAME } from '@/constants'

type Props = {
  user: User | null | undefined
  onClickLogout?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}

export const UserInfo = ({ user, onClickLogout }: Props) => {
  const router = useRouter()

  return (
      <Flex id="user-information" justifyContent="flex-end" alignItems="center" gap={4}>
        <Text>{user?.displayName ?? DEFAULT_DISPLAY_NAME}</Text>
        <Button onClick={()=>router.push("/edit-profile")}>Edit</Button>
        <Button onClick={onClickLogout}>LogOut</Button>
      </Flex>
  )
}
