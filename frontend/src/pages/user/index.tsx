import React, { useEffect } from "react";
import {
  ButtonGroup,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  approveUserAction,
  blockUserAction,
  getAllUserAction,
} from "redux/slices/userSlice/user.action";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { userSelectors } from "redux/slices/userSlice";
import { toast } from "react-toastify";
import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";

export default function UserPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);

  const users = useSelector(userSelectors.allUsers);

  const handleApproveUser = (id: number) => {
    dispatch(approveUserAction(id))
      .unwrap()
      .then((res) => {
        toast(res.status);
        dispatch(getAllUserAction());
        console.log("getAllUserAction is done after approved user");
      })
      .catch((error) => {
        toast.warn(error.message);
      });
  };

  const handleBlockUser = (id: number) => {
    dispatch(blockUserAction(id))
      .unwrap()
      .then((res) => {
        toast(res.status);
        dispatch(getAllUserAction());
        console.log("getAllUserAction is done after blocked user");
      })
      .catch((error) => {
        toast.warn(error.message);
      });
  };

  const header = [
    "No",
    "name",
    "email",
    "role",
    "title",
    "description",
    "rate",
  ];

  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      alignItems="center"
      justifyContent="center"
    >
      <Table
        w="full"
        bg="white"
        _dark={{ bg: "gray.800" }}
        display={{
          base: "block",
          md: "table",
        }}
        sx={{
          "@media print": {
            display: "table",
          },
        }}
      >
        <Thead
          display={{
            base: "none",
            md: "table-header-group",
          }}
          sx={{
            "@media print": {
              display: "table-header-group",
            },
          }}
        >
          <Tr>
            {header.map((x) => (
              <Th key={x}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          display={{
            base: "block",
            lg: "table-row-group",
          }}
          sx={{
            "@media print": {
              display: "table-row-group",
            },
          }}
        >
          {users.map((user: any, tid) => {
            return (
              <Tr
                key={tid}
                display={{
                  base: "grid",
                  md: "table-row",
                }}
                sx={{
                  "@media print": {
                    display: "table-row",
                  },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
              >
                {Object.keys(user).map((x) => {
                  return (
                    <React.Fragment key={`${tid}${x}`}>
                      <Td
                        display={{
                          base: "table-cell",
                          md: "none",
                        }}
                        sx={{
                          "@media print": {
                            display: "none",
                          },
                          textTransform: "uppercase",
                          color: color1,
                          fontSize: "xs",
                          fontWeight: "bold",
                          letterSpacing: "wider",
                          fontFamily: "heading",
                        }}
                      >
                        {x}
                      </Td>
                      <Td
                        bg={user.isApproved ? "" : "gray.300"}
                        color={"gray.800"}
                        fontSize="md"
                        fontWeight="hairline"
                      >
                        {user[x]}
                      </Td>
                    </React.Fragment>
                  );
                })}
                <Td
                  display={{
                    base: "table-cell",
                    md: "none",
                  }}
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                    textTransform: "uppercase",
                    color: color2,
                    fontSize: "xs",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    fontFamily: "heading",
                  }}
                >
                  Actions
                </Td>
                <Td bg={user.isApproved ? "" : "gray.300"}>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    {user.isApproved ? (
                      <IconButton
                        colorScheme="gray"
                        icon={<NotAllowedIcon />}
                        aria-label="Edit"
                        onClick={() => handleBlockUser(user.id)}
                      />
                    ) : (
                      <IconButton
                        colorScheme="green"
                        icon={<CheckIcon />}
                        aria-label="Edit"
                        onClick={() => handleApproveUser(user.id)}
                      />
                    )}
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}
