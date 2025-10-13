"use client"

import { auth } from "../utils/firebase"
import { Box, Button, Flex, Grid, GridItem, Heading, Input, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { updateProfile, User } from "firebase/auth"
import { UserInfo } from "@/components/UserInfo"
import { DEFAULT_DISPLAY_NAME } from "@/constants"

export default function EditProfile () {
  const router = useRouter()
  const [loggedUser, setLoggedUser] = useState<User | null>()
  const [isLoading, setIsLoading] = useState(true)

  const initialState = {
    userName: loggedUser?.displayName ?? "",
  }
  
  const [formData, setFormData] = useState(initialState)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login")
      } else {
        console.log(user)
        setIsLoading(false)
        setLoggedUser(user)
      }
    })

    return () => unsubscribe()
    }, [router])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loggedUser) {
      try {
        setIsLoading(true)
        const updateUserNamePayload = formData.userName ? { displayName: formData.userName } : { displayName: DEFAULT_DISPLAY_NAME }
        await updateProfile(loggedUser, updateUserNamePayload)
        router.push("/")
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box padding={{ mdTo2xl: 8, base: 4 }}>
      <UserInfo
        isEditMode={true} 
        user={loggedUser} 
      />
      <Box 
        background="lightgrey" 
        padding={8}
        marginTop={8}
      >
        <Heading fontSize="1.5em" marginBottom={8}>닉네임 변경</Heading>
        <form onSubmit={onSubmit}>
          <Grid 
            alignItems="center" 
            marginY={4} 
            templateColumns={{ mdTo2xl: "repeat(2,1fr)" }}
          >
            <GridItem>
              <Text fontWeight={600}>UserName</Text>
            </GridItem>
            <GridItem>
              <Input
                id="user-name" 
                name="userName" 
                onChange={onChange}
                value={formData.userName}
                placeholder={DEFAULT_DISPLAY_NAME}
                backgroundColor="rgba(255,255,255,0.5)"
              />
            </GridItem>
          </Grid>
          <Grid 
            alignItems="center"
            templateColumns={{ mdTo2xl: "repeat(2,1fr)" }}
          >
            <GridItem>
              <Text fontWeight={600}>Email</Text>
            </GridItem>
            <GridItem>{loggedUser?.email}</GridItem>
          </Grid>
          <Text 
            color="tomato" 
            fontSize="0.8em"
            marginY={4}
          >
            이름을 정하지 않으실 경우 POMATO-FARMER로 고정이 됩니다.
          </Text>
          <Flex 
            marginTop={4} 
            justifyContent="center" 
            gap={8}
          >
            <Button disabled={isLoading} type="submit">확인</Button>
            <Button onClick={()=>router.push("/")}>취소</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  )
}
