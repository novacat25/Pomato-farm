"use client"

import React from 'react'
import { auth } from "../utils/firebase"
import { useRouter } from "next/navigation"
import { Text, Flex, Button } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { DEFAULT_DISPLAY_NAME, LOGOUT_CONFIRM_MESSAGE } from '@/constants'

type Props = {
  user: User | null | undefined
  isEditMode?: boolean
}

export const UserInfo = ({ user, isEditMode = false }: Props) => {
  const router = useRouter()

  const onClickLogout = async () => {
    const ok = confirm(LOGOUT_CONFIRM_MESSAGE)
    
    if(ok) {
      try {
        await auth.signOut()
        router.push("/login")
      } catch (err) {
        console.error(err)
      }
    }
  }  

  return (
      <Flex id="user-information" justifyContent="flex-end" alignItems="center" gap={4}>
        <Text>{user?.displayName ?? DEFAULT_DISPLAY_NAME}</Text>
        {!isEditMode && <Button onClick={()=>router.push("/edit-profile")}>Edit</Button>}
        <Button onClick={onClickLogout}>LogOut</Button>
      </Flex>
  )
}
