import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import PeerPrepLogo from "./PeerPrepLogo";

const NavBar = ({
  withSettings,
  withHomePage,
  withoutAnything,
  activeLink,
  whereToGoOnClick,
  withAdmin,
}: NavBarProps) => {
  const { logout } = useAuth();

  return (
    <>
      <Box>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          bg="white"
          position={"sticky"}
          p={2}
        >
          <Box transform={"scale(0.6)"}>
            <PeerPrepLogo activeLink={activeLink} link={whereToGoOnClick} />
          </Box>
          <Spacer />
          {withoutAnything ?? (
            <Box mr={10} textAlign={"left"}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant={"outline"}
                />
                <MenuList p={2} bg={"white"}>
                  {withHomePage ?? (
                    <MenuGroup title={"NAVIGATE"}>
                      <Link to={"/userprofile"}>
                        <MenuItem fontWeight={"normal"}>Home</MenuItem>
                      </Link>
                    </MenuGroup>
                  )}
                  {withAdmin ? (
                    <MenuGroup title={"ADMIN"}>
                      <Link to={"/questionslist"}>
                        <MenuItem fontWeight={"normal"}>Admin</MenuItem>
                      </Link>
                    </MenuGroup>
                  ): (
                    <></>
                  )}
                  {withSettings ?? (
                    <MenuGroup title={"PROFILE"}>
                      <Link to={"/editprofile"}>
                        <MenuItem fontWeight={"normal"}>User Settings</MenuItem>
                      </Link>
                      <Link to={"/"}>
                        <MenuItem onClick={logout} fontWeight={"normal"}>
                          Logout
                        </MenuItem>
                      </Link>
                    </MenuGroup>
                  )}
                  <MenuDivider />
                  <MenuGroup title={"HELP"}>
                    <Link to={"https://github.com/s7manth"}>
                      <MenuItem fontWeight={"normal"}>GitHub</MenuItem>
                    </Link>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Box>
          )}
        </Flex>
        <Divider />
      </Box>
    </>
  );
};

interface NavBarProps {
  withSettings?: boolean;
  withHomePage?: boolean;
  withoutAnything?: boolean;
  activeLink?: boolean;
  whereToGoOnClick: string;
  withAdmin: boolean;
}

export default NavBar;
