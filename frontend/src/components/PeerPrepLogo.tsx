import { Box, Text } from "@chakra-ui/react";

const PeerPrepLogo = () => {
  return (
    <Box mb={5} transform={"rotate(-2deg)"}>
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
        paddingY={1}
        paddingX={4}
      >
        PeerPrep
      </Text>
    </Box>
  );
};

export default PeerPrepLogo;
