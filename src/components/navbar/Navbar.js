import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
    Image
} from '@chakra-ui/react';
import logo from "../../assets/logo.png";
import {useNavigate} from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <Box>
            <Flex
                bg='blue.50'
                color='blue.500'
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                direction={{ base: "column", md: "row" }}>

                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align={{base: "center", md: "center"}}>
                    <Image
                        boxSize="70px"
                        objectFit="cover"
                        src={logo}
                        alt="resume builder logo"
                        cursor="pointer"
                        onClick={() => navigate('/')}
                    />
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        fontSize={{ base: "lg", md: "xl" }}
                        color='blue.500'
                        ml='2'>
                        Start building your resume!
                    </Text>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button
                        display={{ base: 'inline-flex', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={400}
                        color={'white'}
                        borderRadius='20'
                        bg={'blue.400'}
                        href={'#'}
                        _hover={{
                            bg: 'blue.400',
                        }}>
                        Create a public profile
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}










