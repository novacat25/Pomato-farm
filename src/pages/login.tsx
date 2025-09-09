import { Box, Button, Flex, Input, SkeletonCircle, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"

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
            <Flex gap={4}>
                <Button>Login</Button>
                <Button>Sign up</Button>
            </Flex>
        </Box>
    </section>
  )
}
