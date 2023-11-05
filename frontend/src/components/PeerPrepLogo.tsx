import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PeerPrepLogo = ({
  activeLink = true
}: {
  activeLink?: boolean;
}) => {
  return (
    <Link style={!activeLink ? { pointerEvents: "none" } : {} } to={"/"}>
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
    </Link>
  );
};

export default PeerPrepLogo;
