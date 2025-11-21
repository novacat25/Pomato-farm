"use client"

import { Box, Button, Field, Fieldset, Input, Separator, SkeletonCircle, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialSignup } from "@/components/page-components/SocialSignup"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../utils/firebase"
import { FirebaseError } from "firebase/app"
import { useRouter } from "next/router"
import { DEFAULT_DISPLAY_NAME } from "@/constants"

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
    <section>
        <Box 
            background="lightgrey" 
            paddingX={8}
            paddingTop={8}
            paddingBottom={16}
            margin={8}
        >
            <Button>서비스 소개</Button>
            <SkeletonCircle justifySelf="center" size={{ mdTo2xl: 96, base: 48 }} />
            <Text textAlign="center">당신의 생산성을 위한 토마토 농사</Text>
            <form onSubmit={onSubmit}>
                <Fieldset.Root>
                    <Fieldset.Content>
                        <Field.Root orientation="horizontal">
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={onChange} 
                                placeholder="닉네임" 
                            />
                        </Field.Root>
                        <Field.Root orientation="horizontal">
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={onChange}  
                                placeholder="example@test.com" 
                                required
                            />
                        </Field.Root>
                        <Field.Root orientation="horizontal">
                            <PasswordInput
                                name="password"
                                value={formData.password}
                                onChange={onChange}
                                autoComplete="on"
                                required
                            />
                        </Field.Root>
                    </Fieldset.Content>
                    <Button type="submit">Sign up</Button>
                </Fieldset.Root>
                <Text>계정이 있으신가요? 로그인</Text>
            </form>
            {error !== "" ? <Text color="red" fontWeight={600}>{error}</Text> : null}
            <Separator marginY={8} />
            <SocialSignup />
        </Box>
    </section>
  )
}
