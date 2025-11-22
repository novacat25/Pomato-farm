"use client"

import React from "react"
import { auth } from "../../utils/firebase"
import { useRouter } from "next/navigation"
import {
  Text,
  Flex,
  IconButton,
  Menu,
  Button,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react"
import { User } from "firebase/auth"
import { DEFAULT_DISPLAY_NAME, message } from "@/constants"
import { LuUser } from "react-icons/lu"
import { colors } from "@/constants/palette"

type Props = {
  user: User | null | undefined
  isEditMode?: boolean
}

export const UserInfo = ({ user, isEditMode = false }: Props) => {
  const router = useRouter()

  const onClickLogout = async () => {
    try {
      await auth.signOut()
      router.push("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog.Root>
      <Flex
        id="user-information"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
        marginBottom={2.5}
      >
        <Text>
          안녕하세요, &nbsp; 
          <span className="user-name">{user?.displayName ?? DEFAULT_DISPLAY_NAME}</span>
          &nbsp;님
        </Text>
        
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              backgroundColor={colors.primary.main}
              rounded="full"
              size="sm"
              aria-label="user-info"
              variant="outline"
            >
              <LuUser color="white" />
            </IconButton>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              {!isEditMode ? (
                <Menu.Item
                  onClick={() => router.push("/edit-profile")}
                  value="edit-profile"
                >
                  회원 정보
                </Menu.Item>
              ) : (
                <Menu.Item onClick={() => router.push("/")} value="main-page">
                  메인 화면
                </Menu.Item>
              )}
              <Dialog.Trigger asChild>
                <Menu.Item value="sign-out">로그아웃</Menu.Item>
              </Dialog.Trigger>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Flex>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>로그아웃</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{message.info.LOGOUT_CONFIRM_MESSAGE}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  backgroundColor={colors.primary.main}
                  onClick={onClickLogout}
                >
                  네
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button backgroundColor={colors.primary.secondary}>아니오</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
