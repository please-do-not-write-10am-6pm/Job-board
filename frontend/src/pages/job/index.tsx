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
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAppDispatch } from "redux/store";
import {
  approveJobAction,
  blockJobAction,
  getAllJobsAction,
} from "redux/slices/jobSlice/job.action";
import { useSelector } from "react-redux";
import { jobSelectors } from "redux/slices/jobSlice";
import {
  CheckIcon,
  EditIcon,
  EmailIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";
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
  const [jobid, setJobId] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const currentUser = useSelector(authSelectors.currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseModal = () => {
    setJobId(null);
    onClose();
  };

  useEffect(() => {
    dispatch(getAllJobsAction());
  }, [dispatch]);

  const handleApproveJob = (id: number | undefined) => {
    id &&
      dispatch(approveJobAction(id))
        .unwrap()
        .then((res) => {
          toast(res.status);
          dispatch(getAllJobsAction());
        })
        .catch((error) => {
          toast.warn(error.message);
        });
  };

  const handleBlockJob = (id: number | undefined) => {
    console.log("blockId", id);
    id &&
      dispatch(blockJobAction(id))
        .unwrap()
        .then((res) => {
          toast(res.status);
          dispatch(getAllJobsAction());
        })
        .catch((error) => {
          toast.warn(error.message);
        });
  };

  const allJobs = useSelector(jobSelectors.allJobs);

  const goCreateJobPage = () => {
    navigator("/job/create");
  };

  const goEditJobPage = (id: number | undefined) => {
    navigator(`/job/${id}/edit`);
  };

  const onOpenModal = (id: number | undefined) => {
    if (id) {
      setJobId(id);
    }
  };

  useEffect(() => {
    if (jobid) {
      onOpen();
    }
  }, [jobid, onOpen]);

  return (
    <>
      {currentUser.role !== "freelancer" && (
        <Button
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
            _dark={{ bg: "#3e3e3e" }}
            pt={1}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              bg={job.isApproved ? "" : "gray.300"}
              mx="auto"
              px={8}
              py={4}
              rounded="lg"
              shadow="lg"
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
                {job.isApproved ? (
                  <IconButton
                    colorScheme="gray"
                    ml={3}
                    icon={<NotAllowedIcon />}
                    aria-label="Edit"
                    onClick={() => handleBlockJob(job.id)}
                  />
                ) : (
                  <IconButton
                    colorScheme="green"
                    ml={3}
                    icon={<CheckIcon />}
                    aria-label="Edit"
                    onClick={() => handleApproveJob(job.id)}
                  />
                )}
              </Flex>
              <Box mt={2}>
                <Link
                  as={ReactRouterLink}
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
                  to={`/job/${job.id}`}
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
                  as={ReactRouterLink}
                  color="brand.600"
                  _dark={{ color: "brand.400" }}
                  _hover={{ textDecor: "underline" }}
                  to={`/job/${job.id}`}
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
                    as={ReactRouterLink}
                    color="gray.700"
                    _dark={{ color: "gray.200" }}
                    fontWeight="700"
                    cursor="pointer"
                    to={"#"}
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
                  navigator(`/job/${jobid}`);
                  onCloseModal();
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
                <Button onClick={onCloseModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}
