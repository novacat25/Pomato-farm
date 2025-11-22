"use client"

import { Box, Button, Field, Fieldset, Input, Separator, Link, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialSignup } from "@/components/page-components/SocialSignup"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../utils/firebase"
import { FirebaseError } from "firebase/app"
import { useRouter } from "next/router"
import { className, DEFAULT_DISPLAY_NAME, POMATO_EMOJI } from "@/constants"
import { PomatoImage } from "@/components/shared/PomatoImage"
import { colors } from "@/constants/palette"

export default function Signup() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    
    const initialState = {
        name: "",
        email: "",
        password: "",
    }
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState("")

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!formData.email || !formData.password) return

        try {
            setIsLoading(true)
            setError("")
            const credentials = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            await updateProfile(credentials.user, { displayName: formData?.name ?? DEFAULT_DISPLAY_NAME })
            router.push("/")
        } catch (err) {
            if (err instanceof FirebaseError) {
                console.error(err)
                setError(err.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value }
        } = e

        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }))
    }

  return (
    <Box
      marginX={{ mdTo2xl: 8, base: 0 }}
      paddingX={{ mdTo2xl: 16, base: 4 }}
      paddingY={{ mdTo2xl: 8, base: 4 }}
    >
        <Box
            paddingX={8}
            paddingY={8}
            border={`1px solid ${colors.background.lightWood}`}
            backgroundColor={colors.background.lightWood}
            borderRadius={16}
        >
            <Box 
              display="flex"
              justifyContent="center"
            >
              <PomatoImage />
            </Box>
            <Text
              color={colors.primary.main}
              fontWeight={600} 
              fontSize={18}
              textAlign="center"
              marginTop={4}
              marginBottom={8}
            >
              {POMATO_EMOJI} 🌱 당신의 생산성을 위한 토마토 농사.
            </Text>
            <form onSubmit={onSubmit}>
                <Fieldset.Root>
                    <Fieldset.Content>
                        <Field.Root orientation="horizontal">
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={onChange} 
                                placeholder="닉네임" 
                                backgroundColor={colors.background.white}
                                borderRadius={8}                               
                            />
                        </Field.Root>
                        <Field.Root orientation="horizontal">
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={onChange}  
                                placeholder="example@test.com" 
                                backgroundColor={colors.background.white}
                                borderRadius={8}                                
                                required
                            />
                        </Field.Root>
                        <Field.Root orientation="horizontal">
                            <PasswordInput
                                name="password"
                                value={formData.password}
                                onChange={onChange}
                                backgroundColor={colors.background.white}
                                borderRadius={8}                                      
                                autoComplete="on"
                                required
                            />
                        </Field.Root>
                    </Fieldset.Content>
                    <Button
                        className={className.pomatoButton}
                        disabled={isLoading} 
                        backgroundColor={colors.background.tomato}
                        type="submit"
                        marginY={4}
                        borderRadius={8}
                    >
                        Sign Up
                    </Button>
                </Fieldset.Root>
                <Text>
                    계정이 있으신가요?&nbsp;
                    <Link
                        fontWeight={600} 
                        className={className.pomatoLink}
                        color={colors.text.tomatoGreen}
                        href="/signup"
                    >
                        로그인
                    </Link>
                </Text>
            </form>
            {error !== "" ? <Text color="red" fontWeight={600}>{error}</Text> : null}
            <Separator
                borderColor={colors.background.wood}
                 marginY={8} 
            />
            <SocialSignup />
        </Box>
    </Box>
  )
}
