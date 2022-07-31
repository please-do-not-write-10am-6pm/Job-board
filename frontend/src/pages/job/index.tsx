import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  chakra,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  ModalFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { BasicLayout } from "pages/__layout/BasicLayout";
import { useAppDispatch } from "redux/store";
import { getAllJobsAction } from "redux/slices/jobSlice/job.action";
import { useSelector } from "react-redux";
import { jobSelectors } from "redux/slices/jobSlice";
import { EditIcon, EmailIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { authSelectors } from "redux/slices/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { createBidAction } from "redux/slices/bidSlice/bid.action";
import { toast } from "react-toastify";

export const BidSchema = Yup.object().shape({
  content: Yup.string()
    .max(250, "Must be 20 characters or less")
    .required("Required"),
  rate: Yup.string().required("Required"),
});

export default function App() {
  const [jobid, setJobId] = useState(0);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const currentUser = useSelector(authSelectors.currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    localStorage.getItem("token") && dispatch(getAllJobsAction());
  }, [dispatch]);

  const allJobs = useSelector(jobSelectors.allJobs);

  const goCreateJobPage = () => {
    navigator("/job/create");
  };

  const goEditJobPage = (id: any) => {
    navigator(`/job/update/${id}`);
  };

  const onOpenModal = (id: number | undefined) => {
    if (id) {
      setJobId(id);
      onOpen();
    }
  };

  return (
    <BasicLayout>
      {currentUser.role !== "freelancer" && (
        <Button
          /* flex={1} */
          px={4}
          mt={"4"}
          ml={"4"}
          fontSize={"sm"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
          maxW={"15vh"}
          onClick={goCreateJobPage}
        >
          Create Job
        </Button>
      )}
      {allJobs.map((job, num) => {
        return (
          <Flex
            key={num}
            // bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            pt={1}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              mx="auto"
              px={8}
              py={4}
              rounded="lg"
              shadow="lg"
              bg="white"
              _dark={{ bg: "gray.800" }}
              minW="80%"
            >
              <Flex justifyContent="end" alignItems="center">
                {currentUser.role !== "freelancer" ? (
                  <IconButton
                    float={"right"}
                    px={3}
                    py={1}
                    bg="gray.600"
                    color="gray.100"
                    fontSize="sm"
                    fontWeight={"700"}
                    rounded="md"
                    _hover={{ bg: "gray.500" }}
                    colorScheme="green"
                    icon={<EditIcon />}
                    aria-label="Edit"
                    onClick={() => goEditJobPage(job.id)}
                  />
                ) : (
                  <IconButton
                    px={3}
                    py={1}
                    bg="gray.600"
                    color="gray.100"
                    fontSize="sm"
                    fontWeight={"700"}
                    rounded="md"
                    _hover={{ bg: "gray.500" }}
                    colorScheme="green"
                    icon={<EmailIcon />}
                    aria-label="CreateBId"
                    onClick={() => onOpenModal(job.id)}
                  />
                )}
              </Flex>
              <Box mt={2}>
                <Link
                  fontSize="2xl"
                  color="gray.700"
                  _dark={{ color: "white" }}
                  fontWeight="700"
                  _hover={{
                    color: "gray.600",
                    _dark: {
                      color: "gray.200",
                    },
                    textDecor: "underline",
                  }}
                  href={`/job/detail/${job.id}`}
                >
                  {job.title}
                </Link>
                <chakra.p mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                  {job.description}
                  {" - "}
                  <chakra.strong color={"gray.700"}>{job.rate} $</chakra.strong>
                </chakra.p>
              </Box>

              <Flex justifyContent="space-between" alignItems="center" mt={4}>
                <Link
                  color="brand.600"
                  _dark={{ color: "brand.400" }}
                  _hover={{ textDecor: "underline" }}
                  href={`/job/detail/${job.id}`}
                >
                  Read more
                </Link>

                <Flex alignItems="center">
                  <Image
                    mx={4}
                    w={10}
                    h={10}
                    rounded="full"
                    fit="cover"
                    display={{ base: "none", sm: "block" }}
                    src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                    alt="avatar"
                  />
                  <Link
                    color="gray.700"
                    _dark={{ color: "gray.200" }}
                    fontWeight="700"
                    cursor="pointer"
                  >
                    {job.author.name}
                  </Link>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        );
      })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{ content: "", rate: "" }}
          validationSchema={BidSchema}
          onSubmit={(values) => {
            if (jobid) {
              dispatch(
                createBidAction({
                  jobId: jobid,
                  data: { ...values },
                })
              )
                .unwrap()
                .then((res) => {
                  toast(res.status);
                  navigator(`/job/detail/${jobid}`);
                })
                .catch((error) => {
                  toast.warn(error.message);
                });
            } else {
              toast.warn("Must be selected a id");
            }
          }}
        >
          <Form>
            <ModalOverlay
              bg="blackAlpha.300"
              backdropFilter="blur(10px) hue-rotate(90deg)"
            />
            <ModalContent>
              <ModalHeader>Feel free to Send a bid</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={10}>
                <FormLabel>Content</FormLabel>
                <Field
                  style={{
                    minWidth: "-webkit-fill-available",
                    borderWidth: "thin",
                    borderRadius: "5px",
                    padding: "8px",
                  }}
                  type="text"
                  name="content"
                  // ref={initialRef}
                  placeholder="Here is a content"
                />
                <ErrorMessage className="errorMsg" name="content" />
                <FormLabel>Rate</FormLabel>
                <Field
                  style={{
                    minWidth: "-webkit-fill-available",
                    borderWidth: "thin",
                    borderRadius: "5px",
                    padding: "8px",
                  }}
                  type="number"
                  name="rate"
                  placeholder="Here is your rate"
                />
                <ErrorMessage className="errorMsg" name="rate" />
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  colorScheme="blue"
                  _hover={{ bg: "blue.500" }}
                  mr={3}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        </Formik>
      </Modal>
    </BasicLayout>
  );
}