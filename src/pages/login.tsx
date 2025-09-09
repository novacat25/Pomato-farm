import { Box, Button, Input, Separator, SkeletonCircle, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { SocialLogin } from "@/components/SocialLogin"

export default function Login() {
  return (
    <section>
        <Box 
            background="lightgrey" 
            padding="4" 
        >
            <Button>서비스 소개</Button>
            <SkeletonCircle justifySelf="center" size={{ mdTo2xl: 96, base: 48 }} />
            <Text textAlign="center">당신의 생산성을 위한 토마토 농사</Text>
            <Input />
            <PasswordInput />
            <Text textAlign="right">비밀번호를 잊어버리신 경우</Text>
            <Button>Login</Button>
            <Text>계정이 없으신가요? 계정 생성</Text>
            <Separator marginY={8} />
            <SocialLogin />
        </Box>
    </section>
  )
}
