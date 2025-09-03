import { Button, Text, Flex, Grid, GridItem } from "@chakra-ui/react"

export default function Home() {
  return (
    <section>
      <Flex id="user-information" justifyContent="flex-end" alignItems="center" gap={4}>
        <Text>Pomato-farmer-1</Text>
        <Button>Login</Button>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap="6">
        <GridItem>
          A
        </GridItem>
        <GridItem>
          B
        </GridItem>
      </Grid>
    </section>
  )
}
