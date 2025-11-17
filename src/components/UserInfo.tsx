"use client"

import React from 'react'
import { auth } from "../utils/firebase"
import { useRouter } from "next/navigation"
import { Text, Flex, IconButton, Menu, Portal } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { DEFAULT_DISPLAY_NAME, LOGOUT_CONFIRM_MESSAGE } from '@/constants'
import { LuUser } from "react-icons/lu"

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
      <Flex 
        id="user-information" 
        justifyContent="flex-end" 
        alignItems="center" 
        gap={4}
        marginBottom={{ mdTo2xl: 16, base: 4 }}
      >
        <Text>{user?.displayName ?? DEFAULT_DISPLAY_NAME}</Text>
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton 
              rounded="full"  
              size="sm" 
              aria-label="user-info"
              variant="outline"
            >
              <LuUser />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {!isEditMode 
                  ? <Menu.Item onClick={()=>router.push("/edit-profile")} value="edit-profile">회원 정보</Menu.Item>
                  : <Menu.Item onClick={()=>router.push("/")} value="main-page">메인 화면</Menu.Item>
              }
                <Menu.Item onClick={onClickLogout} value="sign-out">로그아웃</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
  )
}
