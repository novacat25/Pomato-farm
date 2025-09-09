import { Text, Flex, SkeletonCircle, NumberInput } from "@chakra-ui/react"

export const PomatoFarm = () => {
  return (
    <Flex direction="column" gap={4}>
      <SkeletonCircle justifySelf="center" size={{ mdTo2xl: 96, base: 48 }} />
        <NumberInput.Root width="200px" defaultValue="15" min={15} max={45}>
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
