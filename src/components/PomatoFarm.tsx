import { Text, Flex, SkeletonCircle, NumberInput, Box } from "@chakra-ui/react"
import { User } from "firebase/auth"

type Props = {
    user: User | null | undefined
}

export const PomatoFarm = ({ user }: Props) => {
  const onClick = () => {
    console.log(user)
  }

  return (
    <Flex direction="column" gap={4}>
      <Box
        cursor="pointer"
        onClick={onClick}
      >
        <SkeletonCircle 
          justifySelf="center" 
          size={{ mdTo2xl: 96, base: 48 }} 
        />
      </Box>
        <NumberInput.Root 
          width="200px" 
          defaultValue="15" 
          min={15} 
          max={45}
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
        <Text>
          오늘 파밍한 토마토 수
        </Text>
        <Text>
          ToDo List
        </Text>
    </Flex>
  )
}
