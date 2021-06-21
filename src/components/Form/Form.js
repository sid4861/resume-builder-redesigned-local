import React, { Fragment } from "react";
import {
    Box, Flex, Text, Circle, Icon, Stack, Input, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    InputGroup,
    InputLeftAddon,
    Textarea,
    Button,
    Select,
    Divider,
    Image
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { MdPerson } from "react-icons/md";
import { useSelectedTabContext } from "../../Context/selectedTab.context";
import {
    AddIcon
} from '@chakra-ui/icons';
import { Formik, Form, Field } from 'formik';
import axios from "axios";
import Media from 'react-media';

export default function FormInputs({ newCategories, resumeData, setResumeData, cookie, profilePictureUrl }) {

    console.log("state inside form");
    console.log(resumeData);
    const { selectedTab, setSelectedTab } = useSelectedTabContext();
    let returnComponent = null;

    function updateResumeDbWithFormikValues(formValues, formType, selectedTab) {
        console.log("inside update function");
        // console.log({ "state": resumeData });
        console.log({ formValues });

        let formValuesWithoutEmptyFields = {};

        let resumeDataPayload = {};

        console.log("current state");
        console.log(resumeData);

        if (formType === "personalDetails") {
            Object.keys(formValues).map(key => {
                if (formValues[key] !== "") {
                    formValuesWithoutEmptyFields[key] = formValues[key];
                }
            });
            resumeDataPayload = { ...resumeData, ...formValuesWithoutEmptyFields };
        }

        if (formType === "communityActivity") {
            if (Object.keys(formValues["communityActivity"]).length > 0) {
                formValuesWithoutEmptyFields["communityActivity"] = { ...formValues["communityActivity"] };
            }
            resumeDataPayload = { ...resumeData, communityActivity: [...resumeData.communityActivity, formValuesWithoutEmptyFields["communityActivity"]] };
        }

        if (formType === "medicalLicense") {
            if (Object.keys(formValues["medicalLicense"]).length > 0) {
                formValuesWithoutEmptyFields["medicalLicense"] = { ...formValues["medicalLicense"] };
            }
            resumeDataPayload = { ...resumeData, medicalLicenses: [...resumeData.medicalLicenses, formValuesWithoutEmptyFields["medicalLicense"]] };
        }

        if (formType === "specialTraining") {
            if (Object.keys(formValues["specialTraining"]).length > 0) {
                formValuesWithoutEmptyFields["specialTraining"] = { ...formValues["specialTraining"] };
            }
            resumeDataPayload = { ...resumeData, specialTrainings: [...resumeData.specialTrainings, formValuesWithoutEmptyFields["specialTraining"]] };
        }

        if (formType === "workExperience") {
            if (Object.keys(formValues["workExperience"]).length > 0) {
                formValuesWithoutEmptyFields["workExperience"] = { ...formValues["workExperience"] };
            }
            resumeDataPayload = { ...resumeData, proffessionalExperiences: [...resumeData.proffessionalExperiences, formValuesWithoutEmptyFields["workExperience"]] };
        }

        if (formType === "honorsAndAward") {
            if (Object.keys(formValues["honorsAndAward"]).length > 0) {
                formValuesWithoutEmptyFields["honorsAndAward"] = { ...formValues["honorsAndAward"] };
            }
            resumeDataPayload = { ...resumeData, honorsAndAwards: [...resumeData.honorsAndAwards, formValuesWithoutEmptyFields["honorsAndAward"]] };
        }

        if (formType === "education") {
            if (Object.keys(formValues["education"]).length > 0) {
                formValuesWithoutEmptyFields["education"] = { ...formValues["education"] };
            }
            resumeDataPayload = { ...resumeData, educationPG: [...resumeData.educationPG, formValuesWithoutEmptyFields["education"]] };
        }

        if (formType === "fellowship") {
            if (Object.keys(formValues["fellowship"]).length > 0) {
                formValuesWithoutEmptyFields["fellowship"] = { ...formValues["fellowship"] };
            }
            resumeDataPayload = { ...resumeData, fellowships: [...resumeData.fellowships, formValuesWithoutEmptyFields["fellowship"]] };
        }

        if (formType === "teaching") {
            if (Object.keys(formValues["teaching"]).length > 0) {
                formValuesWithoutEmptyFields["teaching"] = { ...formValues["teaching"] };
            }
            resumeDataPayload = { ...resumeData, additionalTeachingActivities: [...resumeData.additionalTeachingActivities, formValuesWithoutEmptyFields["teaching"]] };
        }

        if (formType === "thesis") {
            if (Object.keys(formValues["thesis"]).length > 0) {
                formValuesWithoutEmptyFields["thesis"] = { ...formValues["thesis"] };
            }
            resumeDataPayload = { ...resumeData, dissertationAndThesis: [...resumeData.dissertationAndThesis, formValuesWithoutEmptyFields["thesis"]] };
        }

        if (formType === "bibliography") {
            if (Object.keys(formValues["bibliography"]).length > 0) {
                formValuesWithoutEmptyFields["bibliography"] = { ...formValues["bibliography"] };
            }
            resumeDataPayload = { ...resumeData, bibliography: [...resumeData.bibliography, formValuesWithoutEmptyFields["bibliography"]] };
        }

        if (formType === "presentation") {
            if (Object.keys(formValues["presentation"]).length > 0) {
                formValuesWithoutEmptyFields["presentation"] = { ...formValues["presentation"] };
            }
            resumeDataPayload = { ...resumeData, professionalPresentationInConference: [...resumeData.professionalPresentationInConference, formValuesWithoutEmptyFields["presentation"]] };
        }

        if (formType === "conference") {
            if (Object.keys(formValues["conference"]).length > 0) {
                formValuesWithoutEmptyFields["conference"] = { ...formValues["conference"] };
            }
            resumeDataPayload = { ...resumeData, conferencesParticipatedAsDelegate: [...resumeData.conferencesParticipatedAsDelegate, formValuesWithoutEmptyFields["conference"]] };
        }

        if (formType === "program") {
            if (Object.keys(formValues["program"]).length > 0) {
                formValuesWithoutEmptyFields["program"] = { ...formValues["program"] };
            }
            resumeDataPayload = { ...resumeData, megaScientificProgramsConducted: [...resumeData.megaScientificProgramsConducted, formValuesWithoutEmptyFields["program"]] };
        }

        if (formType === "newSection") {
            if (Object.keys(formValues["newSection"]).length > 0) {
                formValuesWithoutEmptyFields["newSection"] = { ...formValues["newSection"] };
            }
            resumeDataPayload = { ...resumeData, [`${selectedTab}`]: [...resumeData[`${selectedTab}`], formValuesWithoutEmptyFields["newSection"]] };
        }

        if (formType === "imageUpload") {

            resumeDataPayload = { ...resumeData, "profileImageLink": formValues['imageUpload'].profileImageLink, "profileImageKey": formValues['imageUpload'].profileImageKey };

        }

        console.log("data sent to db");
        resumeDataPayload["cookieToken"] = cookie;
        console.log({ resumeDataPayload });
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd; }
        if (mm < 10) { mm = '0' + mm; }
        today = dd + '/' + mm + '/' + yyyy;
        resumeDataPayload.lastUpdate = today;

        // Update the formData object 

        const formData = new FormData();


        formData.append(
            "resumeData",
            JSON.stringify(resumeDataPayload)
        );

        axios({
            method: 'post',
            url: 'https://d35i404c0fzoty.cloudfront.net/api/resumeDataUpdate',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log(response);
                setResumeData({ ...resumeDataPayload });
            })
            .catch(function (response) {
                //handle error
                //console.log(response);
            });
    }

    //deleting entries from state and db

    function deleteEntries(formType, field) {

        let resumeDataPayload = {};

        if (formType === "communityActivity") {

            const updatedArray = resumeData.communityActivity.filter(item => item.name !== field);

            resumeDataPayload = { ...resumeData, communityActivity: [...updatedArray] };

        }

        if (formType === "medicalLicense") {

            const updatedArray = resumeData.medicalLicenses.filter(item => item.number !== field);
            resumeDataPayload = { ...resumeData, medicalLicenses: [...updatedArray] };

        }

        if (formType === "specialTraining") {

            const updatedArray = resumeData.specialTrainings.filter(item => item.trainingName !== field);
            resumeDataPayload = { ...resumeData, specialTrainings: [...updatedArray] };

        }

        if (formType === "workExperience") {

            const updatedArray = resumeData.proffessionalExperiences.filter(item => item.startDate !== field);
            resumeDataPayload = { ...resumeData, proffessionalExperiences: [...updatedArray] };

        }

        if (formType === "honorsAndAward") {

            const updatedArray = resumeData.honorsAndAwards.filter(item => item.awardDate !== field);

            resumeDataPayload = { ...resumeData, honorsAndAwards: [...updatedArray] };

        }

        if (formType === "education") {

            const updatedArray = resumeData.educationPG.filter(item => item.degreeName !== field);

            resumeDataPayload = { ...resumeData, educationPG: [...updatedArray] };

        }

        if (formType === "fellowship") {

            const updatedArray = resumeData.fellowships.filter(item => item.fellowshipStartDate !== field);

            resumeDataPayload = { ...resumeData, fellowships: [...updatedArray] };

        }

        if (formType === "teaching") {

            const updatedArray = resumeData.additionalTeachingActivities.filter(item => item.teachingExperienceStartDate !== field);

            resumeDataPayload = { ...resumeData, additionalTeachingActivities: [...updatedArray] };

        }

        if (formType === "thesis") {

            const updatedArray = resumeData.dissertationAndThesis.filter(item => item.thesisName !== field);

            resumeDataPayload = { ...resumeData, dissertationAndThesis: [...updatedArray] };

        }

        if (formType === "bibliography") {

            const updatedArray = resumeData.bibliography.filter(item => item.bibliographyName !== field);

            resumeDataPayload = { ...resumeData, bibliography: [...updatedArray] };

        }

        if (formType === "presentation") {

            const updatedArray = resumeData.professionalPresentationInConference.filter(item => item.presentationName !== field);

            resumeDataPayload = { ...resumeData, professionalPresentationInConference: [...updatedArray] };

        }

        if (formType === "conference") {

            const updatedArray = resumeData.conferencesParticipatedAsDelegate.filter(item => item.eventName !== field);

            resumeDataPayload = { ...resumeData, conferencesParticipatedAsDelegate: [...updatedArray] };

        }

        if (formType === "program") {

            const updatedArray = resumeData.megaScientificProgramsConducted.filter(item => item.programmeName !== field);

            resumeDataPayload = { ...resumeData, megaScientificProgramsConducted: [...updatedArray] };

        }

        console.log("data sent to db");
        resumeDataPayload["cookieToken"] = cookie;
        console.log({ resumeDataPayload });
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd; }
        if (mm < 10) { mm = '0' + mm; }
        today = dd + '/' + mm + '/' + yyyy;
        resumeDataPayload.lastUpdate = today;

        // Update the formData object 

        const formData = new FormData();


        formData.append(
            "resumeData",
            JSON.stringify(resumeDataPayload)
        );

        axios({
            method: 'post',
            url: 'https://d35i404c0fzoty.cloudfront.net/api/resumeDataUpdate',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log(response);
                setResumeData({ ...resumeDataPayload });
            })
            .catch(function (response) {
                //handle error
                //console.log(response);
            });

    }

    switch (selectedTab) {
        case "personalDetails":
            returnComponent = <PersonalDetailsForm setSelectedTab={setSelectedTab} resumeData={resumeData} setResumeData={setResumeData} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} profilePictureUrl={profilePictureUrl} />
            break;

        case "communityActivity":
            returnComponent = <CommunityActivityForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "medicalLicense":
            returnComponent = <MedicalLicenseForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "specialTraining":
            returnComponent = <SpecialTrainingForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "workExperience":
            returnComponent = <WorkExperienceForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "awardsAndHonors":
            returnComponent = <AwardsAndHonorsForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "education":
            returnComponent = <EducationForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "fellowship":
            returnComponent = <FellowshipForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "teachingExperience":
            returnComponent = <TeachingExperienceForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "thesis":
            returnComponent = <ThesisForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;


        case "bibliography":
            returnComponent = <BibliographyForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "presentation":
            returnComponent = <PresentationForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "participation":
            returnComponent = <ParticipationForm setSelectedTab={setSelectedTab} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        case "programs":
            returnComponent = <ProgramsForm setSelectedTab={setSelectedTab} newCategories={newCategories} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;

        default:
            returnComponent = <NewSectionForm setSelectedTab={setSelectedTab} selectedTab={selectedTab} newCategories={newCategories} updateResumeDbWithFormikValues={updateResumeDbWithFormikValues} resumeData={resumeData} deleteEntries={deleteEntries} />
            break;
    }

    return (
        <>
            {returnComponent}
        </>

    );
}

function PersonalDetailsForm({ setSelectedTab, resumeData, setResumeData, updateResumeDbWithFormikValues, profilePictureUrl }) {

    // function validateNotNull(value) {
    //     let error
    //     if (!value) {
    //         error = "Field is required"
    //     }
    //     return error;
    // }

    function uploadProfilePicture(event) {
        console.log(event.target.files[0]);
        // if (event.target.files[0] !== "") {
        //     setResumeData({
        //         ...resumeData,
        //         selectedFile: event.target.files[0]
        //     });
        // }

        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        axios.post("https://d35i404c0fzoty.cloudfront.net/api/uploadProfilePic", formData).then((response) => {
            console.log("Response from the server:", response.data);
            // setResumeData({ ...resumeData, profileImageLink: response.data.profileImageLink });
            // setResumeData({ ...resumeData, profileImageKey: response.data.profileImageKey });
            updateResumeDbWithFormikValues({ 'imageUpload': { profileImageLink: response.data.profileImageLink, profileImageKey: response.data.profileImageKey } }, 'imageUpload');

        }, (error) => {
            console.log(error);
        });
    }


    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                PERSONAL DETAILS
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={['2', '8']}>

                <Flex direction={{ base: "column", md: "row" }} >
                    {profilePictureUrl ?

                        <Image borderWidth={"2"} borderColor={"blue.500"} alignSelf={["center", "start"]} src={profilePictureUrl} borderRadius="full"
                            boxSize="70px" objectFit="cover" ></Image>
                        :
                        <Flex direction="column" align="flex-start" >
                            <label for="upload"  >
                                <Icon w="48px" h="48px" as={MdPerson}  />
                                Upload
                            </label>
                            <input type="file" hidden id="upload" borderRadius={'lg'} bgColor={'gray.50'} p={'2'} alignSelf="stretch" mt={'2'} onChange={uploadProfilePicture} />
                        </Flex>}

                    <Box ml={{ md: "8" }}>
                        {/* formik */}

                        <Formik
                            initialValues={{
                                firstName: "",
                                middleName: "",
                                lastName: "",
                                DOB: "",
                                intro: "",
                                licenceNo: "",
                                emailPrimary: "",
                                phoneNumberPrimary: ""

                            }}
                            onSubmit={(values, actions) => {
                                console.log("new values");
                                console.log(values);

                                setTimeout(() => {
                                    updateResumeDbWithFormikValues(values, 'personalDetails');
                                    actions.setSubmitting(false);
                                }, 2000);

                            }}
                        >
                            {
                                (props) => (
                                    <Form>

                                        <Stack direction={["column", "row"]} >
                                            {/* firstname input */}
                                            <Field name="firstName" >
                                                {
                                                    ({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                                            <FormLabel htmlFor="firstName" >First name</FormLabel>
                                                            <Input variant="filled"  {...field} id="firstName" placeholder={resumeData.firstName} />
                                                            <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                                        </FormControl>
                                                    )
                                                }
                                            </Field>

                                            {/* middlename */}

                                            <Field name="middleName"  >
                                                {
                                                    ({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.middleName && form.touched.middleName}>
                                                            <FormLabel htmlFor="middleName" >Middle name</FormLabel>
                                                            <Input variant="filled"  {...field} id="middleName" placeholder={resumeData.middleName} />
                                                            <FormErrorMessage>{form.errors.middleName}</FormErrorMessage>
                                                        </FormControl>
                                                    )
                                                }
                                            </Field>

                                            {/* last name */}

                                            <Field name="lastName"  >
                                                {
                                                    ({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                                            <FormLabel htmlFor="lastName" >last name</FormLabel>
                                                            <Input variant="filled"  {...field} id="lastName" placeholder={resumeData.lastName} />
                                                            <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                                        </FormControl>
                                                    )
                                                }
                                            </Field>
                                        </Stack>

                                        <Stack direction={["column", "row"]} mt="8">

                                            {/* dob */}

                                            <Field name="DOB"  >
                                                {
                                                    ({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.DOB && form.touched.DOB}>
                                                            <FormLabel htmlFor="DOB" >Date of birth</FormLabel>
                                                            <Input variant="filled" type="date" {...field} id="DOB" placeholder={resumeData.DOB} />
                                                            <FormErrorMessage>{form.errors.DOB}</FormErrorMessage>
                                                        </FormControl>
                                                    )
                                                }
                                            </Field>

                                            {/* email */}

                                            <Field name="emailPrimary"  >
                                                {
                                                    ({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.emailPrimary && form.touched.emailPrimary}>
                                                            <FormLabel htmlFor="emailPrimary" >Email</FormLabel>
                                                            <Input variant="filled" type="email" {...field} id="emailPrimary" placeholder={resumeData.emailPrimary} />
                                                            <FormErrorMessage>{form.errors.emailPrimary}</FormErrorMessage>
                                                        </FormControl>
                                                    )
                                                }
                                            </Field>
                                        </Stack>

                                        <Stack direction={["column", "row"]} mt="8">

                                            {/* license number */}

                                            <Field name="licenceNo"  >
                                                {
                                                    ({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.licenceNo && form.touched.licenceNo}>
                                                            <FormLabel htmlFor="licenceNo" >License number</FormLabel>
                                                            <Input variant="filled" type="text" {...field} id="licenceNo" placeholder={resumeData.licenceNo} />
                                                            <FormErrorMessage>{form.errors.licenceNo}</FormErrorMessage>
                                                        </FormControl>
                                                    )
                                                }
                                            </Field>

                                            {/* mobile number */}

                                            <Field name="phoneNumberPrimary"  >
                                                {
                                                    ({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.phoneNumberPrimarynceNo && form.touched.phoneNumberPrimary}>
                                                            <FormLabel htmlFor="phoneNumberPrimary" >Mobile number</FormLabel>
                                                            <InputGroup>
                                                                <InputLeftAddon children="+91" />
                                                                <Input variant="filled" type="tel" {...field} id="phoneNumberPrimary" placeholder={resumeData.phoneNumberPrimary} />
                                                            </InputGroup>
                                                            <FormErrorMessage>{form.errors.phoneNumberPrimary}</FormErrorMessage>
                                                        </FormControl>
                                                    )
                                                }
                                            </Field>

                                        </Stack>

                                        {/* intro */}

                                        <Field name="intro"  >
                                            {
                                                ({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.intro && form.touched.intro}>
                                                        <FormLabel htmlFor="intro" >Bio</FormLabel>
                                                        <Textarea variant="filled" {...field} placeholder={resumeData.intro} />
                                                        <FormErrorMessage>{form.errors.intro}</FormErrorMessage>
                                                    </FormControl>
                                                )
                                            }
                                        </Field>

                                        <Flex mt="8" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                            <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                            <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("communityActivity")} >Next Section</Button>
                                        </Flex>

                                    </Form>
                                )
                            }
                        </Formik>
                    </Box>
                </Flex>



            </Flex>
        </Flex>
    );
}

function CommunityActivityForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {

    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                COMMUNITY ACTIVITY
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>

                <Formik
                    initialValues={{
                        name: "",
                        description: ""

                    }}
                    onSubmit={(values, actions) => {
                        console.log("new values");
                        console.log(values);

                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "communityActivity": { ...values } }, 'communityActivity');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="name" >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="activityName" isRequired>
                                                <FormLabel htmlFor="name" >Activity name</FormLabel>
                                                <Input variant="filled" type="text" {...field} id="name" placeholder="activity name" />
                                                <FormErrorMessage>{""}</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Field name="description"  >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="description" mt='8' isRequired>
                                                <FormLabel htmlFor="description" >Description</FormLabel>
                                                <Input variant="filled" type="text" {...field} id="description" placeholder="Add activity description" />
                                                <FormErrorMessage>{""}</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("medicalLicense")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>


                <Divider colorScheme="blue" mt="8" />

                {resumeData.communityActivity.length > 0 ?
                    resumeData.communityActivity.map(activity => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {matches => (
                                    <Fragment>
                                        {
                                            matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="4" mt='8' borderRadius="lg" >
                                                <DeleteIcon onClick={() => deleteEntries('communityActivity', activity.name)} alignSelf="flex-end" cursor="pointer" />
                                                <Flex direction={["column", "row"]}  >
                                                    <Text fontWeight="bold" color={'gray.800'} >Activity name</Text>
                                                    <Text ml={["0", "8"]} > {activity.name} </Text>
                                                </Flex>
                                                <Flex direction={["column", "row"]} mt="6">
                                                    <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                    <Text ml={["0", "8"]} >
                                                        {activity.description}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        }
                                        {matches.medium &&
                                            <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                <Flex direction="column" >
                                                    <Text fontWeight="bold" color={'gray.700'} p="4" >Activity name</Text>
                                                    <Text fontWeight="bold" color={'gray.700'} p="4" >Description</Text>
                                                </Flex>
                                                <Flex direction="column" flex="1" >
                                                    <Text p="4" > {activity.name} </Text>
                                                    <Text p="4">
                                                        {activity.description}
                                                    </Text>
                                                </Flex>
                                                <DeleteIcon onClick={() => deleteEntries('communityActivity', activity.name)} cursor="pointer" />
                                            </Flex>
                                        }
                                    </Fragment>

                                )}
                            </Media>

                        )
                    })
                    : null}
            </Flex>
        </Flex>
    );

}

function MedicalLicenseForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {

    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                MEDICAL LICENSE
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>


                <Formik
                    initialValues={{
                        number: "",
                        description: ""

                    }}
                    onSubmit={(values, actions) => {
                        console.log("new values");
                        console.log(values);

                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "medicalLicense": { ...values } }, 'medicalLicense');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="number" >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="number" isRequired>
                                                <FormLabel htmlFor="number" >License number</FormLabel>
                                                <Input variant="filled" type="text" {...field} id="number" placeholder="license number" />
                                                <FormErrorMessage>{""}</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Field name="description"  >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="description" mt='8' isRequired>
                                                <FormLabel htmlFor="description" >License description</FormLabel>
                                                <Textarea variant="filled" type="text" {...field} id="description" placeholder="Add license description" />
                                                <FormErrorMessage>{""}</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>
                                {/* 
                                <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("specialTraining")}  >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>

                <Divider colorScheme="blue" mt="8" />

                {resumeData.medicalLicenses.length > 0 ?
                    resumeData.medicalLicenses.map(license => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('medicalLicense', license.number)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >License number</Text>
                                                        <Text ml={["0", "8"]} > {license.number} </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {license.description}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            }
                                            {
                                                matches.medium &&
                                                <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >License number</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="4" > {license.number} </Text>
                                                        <Text p="4">
                                                            {license.description}
                                                        </Text>
                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('medicalLicense', license.number)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>



                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );

}

function SpecialTrainingForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {

    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]}>
            <Text color={'gray.600'}>
                SPECIAL TRAINING
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>


                <Formik
                    initialValues={{
                        trainingName: "",
                        trainingDescription: ""

                    }}
                    onSubmit={(values, actions) => {
                        console.log("new values");
                        console.log(values);

                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "specialTraining": { ...values } }, 'specialTraining');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="trainingName" >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="trainingName" isRequired>
                                                <FormLabel htmlFor="trainingName" >Training Name</FormLabel>
                                                <Input variant="filled" type="text" {...field} id="trainingName" placeholder="training name" />
                                                <FormErrorMessage>{""}</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Field name="trainingDescription"  >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="trainingDescription" mt='8' isRequired>
                                                <FormLabel htmlFor="trainingDescription" >Training description</FormLabel>
                                                <Textarea variant="filled" type="text" {...field} id="trainingDescription" placeholder="Add training description" />
                                                <FormErrorMessage>{""}</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting}  >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("workExperience")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>

                <Divider colorScheme="blue" mt="8" />

                {resumeData.specialTrainings.length > 0 ?
                    resumeData.specialTrainings.map(training => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('specialTraining', training.trainingName)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Training name</Text>
                                                        <Text ml={["0", "8"]} > {training.trainingName} </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {training.trainingDescription}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            }
                                            {
                                                matches.medium && <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >Training name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="4" > {training.trainingName} </Text>
                                                        <Text p="4">
                                                            {training.trainingDescription}
                                                        </Text>
                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('specialTraining', training.trainingName)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>



                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );

}

function WorkExperienceForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                WORK EXPERIENCE
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>



                <Formik
                    initialValues={{
                        organisationName: "",
                        position: "",
                        type: "",
                        startDate: "",
                        endDate: "",
                        description: ""

                    }}
                    onSubmit={(values, actions) => {
                        console.log("new values");
                        console.log(values);

                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "workExperience": { ...values } }, 'workExperience');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="organisationName" >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="organisationName" isRequired>
                                                <FormLabel htmlFor="organisationName" >Organisation Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Organisation Name is required</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Stack direction={["column", "row"]} mt="8">
                                    <Field name="position"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="position" isRequired>
                                                    <FormLabel htmlFor="position" >Position</FormLabel>
                                                    <Input variant="filled" {...field} type="text" />
                                                    <FormErrorMessage>position is required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                    <Field name="type"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="type" isRequired>
                                                    <FormLabel htmlFor="type" >Type</FormLabel>
                                                    <Select variant="filled" {...field} placeholder="Select type">
                                                        <option value="Permanent">Permanent</option>
                                                        <option value="Contract">Contract</option>
                                                    </Select>
                                                    <FormErrorMessage>type is required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>
                                </Stack>


                                <Stack direction={["column", "row"]} mt="8">

                                    <Field name="startDate"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="startDate" isRequired>
                                                    <FormLabel htmlFor="startDate" >Start date</FormLabel>
                                                    <Input variant="filled" {...field} type="date" />
                                                    <FormErrorMessage>start date is required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                    <Field name="endDate"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="endDate" >
                                                    <FormLabel htmlFor="endDate" >End date</FormLabel>
                                                    <Input variant="filled" {...field} type="date" />
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                </Stack>

                                <Field name="description"  >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="experienceDescription" isRequired mt="8">
                                                <FormLabel htmlFor="experienceDescription" >Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add activity description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                {/* 

                                <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("awardsAndHonors")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>


                <Divider colorScheme="blue" mt="8" />

                {resumeData.proffessionalExperiences.length > 0 ?
                    resumeData.proffessionalExperiences.map(experience => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('workExperience', experience.startDate)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Organisation name</Text>
                                                        <Text ml={["0", "8"]} > {experience.organisationName} </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Position</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {experience.position}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Start date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {experience.startDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >End date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {experience.endDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {experience.description}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            }
                                            {
                                                matches.medium &&
                                                <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >Organisation name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >Position</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >Start date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >End date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="4" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="4" > {experience.organisationName}  </Text>
                                                        <Text p="4">
                                                            {experience.position}
                                                        </Text>
                                                        <Text p="4">
                                                            {experience.startDate}
                                                        </Text>
                                                        <Text p="4">
                                                            {experience.endDate}
                                                        </Text>
                                                        <Text p="4">
                                                            {experience.description}
                                                        </Text>
                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('workExperience', experience.startDate)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>




                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );
}

function AwardsAndHonorsForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {

    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                HONORS AND AWARDS
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>
                <Formik
                    initialValues={{
                        awardName: "",
                        awardingAuthority: "",
                        awardDate: "",
                        awardDescription: ""
                    }}
                    onSubmit={(values, actions) => {
                        console.log("new values");
                        console.log(values);

                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "honorsAndAward": { ...values } }, 'honorsAndAward');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="awardName" >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="awardName" isRequired>
                                                <FormLabel>Award / Honor Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Award / Honor Name is required</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>


                                <Field name="awardingAuthority"  >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="awardingAuthority" isRequired mt="8">
                                                <FormLabel>Awarding Authority</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Awarding Authority is required</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Field name="awardDate"  >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="awardDate" isRequired mt="8">
                                                <FormLabel>Date</FormLabel>
                                                <Input variant="filled" {...field} type="date" />
                                                <FormErrorMessage>Date is required</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Field name="awardDescription"  >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="awardDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add award description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("education")} >Next Section</Button>
                                </Flex>
                            </Form>
                        )
                    }
                </Formik>


                <Divider colorScheme="blue" mt="8" />

                {resumeData.honorsAndAwards.length > 0 ?
                    resumeData.honorsAndAwards.map(award => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small &&
                                                <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('honorsAndAward', award.awardDate)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Award / Honor Name</Text>
                                                        <Text ml={["0", "8"]} > {award.awardName} </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Awarding Authority</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {award.awardingAuthority}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {award.awardDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {award.awardDescription}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            }
                                            {
                                                matches.medium && <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Award / Honor Name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Awarding Authority</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" > {award.awardName}  </Text>
                                                        <Text p="2">
                                                            {award.awardingAuthority}
                                                        </Text>
                                                        <Text p="2">
                                                            {award.awardDate}
                                                        </Text>
                                                        <Text p="2">
                                                            {award.awardDescription}
                                                        </Text>
                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('honorsAndAward', award.awardDate)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>
                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );

}

function EducationForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                EDUCATION
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}  >



                <Formik
                    initialValues={{
                        universityName: "",
                        degreeName: "",
                        degreeType: "",
                        degreeStartDate: "",
                        degreeEndDate: "",
                        degreeDescription: ""

                    }}
                    onSubmit={(values, actions) => {
                        console.log("new values");
                        console.log(values);

                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "education": { ...values } }, 'education');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="universityName" >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="universityName" isRequired>
                                                <FormLabel>University Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>University Name is required</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Stack direction={["column", "row"]} mt="8">
                                    <Field name="degreeName"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="degreeName" isRequired>
                                                    <FormLabel>Degree Name</FormLabel>
                                                    <Input variant="filled" {...field} type="text" />
                                                    <FormErrorMessage>Degree Name required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                    <Field name="degreeType"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="degreeType" isRequired>
                                                    <FormLabel>Type</FormLabel>
                                                    <Select variant="filled" {...field} placeholder="Select type">
                                                        <option value="Diploma">Diploma</option>
                                                        <option value="Graduation">Graduation</option>
                                                        <option value="Post graduation">Post graduation</option>
                                                    </Select>
                                                    <FormErrorMessage>Degree type is required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>
                                </Stack>


                                <Stack direction={["column", "row"]} mt="8">

                                    <Field name="degreeStartDate"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="degreeStartDate" isRequired>
                                                    <FormLabel>Start date</FormLabel>
                                                    <Input variant="filled" {...field} type="date" />
                                                    <FormErrorMessage>start date is required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                    <Field name="degreeEndDate"  >
                                        {
                                            ({ field, form }) => (

                                                <FormControl id="degreeEndDate" >
                                                    <FormLabel>End date</FormLabel>
                                                    <Input variant="filled" {...field} type="date" />
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                </Stack>

                                <Field name="degreeDescription"  >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="degreeDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add degree description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>




                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting}  >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("fellowship")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>

                <Divider colorScheme="blue" mt="8" />

                {resumeData.educationPG.length > 0 ?
                    resumeData.educationPG.map(education => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('education', education.degreeName)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >University name</Text>
                                                        <Text ml={["0", "8"]} > {education.universityName} </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Degree name</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {education.degreeName}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Degree type</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {education.degreeType}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Start date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {education.degreeStartDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >End date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {education.degreeEndDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {education.degreeDescription}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            }
                                            {
                                                matches.medium &&
                                                <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >University name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Degree name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Degree type</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Start date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >End date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" > {education.universityName}  </Text>
                                                        <Text p="2">
                                                            {education.degreeName}
                                                        </Text>
                                                        <Text p="2">
                                                            {education.degreeType}
                                                        </Text>
                                                        <Text p="2">
                                                            {education.degreeStartDate}
                                                        </Text>
                                                        <Text p="2">
                                                            {education.degreeEndDate}
                                                        </Text>
                                                        <Text p="2">
                                                            {education.degreeDescription}
                                                        </Text>
                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('education', education.degreeName)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>





                        )
                    })
                    : null}


            </Flex>
        </Flex>
    );
}

function FellowshipForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                FELLOWSHIP
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>


                <Formik
                    initialValues={{
                        universityName: "",
                        fellowshipName: "",
                        fellowshipType: "",
                        fellowshipStartDate: "",
                        fellowshipEndDate: "",
                        fellowshipDescription: ""

                    }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log("new values");
                        console.log(values);
                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "fellowship": { ...values } }, 'fellowship');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="universityName" >
                                    {
                                        ({ field, form }) => (
                                            <FormControl id="universityName" isRequired>
                                                <FormLabel>University Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>University Name is required</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Stack direction={["column", "row"]} mt="8">
                                    <Field name="fellowshipName"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="fellowshipName" isRequired>
                                                    <FormLabel>Fellowship Name</FormLabel>
                                                    <Input variant="filled" {...field} type="text" />
                                                    <FormErrorMessage>Fellowship Name required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                    <Field name="fellowshipType"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="fellowshipType" isRequired>
                                                    <FormLabel>Type</FormLabel>
                                                    <Select variant="filled" {...field} placeholder="Select type">
                                                        <option value="option1">Option 1</option>
                                                        <option value="option2">Option 2</option>
                                                        <option value="option3">Option 3</option>
                                                    </Select>
                                                    <FormErrorMessage>Fellowshop type is required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>
                                </Stack>


                                <Stack direction={["column", "row"]} mt="8">

                                    <Field name="fellowshipStartDate"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="fellowshipStartDate" isRequired>
                                                    <FormLabel>Start date</FormLabel>
                                                    <Input variant="filled" {...field} type="date" />
                                                    <FormErrorMessage>start date is required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                    <Field name="fellowshipEndDate"  >
                                        {
                                            ({ field, form }) => (

                                                <FormControl id="fellowshipEndDate" >
                                                    <FormLabel>End date</FormLabel>
                                                    <Input variant="filled" {...field} type="date" />
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                </Stack>

                                <Field name="fellowshipDescription"  >
                                    {
                                        ({ field, form }) => (


                                            <FormControl id="fellowshipDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add activity description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("teachingExperience")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>

                <Divider colorScheme="blue" mt="8" />

                {resumeData.fellowships.length > 0 ?
                    resumeData.fellowships.map(fellowship => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('fellowship', fellowship.fellowshipStartDate)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >University name</Text>
                                                        <Text ml={["0", "8"]} > {fellowship.universityName} </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Fellowship name</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {fellowship.fellowshipName}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Fellowship type</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {fellowship.fellowshipType}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Start date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {fellowship.fellowshipStartDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >End date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {fellowship.fellowshipEndDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {fellowship.fellowshipDescription}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            }
                                            {
                                                matches.medium && <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >University name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Fellowship name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Fellowship type</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Start date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >End date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" > {fellowship.universityName}  </Text>
                                                        <Text p="2">
                                                            {fellowship.fellowshipName}
                                                        </Text>
                                                        <Text p="2">
                                                            {fellowship.fellowshipType}
                                                        </Text>
                                                        <Text p="2">
                                                            {fellowship.fellowshipStartDate}
                                                        </Text>
                                                        <Text p="2">
                                                            {fellowship.fellowshipEndDate}
                                                        </Text>
                                                        <Text p="2">
                                                            {fellowship.fellowshipDescription}
                                                        </Text>
                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('fellowship', fellowship.fellowshipStartDate)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>

                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );
}

function TeachingExperienceForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                TEACHING EXPERIENCE
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>


                <Formik
                    initialValues={{
                        positionName: "",
                        teachingExperienceStartDate: "",
                        teachingExperienceEndDate: "",
                        teachingExperienceDescription: ""
                    }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log("new values");
                        console.log(values);
                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "teaching": { ...values } }, 'teaching');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="positionName" >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="positionName" isRequired>
                                                <FormLabel>Position Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Position Name is required</FormErrorMessage>
                                            </FormControl>
                                        )
                                    }
                                </Field>

                                <Stack direction={["column", "row"]} mt="8">

                                    <Field name="teachingExperienceStartDate"  >
                                        {
                                            ({ field, form }) => (
                                                <FormControl id="teachingExperienceStartDate" isRequired>
                                                    <FormLabel>Start date</FormLabel>
                                                    <Input variant="filled" {...field} type="date" />
                                                    <FormErrorMessage>start date is required</FormErrorMessage>
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                    <Field name="teachingExperienceEndDate"  >
                                        {
                                            ({ field, form }) => (


                                                <FormControl id="teachingExperienceEndDate" >
                                                    <FormLabel>End date</FormLabel>
                                                    <Input variant="filled" {...field} type="date" />
                                                </FormControl>
                                            )
                                        }
                                    </Field>

                                </Stack>

                                <Field name="teachingExperienceDescription"  >
                                    {
                                        ({ field, form }) => (


                                            <FormControl id="teachingExperienceDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add experience description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("thesis")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>


                <Divider colorScheme="blue" mt="8" />

                {resumeData.additionalTeachingActivities.length > 0 ?
                    resumeData.additionalTeachingActivities.map(exp => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('teaching', exp.teachingExperienceStartDate)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Position name</Text>
                                                        <Text ml={["0", "8"]} > {exp.positionName} </Text>
                                                    </Flex>

                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Start date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {exp.teachingExperienceStartDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >End date</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {exp.teachingExperienceEndDate}
                                                        </Text>
                                                    </Flex>
                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {exp.teachingExperienceDescription}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            }
                                            {
                                                matches.medium &&



                                                <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Position name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Start date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >End date</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" > {exp.positionName}  </Text>
                                                        <Text p="2">
                                                            {exp.teachingExperienceStartDate}
                                                        </Text>
                                                        <Text p="2">
                                                            {exp.teachingExperienceEndDate}
                                                        </Text>
                                                        <Text p="2">
                                                            {exp.teachingExperienceDescription}
                                                        </Text>

                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('teaching', exp.teachingExperienceStartDate)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>

                        )
                    })
                    : null}
            </Flex>
        </Flex>
    );
}

function ThesisForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                THESIS
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>

                <Formik
                    initialValues={{
                        thesisName: "",
                        thesisDescription: "",
                    }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log("new values");
                        console.log(values);
                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "thesis": { ...values } }, 'thesis');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="thesisName" >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="thesisName" isRequired>
                                                <FormLabel>Thesis Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Thesis Name is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                <Field name="thesisDescription"  >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="thesisDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add activity description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>
                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("bibliography")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>


                <Divider colorScheme="blue" mt="8" />

                {resumeData.dissertationAndThesis.length > 0 ?
                    resumeData.dissertationAndThesis.map(thesis => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small &&
                                                <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('thesis', thesis.thesisName)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Thesis name</Text>
                                                        <Text ml={["0", "8"]} > {thesis.thesisName} </Text>
                                                    </Flex>

                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {thesis.thesisDescription}
                                                        </Text>
                                                    </Flex>

                                                </Flex>
                                            }
                                            {
                                                matches.medium && <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Thesis name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" > {thesis.thesisName}  </Text>

                                                        <Text p="2">
                                                            {thesis.thesisDescription}
                                                        </Text>

                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('thesis', thesis.thesisName)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>

                        )
                    })
                    : null}
            </Flex>
        </Flex>
    );
}

function BibliographyForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                BIBLIOGRAPHY
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>

                <Formik
                    initialValues={{
                        bibliographyName: "",
                        bibliographyDescription: "",
                    }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log("new values");
                        console.log(values);
                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "bibliography": { ...values } }, 'bibliography');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="bibliographyName" >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="bibliographyName" isRequired>
                                                <FormLabel>Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Name is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                <Field name="bibliographyDescription"  >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="bibliographyDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add bibliogrphy description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("presentation")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>

                <Divider colorScheme="blue" mt="8" />

                {resumeData.bibliography.length > 0 ?
                    resumeData.bibliography.map(item => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('bibliography', item.bibliographyName)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Name</Text>
                                                        <Text ml={["0", "8"]} > {item.bibliographyName} </Text>
                                                    </Flex>

                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {item.bibliographyDescription}
                                                        </Text>
                                                    </Flex>

                                                </Flex>
                                            }
                                            {
                                                matches.medium && <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" > {item.bibliographyName}  </Text>

                                                        <Text p="2">
                                                            {item.bibliographyDescription}
                                                        </Text>

                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('bibliography', item.bibliographyName)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>





                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );
}


function PresentationForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                PRESENTATION
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>

                <Formik
                    initialValues={{
                        presentationName: "",
                        presentationDescription: "",
                    }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log("new values");
                        console.log(values);
                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "presentation": { ...values } }, 'presentation');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="presentationName" >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="presentationName" isRequired>
                                                <FormLabel>Presentation Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Name is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                <Field name="presentationDescription"  >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="presentationDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add bibliogrphy description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("participation")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>

                <Divider colorScheme="blue" mt="8" />

                {resumeData.professionalPresentationInConference.length > 0 ?
                    resumeData.professionalPresentationInConference.map(item => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('presentation', item.presentationName)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Presentation name</Text>
                                                        <Text ml={["0", "8"]} > {item.presentationName} </Text>
                                                    </Flex>

                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {item.presentationDescription}
                                                        </Text>
                                                    </Flex>

                                                </Flex>
                                            }
                                            {
                                                matches.medium && <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Presentation name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" > {item.presentationName}  </Text>

                                                        <Text p="2">
                                                            {item.presentationDescription}
                                                        </Text>

                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('presentation', item.presentationName)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>

                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );
}


function ParticipationForm({ setSelectedTab, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                PARTICIPATION
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>

                <Formik
                    initialValues={{
                        eventName: "",
                        eventDescription: "",
                    }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log("new values");
                        console.log(values);
                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "conference": { ...values } }, 'conference');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="eventName" >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="eventName" isRequired>
                                                <FormLabel>Event Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Name is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                <Field name="eventDescription"  >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="eventDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add event description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>


                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => setSelectedTab("programs")} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>

                <Divider colorScheme="blue" mt="8" />

                {resumeData.conferencesParticipatedAsDelegate.length > 0 ?
                    resumeData.conferencesParticipatedAsDelegate.map(item => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('conference', item.eventName)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Event name</Text>
                                                        <Text ml={["0", "8"]} > {item.eventName} </Text>
                                                    </Flex>

                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {item.eventDescription}
                                                        </Text>
                                                    </Flex>

                                                </Flex>
                                            }
                                            {
                                                matches.medium &&
                                                <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Event name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" > {item.eventName}  </Text>

                                                        <Text p="2">
                                                            {item.eventDescription}
                                                        </Text>

                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('conference', item.eventName)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>

                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );
}


function ProgramsForm({ setSelectedTab, newCategories, updateResumeDbWithFormikValues, resumeData, deleteEntries }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                PROGRAMS CONDUCTED
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>


                <Formik
                    initialValues={{
                        programmeName: "",
                        programmeDescription: "",
                    }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log("new values");
                        console.log(values);
                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "program": { ...values } }, 'program');
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="programmeName" >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="programmeName" isRequired>
                                                <FormLabel>Programme Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Name is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                <Field name="programmeDescription"  >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="programmeDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add programme description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>


                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => {
                                        setSelectedTab(String(newCategories[Object.keys(newCategories)[0]][0]));
                                    }} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>

                <Divider colorScheme="blue" mt="8" />

                {resumeData.megaScientificProgramsConducted.length > 0 ?
                    resumeData.megaScientificProgramsConducted.map(item => {
                        return (

                            <Media queries={{
                                small: "(max-width: 599px)",
                                medium: "(min-width: 600px)"
                            }}>
                                {
                                    matches => (
                                        <Fragment>
                                            {
                                                matches.small &&
                                                <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                    <DeleteIcon onClick={() => deleteEntries('program', item.programmeName)} alignSelf="flex-end" cursor="pointer" />
                                                    <Flex direction={["column", "row"]}  >
                                                        <Text fontWeight="bold" color={'gray.800'} >Program name</Text>
                                                        <Text ml={["0", "8"]} > {item.programmeName} </Text>
                                                    </Flex>

                                                    <Flex direction={["column", "row"]} mt="8">
                                                        <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                        <Text ml={["0", "8"]} >
                                                            {item.programmeDescription}
                                                        </Text>
                                                    </Flex>

                                                </Flex>
                                            }
                                            {
                                                matches.medium && <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                    <Flex direction="column" >
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Program name</Text>
                                                        <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                    </Flex>
                                                    <Flex direction="column" flex="1" >
                                                        <Text p="2" >{item.programmeName}  </Text>

                                                        <Text p="2">
                                                            {item.programmeDescription}
                                                        </Text>

                                                    </Flex>
                                                    <DeleteIcon onClick={() => deleteEntries('program', item.programmeName)} cursor="pointer" />
                                                </Flex>
                                            }
                                        </Fragment>
                                    )
                                }
                            </Media>




                        )
                    })
                    : null}

            </Flex>
        </Flex>
    );
}

// user created section form

function NewSectionForm({ setSelectedTab, selectedTab, newCategories, updateResumeDbWithFormikValues, resumeData }) {
    return (
        <Flex w={{ base: "100%", md: "50%" }} direction="column" align="center" order={['2', '1']} mt={['8', 0]} >
            <Text color={'gray.600'}>
                {selectedTab.toUpperCase()}
            </Text>
            <Flex w="90%" bgColor="white" borderRadius="3xl" shadow="lg" direction="column" p="8" mt={["2", "8"]}>


                <Formik
                    initialValues={{
                        fieldName: "",
                        fieldDescription: "",
                    }}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        console.log("new values");
                        console.log(values);

                        setTimeout(() => {
                            updateResumeDbWithFormikValues({ "newSection": { ...values } }, 'newSection', selectedTab);
                            actions.setSubmitting(false);
                        }, 2000);

                    }}
                >
                    {
                        (props) => (
                            <Form>
                                <Field name="fieldName" >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="fieldName" isRequired>
                                                <FormLabel>Field Name</FormLabel>
                                                <Input variant="filled" {...field} type="text" />
                                                <FormErrorMessage>Name is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>

                                <Field name="fieldDescription"  >
                                    {
                                        ({ field, form }) => (

                                            <FormControl id="fieldDescription" isRequired mt="8">
                                                <FormLabel>Add Description</FormLabel>
                                                <Textarea variant="filled" {...field} placeholder="Add description" />
                                                <FormErrorMessage>description is required</FormErrorMessage>
                                            </FormControl>

                                        )
                                    }
                                </Field>


                                {/* <Button leftIcon={<AddIcon />} colorScheme="blue" variant="outline" mt="8" alignSelf={'start'} borderRadius='40' >
                                    Add new
                                </Button> */}

                                <Flex mt="16" direction={['column', 'row']} justify={['center']} align={['stretch', 'center']} >
                                    <Button colorScheme="blue" variant="solid" borderRadius='32' type="submit" isLoading={props.isSubmitting} >Save</Button>
                                    <Button colorScheme="blue" variant="outline" borderRadius='32' ml={{ md: "2" }} mt={{ base: "2", md: "0" }} onClick={() => {
                                        // console.log(newCategories);
                                        Object.keys(newCategories).every((category, index) => {
                                            console.log(category);
                                            console.log(newCategories[String(category)]);
                                            if (newCategories[String(category)].includes(selectedTab)) {
                                                console.log("inside if");
                                                if (newCategories[category][newCategories[category].length - 1] === selectedTab) {
                                                    console.log("if last section");

                                                    if (index === Object.keys(newCategories).length - 1) {
                                                        setSelectedTab("personalDetails");
                                                    }
                                                    else {
                                                        setSelectedTab(String(newCategories[Object.keys(newCategories)[index + 1]][0]));
                                                    }

                                                    return false;

                                                } else {
                                                    console.log("not last section");
                                                    let currentTabIndex = newCategories[category].indexOf(selectedTab);
                                                    setSelectedTab(newCategories[category][currentTabIndex + 1]);
                                                    return false;
                                                }
                                            }
                                            return true;
                                        })
                                        // setSelectedTab("");

                                    }} >Next Section</Button>
                                </Flex>

                            </Form>
                        )
                    }
                </Formik>


                <Divider colorScheme="blue" mt="8" />

                {resumeData[`${selectedTab}`] ? (
                    resumeData[`${selectedTab}`].length > 0 ?
                        resumeData[`${selectedTab}`].map(item => {
                            return (

                                <Media queries={{
                                    small: "(max-width: 599px)",
                                    medium: "(min-width: 600px)"
                                }}>
                                    {
                                        matches => (
                                            <Fragment>
                                                {
                                                    matches.small && <Flex direction={["column"]} minH="8" bgColor={"gray.50"} p="8" mt='8' borderRadius="lg" >
                                                        <Flex direction={["column", "row"]}  >
                                                            <Text fontWeight="bold" color={'gray.800'} >Field name</Text>
                                                            <Text ml={["0", "8"]} > {item.fieldName} </Text>
                                                        </Flex>

                                                        <Flex direction={["column", "row"]} mt="8">
                                                            <Text fontWeight="bold" color={'gray.800'} >Description</Text>
                                                            <Text ml={["0", "8"]} >
                                                                {item.fieldDescription}
                                                            </Text>
                                                        </Flex>

                                                    </Flex>
                                                }
                                                {
                                                    matches.medium && <Flex bgColor={"gray.50"} p="2" mt='8' borderRadius="lg">

                                                        <Flex direction="column" >
                                                            <Text fontWeight="bold" color={'gray.700'} p="2" >Field name</Text>
                                                            <Text fontWeight="bold" color={'gray.700'} p="2" >Description</Text>
                                                        </Flex>
                                                        <Flex direction="column" flex="1" >
                                                            <Text p="2" >{item.fieldName}  </Text>

                                                            <Text p="2">
                                                                {item.fieldDescription}
                                                            </Text>

                                                        </Flex>
                                                        {/* <DeleteIcon onClick={() => deleteEntries('program', item.programmeName)} cursor="pointer" /> */}
                                                    </Flex>
                                                }
                                            </Fragment>
                                        )
                                    }
                                </Media>

                            )
                        })
                        : null

                ) : null}

            </Flex>
        </Flex>
    );
}





