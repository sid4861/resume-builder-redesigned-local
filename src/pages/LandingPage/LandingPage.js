import React from "react";
import { Flex, Box, Image, Text, Button, Heading } from '@chakra-ui/react';
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import LandingPageFooter from "../../components/LandingPageFooter/LandingPageFooter";
import header from "../../assets/header.svg";
import feature1 from "../../assets/feature-1.svg";
import feature2 from "../../assets/feature-2.svg";
import feature3 from "../../assets/feature-3.svg";
import feature4 from "../../assets/feature-4.svg";

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <div>
            {/* hero */}
            <Flex direction={["column", "row"]} minWidth="100%" >
                <Flex width={["100%", "60%"]} direction="column" minHeight={'60vh'} bgColor={'blue.50'} justify="space-around" pl={['0', '4']} >
                    <Flex align="center" ml='4'>
                        <Image
                            boxSize="70px"
                            objectFit="cover"
                            src={logo}
                            alt="resume builder logo"
                        />
                        <Text
                            fontFamily={'heading'}
                            fontSize={{ base: "lg", md: '28' }}
                            color='blue.500'
                            ml='2'>
                            MedPiper
                        </Text>
                    </Flex>
                    <Flex direction="column" w={['80%']} alignSelf='center' >
                        <Heading color={"gray.600"}  >Resume Building For HCP'S</Heading >
                        <Text color={"gray.600"} w={['80%', '60%']} mt={'2'} >Write your resumes without Hassle using our wisely designed themes to boost your chances of landing that dream job.</Text>
                        <Button colorScheme={'blue'} alignSelf="flex-start" borderRadius='20' color="white" onClick={() => navigate("/create-resume")} mt={'12'} >Create my Resume</Button>
                        <Text fontSize={'sm'} mt={'2'} color={"gray.400"} >No Registration Required</Text>
                    </Flex>
                </Flex>
                <Box w='40%' height='100%' display={['none', 'block']} >
                    <Image objectFit="cover"
                        src={header}
                        alt="resume builder logo"
                        w="100%"
                        h="100%"
                    />
                    {/* <svg style={{ width: "100%", height: "100%" }} >
                        <use xlinkHref="../../assets/header.svg" />
                    </svg> */}
                </Box>
            </Flex>

            {/* features */}
            <Flex minWidth='100%' direction="column" align="center" mt="20" >
                <Flex w={['80%', '70%']} direction={['column', 'row']} justify={'space-between'} align='center' >
                    <Flex w={['70%', '40%']} direction={["column", "row"]} align="center" justify="space-around" >
                        <Image objectFit="cover"
                            src={feature1}
                            alt="feature 1"
                            w="20"
                            h="auto"
                            alignSelf={["flex-start","flex-end"]}
                        />
                        <Flex direction="column"  ml={[0, '2']} >
                            <Text fontSize='20' fontWeight='bold' color='gray.600' >Easy To Use</Text>
                            <Text fontSize='16' mt='4' color='gray.700' >The Resume Builder uses a pre-built format and set templates, which makes it extremely easy to use, even for beginners.</Text>
                        </Flex>
                    </Flex>

                    <Flex w={['70%', '40%']} direction={["column", "row"]} align="center" justify="space-around" mt={['8', '0']} >

                        <Image objectFit="cover"
                            src={feature2}
                            alt="feature 2"
                            w="20"
                            h="auto"
                            alignSelf={["flex-start","flex-end"]}
                        />

                        <Flex direction="column" ml={[0, '2']} >
                            <Text fontSize='20' fontWeight='bold' color='gray.600' >Quick And Efficient</Text>
                            <Text fontSize='16' mt='4' color='gray.700'  >Our tool uses a set of pre-tested templates and is just a couple of steps before your resume is built and ready to be shared.</Text>
                        </Flex>

                    </Flex>

                </Flex>

                <Flex w={['80%', '70%']} direction={['column', 'row']} justify={'space-between'} align='center' mt='8' >


                    <Flex w={['70%', '40%']} direction={["column", "row"]} align="center" justify="space-around" >

                        <Image objectFit="cover"
                            src={feature3}
                            alt="feature 3"
                            w="20"
                            h="auto"
                            alignSelf={["flex-start","flex-end"]}
                        />

                        <Flex direction="column" ml={[0, '2']} >
                            <Text fontSize='20' fontWeight='bold' color='gray.600' >Multiple Formats</Text>
                            <Text fontSize='16' mt='4' color='gray.700'  >We have created an archive where all the formats of resumes are stored for your use. Customise your CV and apply to various positions.</Text>
                        </Flex>

                    </Flex>

                    <Flex w={['70%', '40%']} direction={["column", "row"]} align="center" justify="space-around" mt={['8', '0']} >


                        <Image objectFit="cover"
                            src={feature4}
                            alt="feature 4"
                            w="20"
                            h="auto"
                            alignSelf={["flex-start","flex-end"]}
                        />

                        <Flex direction="column" ml={[0, '2']} >
                            <Text fontSize='20' fontWeight='bold' color='gray.600' >CV Analytics And Prompts</Text>
                            <Text fontSize='16' mt='4' color='gray.700'  >Our resume builder allows you to stay on top of your game by prompting you to update it at regular intervals.</Text>
                        </Flex>

                    </Flex>


                </Flex>

            </Flex>

            <LandingPageFooter />
        </div>

    );
}