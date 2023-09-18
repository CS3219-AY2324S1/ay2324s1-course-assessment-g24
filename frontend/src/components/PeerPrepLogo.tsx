import { Box, Text } from "@chakra-ui/react";

const PeerPrepLogo = () => {
  return (
    <Box transform={"rotate(-2deg)"} mx={4} my={1}>
      <Text
        fontSize={{
          base: "4xl",
          md: "6xl",
        }}
        fontWeight="bold"
        lineHeight="none"
        letterSpacing={{
          base: "normal",
          md: "tight",
        }}
        color={"white"}
        display={{
          lg: "inline",
        }}
        backgroundImage={
          "linear-gradient(to right, #F27121cc, #E94057cc, #8A2387cc)"
        }
        borderRadius={6}
        py={1}
        px={4}
      >
        PeerPrep
      </Text>
    </Box>
  );
};

export default PeerPrepLogo;
