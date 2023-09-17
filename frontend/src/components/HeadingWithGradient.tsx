import {
  Heading,
  Text,
} from "@chakra-ui/react";

const HeadingWithGradient = ({
  preText,
  gradientText,
  postText,
  bgGradient,
}: {
  preText: string,
  gradientText: string,
  postText: string,
  bgGradient: string,
}) => {
  return (
    <>
      <Heading
        fontSize={{
          base: "3xl",
          md: "5xl",
        }}
        fontWeight="bold"
        lineHeight="none"
        letterSpacing={{
          base: "normal",
          md: "tight",
        }}
        color="gray.900"
        _dark={{
          color: "gray.100",
        }}
      >
        {preText}{" "}
        <Text
          display={{
            base: "block",
            lg: "inline",
          }}
          w="full"
          bgClip="text"
          bgGradient={bgGradient}
          fontWeight="extrabold"
        >
          {gradientText}
        </Text>
        {" "}{postText}
      </Heading>
    </>
  )
}

export default HeadingWithGradient;
