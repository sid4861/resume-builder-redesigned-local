import React from "react";
import {
    useDisclosure,
    Button,
    Slide,
    Text,
    Box,
    VStack,
    Heading,
    Flex,
    IconButton,
    Wrap, WrapItem,
    Center,
    Icon,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Divider,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Stack,
    FormControl,
    FormErrorMessage,
    Input,
    FormLabel,
    Radio,
    RadioGroup,
    Select
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { MdPersonOutline } from "react-icons/md";
import { useSelectedTabContext } from "../../Context/selectedTab.context";
import {
    AddIcon
} from '@chakra-ui/icons'

export default function Drawer({ setNewCategories, newCategories, setResumeData, resumeData, setCheckboxes, checkboxes }) {
    const { isOpen, onToggle } = useDisclosure() /* Control panel opening */
    const { setSelectedTab } = useSelectedTabContext();

    const defaultCategories = {
        "personal": ["personalDetails", "communityActivity"],
        "clinical": ["medicalLicense", "specialTraining", "workExperience", "awardsAndHonors"],
        "academia": ["education", "fellowship", "teachingExperience", "thesis", "bibliography"],
        "conferences": ["presentation", "participation", "programs"]
    };

    
    // const [newCategories, setNewCategories] = React.useState({});

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

    // React.useEffect( () => {
    //     getNewCategories(newCategories);
    // }, [getNewCategories, newCategories]);

    return (
        <div>
            {/* Drawer toggle button at top left */}
            <div style={{ position: 'absolute', left: '32px', top: '130px', zIndex: '10', cursor: "pointer" }}>
                <span bgColor="white" color={'gray.600'} onClick={onToggle}>
                    SHOW CATEGORIES
                </span>
            </div>

            {/* Imitation drawer below */}
            <Slide direction="left" in={isOpen} style={{ height: '100vh', width: '320px', zIndex: 100 }}>
                <VStack
                    bg="gray.50"
                    rounded="md"
                    h="100vh"
                    w="320px"
                    overflowY="scroll"
                    overflowX="hidden"
                    spacing="24px"
                    p="2">
                    <Box p={5} color="gray.700">
                        <Flex align={{ base: "center", md: "center" }} > {/* Put in a flex to get the close button on the right */}
                            <Heading fontSize={14}>FILL CATEGORIES </Heading>
                            <IconButton aria-label="Close Control Panel" ml="8" icon={<CloseIcon />} onClick={onToggle} color="black" />
                        </Flex>
                    </Box>
                    <Box p={5} shadow="lg" w="290px" borderRadius="lg" m="5px" bgColor="white">
                        <Heading fontSize="sm" color={"blue.500"} >PERSONAL DETAILS</Heading>

                        <Wrap mt="4" spacing="16px" >

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("personalDetails")} >
                                <Checkbox defaultIsChecked onChange={() => setCheckboxes({...checkboxes ,personalDetails: !checkboxes.personalDetails})} position="absolute" left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Personal Information</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("communityActivity")} >
                                <Checkbox defaultIsChecked position="absolute"  onChange={() => setCheckboxes({ ...checkboxes ,communityActivity: !checkboxes.communityActivity})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Community Activity</Text>
                                </Flex>
                            </WrapItem>

                        </Wrap>

                    </Box>


                    <Box p={5} shadow="lg" w="290px" borderRadius="lg" m="5px" bgColor="white">
                        <Heading fontSize="sm" color={"blue.500"} >CLINICAL</Heading>

                        <Wrap mt="4" spacing="16px" >

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("medicalLicense")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,medicalLicense: !checkboxes.medicalLicense})}  left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Medical Licenses</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("specialTraining")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,specialTraining: !checkboxes.specialTraining})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Special Training</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("workExperience")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,workExperience: !checkboxes.workExperience})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Work Experience</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("awardsAndHonors")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,awardsAndHonors: !checkboxes.awardsAndHonors})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Honors & Awards</Text>
                                </Flex>
                            </WrapItem>


                        </Wrap>

                    </Box>

                    {/* academia */}


                    <Box p={5} shadow="lg" w="290px" borderRadius="lg" m="5px" bgColor="white">
                        <Heading fontSize="sm" color={"blue.500"} >ACADEMIA</Heading>

                        <Wrap mt="4" spacing="16px" >

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("education")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,education: !checkboxes.education})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Education</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("fellowship")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,fellowship: !checkboxes.fellowship})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Fellowship</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("teachingExperience")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,teachingExperience: !checkboxes.teachingExperience})}  left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Teaching Experience</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("thesis")}  >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,thesis: !checkboxes.thesis})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Thesis</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("bibliography")}  >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,bibliography: !checkboxes.bibliography})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Bibliography</Text>
                                </Flex>
                            </WrapItem>


                        </Wrap>

                    </Box>

                    {/* CONFERENCES AND CONGRESS */}


                    <Box p={5} shadow="lg" w="290px" borderRadius="lg" m="5px" bgColor="white">
                        <Heading fontSize="sm" color={"blue.500"} >CONFERENCES AND CONGRESS</Heading>

                        <Wrap mt="4" spacing="16px" >

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("presentation")}  >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,presentation: !checkboxes.presentation})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Presentation</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("participation")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,participation: !checkboxes.participation})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Participation</Text>
                                </Flex>
                            </WrapItem>

                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab("programs")} >
                                <Checkbox defaultIsChecked position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,programs: !checkboxes.programs})} left="20" top="0"></Checkbox>
                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                    <Icon w="38px" h="38px" as={MdPersonOutline} />
                                    <Text fontSize="xs" align="center" >Programs Conducted</Text>
                                </Flex>
                            </WrapItem>

                        </Wrap>

                    </Box>

                    {/* dynamically displaying user created categories */}
                    {newCategories ? Object.keys(newCategories).map(key => {
                        return (
                            <Box p={5} shadow="lg" w="290px" borderRadius="lg" m="5px" bgColor="white" >
                                <Heading fontSize="sm" color={"blue.500"} >{key.toUpperCase()}</Heading>

                                <Wrap mt="4" spacing="16px" >
                                    {newCategories[key].map(section => {
                                        return (
                                            <WrapItem position="relative" cursor="pointer" onClick={() => setSelectedTab(section)} >
                                                <Checkbox  position="absolute" onChange={() => setCheckboxes({ ...checkboxes ,[section]: !checkboxes[`${section}`]})} left="20" top="0"></Checkbox>
                                                <Flex direction="column" align="center" justify="center" w="90px" h="100px" bg="gray.50" borderRadius={"lg"}>
                                                    {/* <Icon w="38px" h="38px" as={MdPersonOutline} /> */}
                                                    <Text fontSize="xs" align="center" >{section}</Text>
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

                </VStack>
            </Slide>

        </div >

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
            <Button p={5} shadow="lg" w="290px" borderRadius="lg" mt="5px" mb="5px" leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
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
                                    <RadioGroup mt="8">
                                        <Radio value="1">Do you want to include in current resume?</Radio>
                                    </RadioGroup>
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