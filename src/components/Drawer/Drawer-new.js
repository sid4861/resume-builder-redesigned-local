import React from "react";
import {
    Avatar,
    Box,
    Collapse,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useColorModeValue,
    useDisclosure,
    Image,
    WrapItem,
    Checkbox,
    Wrap,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Stack,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Button,
    Radio,
    RadioGroup,
    Select,
    Divider
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

import { FiMenu } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { MdPersonOutline, MdPeopleOutline, MdWork, MdPresentToAll, MdEventNote, MdComputer } from "react-icons/md";
import { GiRibbonMedal, GiTrophy, GiGraduateCap, GiTeacher, GiNewspaper, GiFountainPen, GiVideoConference } from "react-icons/gi";
import { FaProjectDiagram } from "react-icons/fa";
import { useSelectedTabContext } from "../../Context/selectedTab.context";
import {
    AddIcon
} from '@chakra-ui/icons'

export default function DrawerNew({ setNewCategories, newCategories, setResumeData, resumeData, setCheckboxes, checkboxes }) {
    const navigate = useNavigate();
    const sidebar = useDisclosure();
    const { selectedTab ,setSelectedTab } = useSelectedTabContext();

    function addNewCategory(category, section) {
        console.log({ category, section });
        setNewCategories({
            ...newCategories,
            [category]: [section]
        });
        setResumeData({
            ...resumeData,
            [section]: []
        });
        // setCheckboxes({
        //     ...checkboxes,
        //     [section]: true
        // });
    }

    function addNewSection(category, section) {
        console.log({ category, section });
        setNewCategories({
            ...newCategories,
            [category]: [...newCategories[category], section]
        });
        setResumeData({
            ...resumeData,
            [section]: []
        });
        // setCheckboxes({
        //     ...checkboxes,
        //     [section]: true
        // });
    }

    const SidebarContent = (props) => (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg={'gray.50'}
            // borderColor={useColorModeValue("inherit", "gray.700")}
            // borderRightWidth="1px"
            w="68"
            {...props}
        >
            <Flex px="4" py="2" align="center" bg={'blue.50'} pos="sticky" zIndex="1" top='0' left="0" right="0" >
                {/* <Logo /> */}
                <Image
                    boxSize="32px"
                    objectFit="cover"
                    src={logo}
                    alt=""
                    cursor="pointer"
                    onClick={() => navigate('/')}
                />
                <Text
                    // textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                    fontFamily={'heading'}
                    fontSize={{ base: "lg", md: "lg" }}
                    color='blue.500'
                    ml='2'>
                    Start building your resume!
                </Text>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
                aria-label="Main Navigation"
                mt='24'
            >
                {/* personal details */}
                <Box p={3} shadow="lg" w="280px" borderRadius="2xl" m="5px" bgColor="white">
                    <Heading fontSize="sm" color={"blue.500"} align="center" >PERSONAL DETAILS</Heading>

                    <Wrap mt="4" spacing="16px" justify="center" >

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("personalDetails")} >
                            <Checkbox isChecked={checkboxes.personalDetails} onChange={() => { setCheckboxes({ ...checkboxes, personalDetails: !checkboxes.personalDetails }) }} position="absolute" left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px" as={MdPersonOutline} color={ selectedTab === "personalDetails" ? 'blue.500' : 'gray.500'} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "personalDetails" ? 'blue.500' : 'gray.500'} >Personal Information</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("communityActivity")} >
                            <Checkbox isChecked={checkboxes.communityActivity} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, communityActivity: !checkboxes.communityActivity })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "communityActivity" ? 'blue.500' : 'gray.500'} as={MdPeopleOutline} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "communityActivity" ? 'blue.500' : 'gray.500'} >Community Activity</Text>
                            </Flex>
                        </WrapItem>

                    </Wrap>

                </Box>

                {/* clinical */}

                <Box p={3} shadow="lg" w="280px" borderRadius="2xl" m="5px" bgColor="white">
                    <Heading fontSize="sm" color={"blue.500"} align="center" >CLINICAL</Heading>

                    <Wrap mt="4" spacing="16px" justify="center" >

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("medicalLicense")} >
                            <Checkbox isChecked={checkboxes.medicalLicense} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, medicalLicense: !checkboxes.medicalLicense })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "medicalLicense" ? 'blue.500' : 'gray.500'} as={GiRibbonMedal} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "medicalLicense" ? 'blue.500' : 'gray.500'} >Medical Licenses</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("specialTraining")} >
                            <Checkbox isChecked={checkboxes.specialTraining} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, specialTraining: !checkboxes.specialTraining })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "specialTraining" ? 'blue.500' : 'gray.500'} as={MdComputer} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "specialTraining" ? 'blue.500' : 'gray.500'} >Special Training</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("workExperience")} >
                            <Checkbox isChecked={checkboxes.workExperience} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, workExperience: !checkboxes.workExperience })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "workExperience" ? 'blue.500' : 'gray.500'} as={MdWork} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "workExperience" ? 'blue.500' : 'gray.500'} >Work Experience</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("awardsAndHonors")} >
                            <Checkbox isChecked={checkboxes.awardsAndHonors} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, awardsAndHonors: !checkboxes.awardsAndHonors })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "awardsAndHonors" ? 'blue.500' : 'gray.500'} as={GiTrophy} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "awardsAndHonors" ? 'blue.500' : 'gray.500'} >Honors & Awards</Text>
                            </Flex>
                        </WrapItem>


                    </Wrap>

                </Box>



                {/* academia */}


                <Box p={5} shadow="lg" w="280px" borderRadius="lg" m="5px" bgColor="white">
                    <Heading fontSize="sm" color={"blue.500"} align="center" >ACADEMIA</Heading>

                    <Wrap mt="4" spacing="16px" justify="center" >

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("education")} >
                            <Checkbox isChecked={checkboxes.education} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, education: !checkboxes.education })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "education" ? 'blue.500' : 'gray.500'} as={GiGraduateCap} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "education" ? 'blue.500' : 'gray.500'} >Education</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("fellowship")} >
                            <Checkbox isChecked={checkboxes.fellowship} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, fellowship: !checkboxes.fellowship })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "fellowship" ? 'blue.500' : 'gray.500'} as={FaProjectDiagram} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "fellowship" ? 'blue.500' : 'gray.500'} >Fellowship</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("teachingExperience")} >
                            <Checkbox isChecked={checkboxes.teachingExperience} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, teachingExperience: !checkboxes.teachingExperience })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "teachingExperience" ? 'blue.500' : 'gray.500'} as={GiTeacher} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "teachingExperience" ? 'blue.500' : 'gray.500'} >Teaching Experience</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("thesis")}  >
                            <Checkbox isChecked={checkboxes.thesis} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, thesis: !checkboxes.thesis })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "thesis" ? 'blue.500' : 'gray.500'} as={GiNewspaper} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "thesis" ? 'blue.500' : 'gray.500'} >Thesis</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("bibliography")}  >
                            <Checkbox isChecked={checkboxes.bibliography} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, bibliography: !checkboxes.bibliography })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "bibliography" ? 'blue.500' : 'gray.500'} as={GiFountainPen} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "bibliography" ? 'blue.500' : 'gray.500'} >Bibliography</Text>
                            </Flex>
                        </WrapItem>


                    </Wrap>

                </Box>


                {/* CONFERENCES AND CONGRESS */}


                <Box p={5} shadow="lg" w="280px" borderRadius="lg" m="5px" bgColor="white">
                    <Heading fontSize="sm" color={"blue.500"} align="center" >CONFERENCES AND CONGRESS</Heading>

                    <Wrap mt="4" spacing="16px" justify="center" >

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("presentation")}  >
                            <Checkbox isChecked={checkboxes.presentation} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, presentation: !checkboxes.presentation })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "presentation" ? 'blue.500' : 'gray.500'} as={MdPresentToAll} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "presentation" ? 'blue.500' : 'gray.500'} >Presentation</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("participation")} >
                            <Checkbox isChecked={checkboxes.participation} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, participation: !checkboxes.participation })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "participation" ? 'blue.500' : 'gray.500'} as={GiVideoConference} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "participation" ? 'blue.500' : 'gray.500'} >Participation</Text>
                            </Flex>
                        </WrapItem>

                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("programs")} >
                            <Checkbox isChecked={checkboxes.programs} position="absolute" onChange={() => setCheckboxes({ ...checkboxes, programs: !checkboxes.programs })} left="20" top="0"></Checkbox>
                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                <Icon w="30px" h="30px"  color={ selectedTab === "programs" ? 'blue.500' : 'gray.500'} as={MdEventNote} />
                                <Text fontSize="xs" align="center"  color={ selectedTab === "programs" ? 'blue.500' : 'gray.500'} >Programs Conducted</Text>
                            </Flex>
                        </WrapItem>

                    </Wrap>

                </Box>

                {/* dynamically displaying user created categories */}
                {newCategories ? Object.keys(newCategories).map(key => {
                    return (
                        <Box p={5} shadow="lg" w="280px" borderRadius="lg" m="5px" bgColor="white" >
                            <Heading fontSize="sm" color={"blue.500"} align="center" >{key.toUpperCase()}</Heading>

                            <Wrap mt="4" spacing="16px" justify="center" >
                                {newCategories[key].map(section => {
                                    return (
                                        <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab(section)} >
                                            <Checkbox position="absolute" isChecked={checkboxes[`${section}`] ? checkboxes[`${section}`] : false} onChange={() => setCheckboxes({ ...checkboxes, [section]: !checkboxes[`${section}`] })} left="20" top="0"></Checkbox>
                                            <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                                {/* <Icon w="30px" h="30px" as={MdPersonOutline} /> */}
                                                <Text fontSize="xs" align="center" color={ selectedTab === `${section}` ? 'blue.500' : 'gray.500'} >{section}</Text>
                                            </Flex>
                                        </WrapItem>
                                    )
                                })}
                            </Wrap>

                        </Box>
                    )
                }) : null}

                {/* model to input new category and section */}
                <NewCategoryModal addNewCategory={addNewCategory} addNewSection={addNewSection} newCategories={newCategories} />

            </Flex>
        </Box>
    );
    return (
        <>
            <SidebarContent display={{ base: "none", md: "unset" }} />
            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease" pos="sticky" zIndex="1" top="0" left="0" right="0" >
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    w="full"
                    px="4"
                    bg={'blue.50'}
                    // borderBottomWidth="1px"
                    // borderColor={useColorModeValue("inherit", "gray.700")}
                    h="14"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={sidebar.onOpen}
                        icon={<FiMenu />}
                        size="sm"
                    />

                </Flex>

            </Box>
        </>
    );
}

function NewCategoryModal({ addNewCategory, addNewSection, newCategories }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [category, setCategory] = React.useState("");
    const [section, setSection] = React.useState("");
    const [newSection, setNewSection] = React.useState("");
    const [categoryListOption, setCategoryListOption] = React.useState("");
    return (
        <>
            <Button p={4} shadow="lg" w="260px" borderRadius="lg" mt="5px" mb="5px" leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen} ml='4' >
                New category/section
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New category/section</ModalHeader>
                    <Divider />
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs variant="soft-rounded" colorScheme="white">
                            <TabList>
                                <Tab _selected={{ color: "blue.500", bg: "blue.50" }} >Category</Tab>
                                <Tab _selected={{ color: "blue.500", bg: "blue.50" }} >Section</Tab>
                            </TabList>
                            <TabPanels>
                                {/* adding new category */}
                                <TabPanel>
                                    <Stack direction={["column", "row"]} >
                                        <FormControl id="categoryName" isRequired>
                                            <FormLabel>Name</FormLabel>
                                            <Input variant="filled" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                                            <FormErrorMessage>category name is required</FormErrorMessage>
                                        </FormControl>
                                        <FormControl id="sectionName" isRequired>
                                            <FormLabel>Section</FormLabel>
                                            <Input variant="filled" type="text" value={section} onChange={(e) => setSection(e.target.value)} />
                                        </FormControl>
                                    </Stack>
                                    <RadioGroup mt="8">
                                        <Radio value="1">Do you want to include in current resume?</Radio>
                                    </RadioGroup>
                                    <Stack direction={['column', 'row']} mt="8" >
                                        <Button colorScheme="blue" mr={3} onClick={() => { addNewCategory(category, section); onClose(); }} >
                                            Add
                                        </Button>
                                        <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose} >
                                            Cancel
                                        </Button>
                                    </Stack>
                                </TabPanel>

                                {/* adding new section to existing category */}
                                <TabPanel>
                                    <Stack direction={["column", "row"]} >
                                        <FormControl id="sectionName" isRequired>
                                            <FormLabel>Section name</FormLabel>
                                            <Input variant="filled" type="text" value={newSection} onChange={(e) => setNewSection(e.target.value)} />
                                            <FormErrorMessage>section name is required</FormErrorMessage>
                                        </FormControl>
                                        <FormControl id="sectionCategory" isRequired>
                                            <FormLabel>Type</FormLabel>
                                            <Select variant="filled" placeholder="Select type" value={categoryListOption} onChange={(e) => setCategoryListOption(e.target.value)} >

                                                {newCategories ? Object.keys(newCategories).map(key => {
                                                    return (
                                                        <option value={`${key}`}>{key}</option>
                                                    )
                                                }) : null}

                                                {/* <option value="option2">Option 2</option>
                                                <option value="option3">Option 3</option> */}
                                            </Select>
                                            <FormErrorMessage>type is required</FormErrorMessage>
                                        </FormControl>
                                    </Stack>
                                    {/* <RadioGroup mt="8">
                                        <Radio value="1">Do you want to include in current resume?</Radio>
                                    </RadioGroup> */}
                                    <Stack direction={['column', 'row']} mt="8" >
                                        <Button colorScheme="blue" mr={3} onClick={() => { addNewSection(categoryListOption, newSection); onClose(); }} >
                                            Add
                                        </Button>
                                        <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose} >
                                            Cancel
                                        </Button>
                                    </Stack>
                                </TabPanel>

                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}