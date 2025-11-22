"use client"

import { Box, Button, Input, Link, Separator, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialLogin } from "@/components/page-components/SocialLogin"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { auth } from "../utils/firebase"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { colors } from "@/constants/palette"
import { PomatoImage } from "@/components/shared/PomatoImage"
import { className, POMATO_EMOJI } from "@/constants"

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/")
      }
    })
    return () => unsubscribe()
    }, [router])


  const [isLoading, setIsLoading] = useState(false)
      
  const initialState = {
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
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
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
              <Input 
                name="email"
                value={formData.email}
                onChange={onChange}
                backgroundColor={colors.background.white}
                borderRadius={8}
                marginBottom={2}
                required 
                placeholder="pomato-farmer@pomato.com" 
              />
              <PasswordInput  
                name="password"
                value={formData.password}
                onChange={onChange}
                backgroundColor={colors.background.white}
                borderRadius={8} 
                required 
                autoComplete="on" 
              />
              <Text
                marginTop={4}
                textAlign="right"
              >
                비밀번호를 잊어버리신 경우
              </Text>
              <Button
                width="100%" 
                className={className.pomatoButton}
                disabled={isLoading} 
                backgroundColor={colors.background.tomato}
                type="submit"
                marginY={4}
                borderRadius={8}
              >
                Login
              </Button>
            </form>
            <Text>
              계정이 없으신가요?&nbsp; 
              <Link
                fontWeight={600} 
                className={className.pomatoLink}
                color={colors.text.tomatoGreen}
                href="/signup"
              >
                계정 생성
              </Link>
            </Text>
            {error !== "" ? <Text color="red" fontWeight={600}>{error}</Text> : null}
            <Separator
                borderColor={colors.background.wood}
                 marginY={8} 
            />
            <SocialLogin />
        </Box>
    </Box>
  )
}
