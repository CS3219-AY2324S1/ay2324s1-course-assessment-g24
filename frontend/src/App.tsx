import { useState } from "react";
import { Button, Container, Heading, HStack, Text } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Container size={"md"}>
        <Heading>
          PeerPrep: The only tool you need to crack your technical interviews!
        </Heading>
        <Text>Rajarshi chutiya!</Text>
        <Text>Count is {count}</Text>
        <HStack>
          <Button onClick={() => setCount(count + 1)}>
            +
          </Button>
          <Button onClick={() => setCount(count - 1)}>
            -
          </Button>
        </HStack>
      </Container>
    </>
  )
}

export default App
