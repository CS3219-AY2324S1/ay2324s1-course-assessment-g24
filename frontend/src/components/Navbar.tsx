import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import PeerPrepLogo from "./PeerPrepLogo";

const NavBar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="white"
      color="black"
    >
      <Flex align="center" mr={5}>
        <Box>
          <PeerPrepLogo />
        </Box>
      </Flex>

      <Spacer />

      <Box display={{ base: "block", md: "none" }}></Box>

      <Flex
        display={{ base: "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center" // Align items vertically
      >
        <Link to="/matchmaker">
          <Button colorScheme="orange" variant="solid" mr={10}>
            Find a match
          </Button>
        </Link>

        <Menu>
          <MenuButton
            mb={1}
            mr={5}
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar
              size={"sm"}
              src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
          </MenuButton>
          <MenuList alignItems={"center"}>
            <Center>
              <Avatar
                size={"2xl"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </Center>
            <Center>
              <p>Username</p>
            </Center>
            <MenuDivider />
            <Link to={"/editprofile"}>
              <MenuItem>Account Settings</MenuItem>
            </Link>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
