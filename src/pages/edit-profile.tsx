"use client"

import { auth } from "../utils/firebase"
import { Box, Button, Flex, Grid, GridItem, Heading, Input, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { updateProfile, User } from "firebase/auth"
import { UserInfo } from "@/components/page-components/UserInfo"
import { DEFAULT_DISPLAY_NAME } from "@/constants"
import { colors } from "@/constants/palette"
import { LoadingDisplay } from "@/components/Loading"

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
        setIsLoading(false)
        setLoggedUser(user)
        console.log(user)
        if(user.displayName) setFormData({ userName: user.displayName })
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
    return <LoadingDisplay />
  }

  return loggedUser && (
    <Box
      marginX={{ mdTo2xl: 8, base: 0 }}
      paddingX={{ mdTo2xl: 16, base: 4 }}
      paddingY={{ mdTo2xl: 8, base: 4 }}
    >
      <UserInfo
        isEditMode={true} 
        user={loggedUser} 
      />
      <Box
        paddingX={{ mdTo2xl: 2, base: 0 }}
        paddingY={8}
        border={`1px solid ${colors.background.lightWood}`}
        backgroundColor={colors.background.lightWood}
        borderRadius={16}
      >
        <Heading
          textAlign="center"
          fontSize={36}
          color={colors.primary.main}
        >
          회원 정보 확인 및 변경
        </Heading>
        <Box
          backgroundColor={colors.background.white}
          paddingX={{ mdTo2xl: 32, base: 4 }}
          paddingY={4}
          marginTop={8}
          marginX={2}
          borderRadius={16}
        >
          <form onSubmit={onSubmit}>
            <Grid 
              alignItems="center" 
              templateColumns={{ mdTo2xl: "repeat(2,1fr)" }}
            >
              <GridItem>
                <Text fontWeight={600}>표시 닉네임</Text>
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
            <Text 
              color={colors.primary.main}
              fontSize="0.8em"
              marginY={2}
            >
              ※ 이름을 정하지 않으실 경우 POMATO-FARMER로 고정이 됩니다.
            </Text>
            <Grid 
              alignItems="center"
              templateColumns={{ mdTo2xl: "repeat(2,1fr)" }}
              marginBottom={2}
            >
              <GridItem>
                <Text fontWeight={600}>Email</Text>
              </GridItem>
              <GridItem>{loggedUser.email}</GridItem>
            </Grid>
            <Grid 
              alignItems="center"
              templateColumns={{ mdTo2xl: "repeat(2,1fr)" }}
              marginBottom={2}
            >
              <GridItem>
                <Text fontWeight={600}>회원 생성 일자</Text>
              </GridItem>
              <GridItem>{loggedUser.metadata.creationTime}</GridItem>
            </Grid>
            <Grid 
              alignItems="center"
              templateColumns={{ mdTo2xl: "repeat(2,1fr)" }}
              marginBottom={2}
            >
              <GridItem>
                <Text fontWeight={600}>마지막 로그인 일자</Text>
              </GridItem>
              <GridItem>{loggedUser.metadata.lastSignInTime}</GridItem>
            </Grid>            
            <Flex 
              marginTop={4} 
              justifyContent="center" 
              gap={4}
            >
              <Button
                backgroundColor={colors.button.primary} 
                className="pomato-button"
                disabled={isLoading} 
                type="submit"
              >
                확인
              </Button>
              <Button 
                backgroundColor={colors.button.secondary} 
                className="pomato-button"
                onClick={()=>router.push("/")}
              >
                취소
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
