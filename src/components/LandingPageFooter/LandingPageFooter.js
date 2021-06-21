import React from 'react';

import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    Image,
    Flex,
    VisuallyHidden,
    Button,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import logo from "../../assets/logo.png";
import iimb from "../../assets/iimb.svg";
import yc from "../../assets/yc.svg";



const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function LandingPageFooter() {
    return (
        <Box
            bg={'white'}
            color={useColorModeValue('gray.700', 'gray.200')}
            mt='16'
            borderTop="1px"
            borderTopColor="gray.500"
        >
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid
                    templateColumns={{ sm: '1fr', md: '3fr 1fr 1fr 1fr 1fr' }}
                    spacing={8}>
                    <Stack spacing={6} mt='-4' align={['center', 'flex-start']} >
                        <Flex align="center">
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
                                fontWeight="bold"
                                ml='2'>
                                MedPiper
                            </Text>
                        </Flex>

                        <Flex direction={["column", "row"]} align="center" justify="flex-start" w="100%" >
                            <Flex align="center">
                                <Text>Incubated at</Text>
                                <Image
                                    // boxSize="40px"
                                    w="70px"
                                    h="auto"
                                    objectFit="cover"
                                    src={iimb}
                                    alt="iim bangalore logo"
                                    ml='2'
                                />
                            </Flex>
                            <Flex align="center" ml={[0 , '8']} mt={[2 , 0]}>
                                <Text>Backed by</Text>
                                <Image
                                    // boxSize="40px"
                                    objectFit="cover"
                                    w="100px"
                                    h="auto"
                                    src={yc}
                                    alt="y combinator logo"
                                    ml='2'
                                />
                            </Flex>

                        </Flex>

                    </Stack>

                    <Stack align={['center', 'flex-start']}>
                        <Text color={'blue.500'} fontSize='18' fontWeight='400' >COMPANY</Text>
                        <Link href={'https://www.medpiper.com/our-story'} color={'gray.600'} isExternal >About us</Link>
                        {/* <Link href={'#'} color={'gray.600'} isExternal >Careers</Link> */}
                        <Link href={'https://www.medpiper.com/contact'} color={'gray.600'} isExternal >Contact us</Link>
                        <Link href={'https://www.medpiper.com/faq'} color={'gray.600'} isExternal >FAQs</Link>
                    </Stack>

                    <Stack align={['center', 'flex-start']}>
                        <Text color={'blue.500'} fontSize='18' fontWeight='400' >PRODUCT</Text>
                        <Link href={'http://pwa.medpiper.com/home'} color={'gray.600'} isExternal >Job portal</Link>
                        {/* <Link href={'#'} color={'gray.600'}  >Resume Builder</Link> */}
                        <Link href={'https://www.mscribe.in/'} color={'gray.600'} isExternal >Prescription Builder</Link>
                        {/* <Text color={'gray.300'} isExternal >Scheduler</Text> */}
                        {/* <Link href={'#'} color={'gray.600'} isExternal >CME and E-learning</Link> */}
                        {/* <Text color={'gray.300'} isExternal >Shopify</Text> */}

                    </Stack>

                    <Stack align={['center', 'flex-start']}>
                        <Text color={'blue.500'} fontSize='18' fontWeight='400' >INFORMATION</Text>
                        <Link href={'#'} color={'gray.600'} isExternal >Privacy Policy</Link>
                        <Link href={'#'} color={'gray.600'} isExternal >Press</Link>
                        <Link href={'#'} color={'gray.600'} isExternal >Terms and Conditions</Link>
                    </Stack>
                    <Stack align={['center', 'flex-start']}>
                        <Text color={'blue.500'} fontSize='18' fontWeight='400' >RESOURCES</Text>
                        <Link href={'https://journomed.com/'} color={'gray.600'} isExternal >Blog</Link>
                        <Link href={'https://www.medpiper.com/brand-identity'} color={'gray.600'} isExternal >Downloads</Link>
                        <Link href={'https://community.medpiper.com/login'} color={'gray.600'} isExternal >Community</Link>
                    </Stack>
                </SimpleGrid>

            </Container>

            <Flex w="100%" direction="column" align="center" pb='4'>
                <Text fontSize={'15'} color={'blue.500'} mt='4' >+91-9740603291</Text>
                <Text fontSize={'15'} color={'blue.500'} mt='4' >info@medpiper.com</Text>
                <Stack direction={'row'} spacing={6} mt='4' >
                    <SocialButton label={'Instagram'} href={'https://www.instagram.com/medpiper_global/?hl=en'}>
                        <FaInstagram size='md' />
                    </SocialButton>
                    <SocialButton label={'Twitter'} href={'https://twitter.com/medpiper?lang=en'}>
                        <FaTwitter size='md' />
                    </SocialButton>
                    <SocialButton label={'Facebook'} href={'https://www.facebook.com/medpiperglobal'}>
                        <FaFacebook size='md' />
                    </SocialButton>
                </Stack>
                <Text fontSize={'xs'} color='gray.400' mt='4' >
                    © 2020 MedPiper technologies inc. All rights reserved
                </Text>
            </Flex>


        </Box>
    );
}

const SocialButton = ({
    children,
    label,
    href,
}) => {
    return (
        <Button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={12}
            h={12}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </Button>
    );
};