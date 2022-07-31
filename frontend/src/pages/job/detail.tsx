import {
  Box,
  Button,
  chakra,
  Flex,
  FormLabel,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import BidCard from "components/BidCard";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bidSelectors } from "redux/slices/bidSlice";
import {
  getAllBidsOnEachJobAction,
  getBidAction,
  updateBidAction,
} from "redux/slices/bidSlice/bid.action";
import { jobSelectors } from "redux/slices/jobSlice";
import { getJobAction } from "redux/slices/jobSlice/job.action";
import { useAppDispatch } from "redux/store";
import { toast } from "react-toastify";
import { useDisclosure } from "@chakra-ui/react";

import { BidSchema } from ".";
import { BasicLayout } from "pages/__layout/BasicLayout";

export default function JobDetail() {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const allbids = useSelector(bidSelectors.allBidsOnJob);
  const bid = useSelector(bidSelectors.bid);
  console.log("bid", bid);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bidid, setBidId] = useState(0);

  const job = useSelector(jobSelectors.job);
  const { id } = useParams();

  const onOpenModal = (id: number | undefined) => {
    if (id) {
      console.log("id", id);
      setBidId(id);
      onOpen();
    }
  };

  const goBack = () => {
    navigator("/jobs");
  };

  useEffect(() => {
    if (id) {
      dispatch(getAllBidsOnEachJobAction(parseInt(id)));
      dispatch(getJobAction(parseInt(id)));
      dispatch(getBidAction({ jobId: parseInt(id), bidId: bidid }));
    }
  }, [id, bidid]);

  return (
    <BasicLayout>
      <Flex
        textAlign={"center"}
        pt={10}
        justifyContent={"center"}
        direction={"column"}
        width={"full"}
      >
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
          onClick={goBack}
        >
          Back
        </Button>
        <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
          <chakra.h3
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
            fontSize={20}
            textTransform={"uppercase"}
            color={"purple.400"}
          >
            People can make a bundle
          </chakra.h3>
          <chakra.h1
            py={5}
            fontSize={48}
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
            color={useColorModeValue("gray.700", "gray.50")}
          >
            {job.title}
          </chakra.h1>
          <chakra.h2
            margin={"auto"}
            width={"70%"}
            fontFamily={"Inter"}
            fontWeight={"medium"}
            color={useColorModeValue("gray.500", "gray.400")}
          >
            {job.description}
            {" - "}
            <chakra.strong color={useColorModeValue("gray.700", "gray.50")}>
              {job.rate} $
            </chakra.strong>{" "}
          </chakra.h2>
        </Box>
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={"20"}
          mt={16}
          mx={"auto"}
        >
          {allbids.map((cardInfo, index) => (
            <BidCard
              onOpenModal={onOpenModal}
              key={index}
              id={cardInfo.id}
              author={cardInfo.author}
              rate={cardInfo.rate}
              content={cardInfo.content}
              index={index}
            />
          ))}
        </SimpleGrid>
        <Box>
          <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={"purple.400"}>
            <path
              fill={"currentColor"}
              d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
            />
          </Icon>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <Formik
            initialValues={{ content: bid.content, rate: bid.rate }}
            validationSchema={BidSchema}
            onSubmit={(values) => {
              if (bidid && id) {
                dispatch(
                  updateBidAction({
                    jobId: parseInt(id),
                    bidId: bidid,
                    data: { ...values },
                  })
                )
                  .unwrap()
                  .then((res) => {
                    toast(res.status);
                    onClose();
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
                    Update
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          </Formik>
        </Modal>
      </Flex>
    </BasicLayout>
  );
}
