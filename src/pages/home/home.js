import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Drawer from "../../components/Drawer/Drawer";
import DrawerNew from "../../components/Drawer/Drawer-new";
import { Flex, Box } from '@chakra-ui/react';
import FormInputs from "../../components/Form/Form";
import Preview from "../../components/Preview/Preview";
import PreviewUpdated from "../../components/Preview/PreviewUpdated";
import Footer from "../../components/Footer/Footer";
import { TabContextProvider } from "../../Context/selectedTab.context";
import axios from "axios";

export default function Home() {

    const [newCategories, setNewCategories] = React.useState({});
    const [cookie, setCookie] = React.useState("");
    const defaultCategories = {
        "personal": ["personalDetails", "communityActivity"],
        "clinical": ["medicalLicense", "specialTraining", "workExperience", "awardsAndHonors"],
        "academia": ["education", "fellowship", "teachingExperience", "thesis", "bibliography"],
        "conferences": ["presentation", "participation", "programs"]
    };
    const [profilePictureUrl, setProfilePictureUrl] = React.useState("");

    const [checkboxes, setCheckboxes] = React.useState({
        personalDetails: true,
        communityActivity: true,
        medicalLicense: true,
        specialTraining: true,
        workExperience: true,
        awardsAndHonors: true,
        education: true,
        fellowship: true,
        teachingExperience: true,
        thesis: true,
        bibliography: true,
        presentation: true,
        participation: true,
        programs: true,

    });

    const [resumeData, setResumeData] = React.useState({

        selectedFile: null,
        profileImageLink: "",
        profileImageKey: "",
        firstName: "",
        middleName: "",
        lastName: "",
        DOB: "dd/mm/yyyy",
        Gender: "",
        intro: "",
        licenceNo: "",
        emailPrimary: "",
        emailSecondary: "",
        phoneNumberPrimary: "",
        phoneNumberSecondary: "",
        communityActivity: [],
        communityActivityCheckBox: true,
        clinicalCheckBox: true,
        clinicalTab: 'medicalLicenses',
        medicalLicenses: [],
        medicalLicensesCheckBox: true,
        proffessionalExperiences: [],
        proffessionalExperiencesCheckBox: true,
        hospitalExperiences: [],
        hospitalExperiencesCheckBox: true,
        specialAssignmentsServed: [],
        specialAssignmentsServedCheckBox: true,
        proffessionalPositions: [],
        proffessionalPositionsCheckBox: true,
        previousProfessionalPositionsAndAppointments: [],
        previousProfessionalPositionsAndAppointmentsCheckBox: true,
        specialTrainings: [],
        specialTrainingsCheckBox: true,
        honorsAndAwards: [],
        honorsAndAwardsCheckBox: true,

        acedemicCheckBox: true,
        acedemicTab: 'educationPG',
        educationPG: [],
        educationPGCheckBox: true,
        fellowships: [],
        fellowshipsCheckBox: true,
        additionalTeachingActivities: [],
        additionalTeachingActivitiesCheckBox: true,
        dissertationAndThesis: [],
        dissertationAndThesisCheckBox: true,
        bibliography: [],
        bibliographyCheckBox: true,

        conferencesAndCongressCheckBox: true,
        conferencesAndCongressTab: 'professionalPresentationInConference',
        professionalPresentationInConference: [],
        professionalPresentationInConferenceCheckBox: true,
        conferencesParticipatedAsDelegate: [],
        conferencesParticipatedAsDelegateCheckBox: true,
        megaScientificProgramsConducted: [],
        megaScientificProgramsConductedCheckBox: true,
    });

    function getRandomText(length) {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
        var text = "";
        for (var i = 0; i < length; i++) text += charset[Math.floor(Math.random() * charset.length)];
        return text;
    }

    function createCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function feedPreviousData(pastData) {

        console.log("state before updating with previous data");
        console.log(resumeData);
        console.log("From feedPreviousData", pastData);

        let newCategoriesObject = {};

        let newSectionsDataObject = {};
        let newCategoriesArray = [];

        if (Object.keys(pastData).includes("userDefinedCategories")) {
            newCategoriesArray = [...pastData.userDefinedCategories];
            newCategoriesArray.forEach(item => {
                let objectKey = Object.keys(item)[0];
                newCategoriesObject[objectKey] = [...item[objectKey]];
                item[objectKey].forEach(section => {
                    if (pastData[section]) {
                        newSectionsDataObject[section] = [...pastData[section]];
                    } else {
                        newSectionsDataObject[section] = [];
                    }
                })
            });
        }

        setResumeData({
            ...resumeData,
            "licenceNo": pastData.licenceNo,
            "firstName": pastData.firstName,
            "middleName": pastData.middleName,
            "lastName": pastData.lastName,
            "DOB": pastData.DOB,
            "Gender": pastData.Gender,
            "intro": pastData.intro,
            "emailPrimary": pastData.emailPrimary,
            "emailSecondary": pastData.emailSecondary,
            "phoneNumberPrimary": pastData.phoneNumberPrimary,
            "phoneNumberSecondary": pastData.phoneNumberSecondary,
            "communityActivityCheckBox": pastData.communityActivityCheckBox,
            "clinicalCheckBox": pastData.clinicalCheckBox,
            "medicalLicensesCheckBox": pastData.medicalLicensesCheckBox,
            "proffessionalExperiencesCheckBox": pastData.proffessionalExperiencesCheckBox,
            "hospitalExperiencesCheckBox": pastData.hospitalExperiencesCheckBox,
            "specialAssignmentsServedCheckBox": pastData.specialAssignmentsServedCheckBox,
            "proffessionalPositionsCheckBox": pastData.proffessionalPositionsCheckBox,
            "previousProfessionalPositionsAndAppointmentsCheckBox": pastData.previousProfessionalPositionsAndAppointmentsCheckBox,
            "specialTrainingsCheckBox": pastData.specialTrainingsCheckBox,
            "honorsAndAwardsCheckBox": pastData.honorsAndAwardsCheckBox,
            "acedemicCheckBox": pastData.acedemicCheckBox,
            "educationPGCheckBox": pastData.educationPGCheckBox,
            "fellowshipsCheckBox": pastData.fellowshipsCheckBox,
            "additionalTeachingActivitiesCheckBox": pastData.additionalTeachingActivitiesCheckBox,
            "dissertationAndThesisCheckBox": pastData.dissertationAndThesisCheckBox,
            "bibliographyCheckBox": pastData.bibliographyCheckBox,
            "conferencesAndCongressCheckBox": pastData.conferencesAndCongressCheckBox,
            "professionalPresentationInConferenceCheckBox": pastData.professionalPresentationInConferenceCheckBox,
            "conferencesParticipatedAsDelegateCheckBox": pastData.conferencesParticipatedAsDelegateCheckBox,
            "megaScientificProgramsConductedCheckBox": pastData.megaScientificProgramsConductedCheckBox,
            "communityActivity": pastData.communityActivity,
            "medicalLicenses": pastData.medicalLicenses,
            "proffessionalExperiences": pastData.proffessionalExperiences,
            "hospitalExperiences": pastData.hospitalExperiences,
            "specialAssignmentsServed": pastData.specialAssignmentsServed,
            "proffessionalPositions": pastData.proffessionalPositions,
            "previousProfessionalPositionsAndAppointments": pastData.previousProfessionalPositionsAndAppointments,
            "specialTrainings": pastData.specialTrainings,
            "honorsAndAwards": pastData.honorsAndAwards,
            "educationPG": pastData.educationPG,
            "fellowships": pastData.fellowships,
            "additionalTeachingActivities": pastData.additionalTeachingActivities,
            "dissertationAndThesis": pastData.dissertationAndThesis,
            "bibliography": pastData.bibliography,
            "professionalPresentationInConference": pastData.professionalPresentationInConference,
            "conferencesParticipatedAsDelegate": pastData.conferencesParticipatedAsDelegate,
            "megaScientificProgramsConducted": pastData.megaScientificProgramsConducted,
            "profileImageKey": pastData.profileImageKey,
            "profileImageLink": pastData.profileImageLink,
            ...newSectionsDataObject

        });
        // console.log("state after updating from previous data");
        // console.log(resumeData);

        // setting new categories from db

        setNewCategories({
            ...newCategories,
            ...newCategoriesObject
        });

        // setResumeData({
        //     ...resumeData,
        //     ...newSectionsDataObject
        // });


        // // getting profile image signed url
        // const formData = new FormData();
        // // Update the formData object 
        // formData.append(
        //     "profileImageKey",
        //     pastData.profileImageKey
        // );
        // axios({
        //     method: 'post',
        //     url: 'https://d35i404c0fzoty.cloudfront.net/api/getProfilePic',
        //     data: formData,
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // })
        //     .then((response) => {
        //         console.log("New Image", response.data);
        //         // pastProfilePic(response.data);
        //         console.log(response);
        //     })
        //     .catch(function (response) {
        //         //handle error
        //         console.log(response);
        //     });


    }

    // function pastProfilePic(url) {
    //     console.log("inside profile pic function");
    //     console.log(resumeData);
    //     let updatedState = {
    //         ...resumeData
    //         // "profileImageLink": url
    //     }
    //     updatedState.profileImageLink = url;

    //     setResumeData({

    //         ...updatedState
    //     });
    // }


    React.useEffect(() => {

        console.log("inside save category useeffect");
        let newCategoriesArray = [];
        let resumeDataPayload = null;


        if (Object.keys(newCategories).length === 0) {
            console.log("newcategories state empty now");
            return;
        }
        Object.keys(newCategories).forEach(key => {
            newCategoriesArray.push({
                [key]: [...newCategories[key]]
            });
        });
        resumeDataPayload = {
            ...resumeData, "userDefinedCategories": [...newCategoriesArray],
            "cookieToken": cookie
        };

        const formData = new FormData();

        console.log(resumeDataPayload);
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
                console.log("resume update api invoked inside category add useeffect");
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                //console.log(response);
            });

    }, [newCategories, resumeData]);

    React.useEffect(() => {
        console.log("inside use effect");
        async function initSession() {
            let cookieToken = getCookie("Token");
            //if cookie is there, get existing data from db
            if (cookieToken) {
                // console.log({cookieToken});
                setCookie(cookieToken);
                const formData = new FormData();
                formData.append(
                    "cookieToken",
                    cookieToken
                );

                axios({
                    method: 'post',
                    url: 'https://d35i404c0fzoty.cloudfront.net/api/getData',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                    .then((response) => {
                        //handle success
                        let pastData = response.data.resumeData[0];
                        // console.log({pastData});
                        feedPreviousData(pastData);
                        // mixpanel.track("Build Resume Page", { "cookieToken": cookieToken });
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });


            } else {

                let newCookie = getRandomText(16);
                //creating browser cookie for 360 days
                createCookie("Token", newCookie, "360");
                console.log({ newCookie });
                setCookie(newCookie);
                const formData = new FormData();

                formData.append(
                    "cookieToken",
                    newCookie
                );

                axios({
                    method: 'post',
                    url: 'https://d35i404c0fzoty.cloudfront.net/api/createNewUser',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                    .then(function (response) {
                        console.log("New User Created");
                        console.log(response);
                        // mixpanel.track("Build Resume Page", { "cookieToken": newCookie });
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });

            }
        }

        initSession();

    }, []);

    React.useEffect(() => {
        async function getProfilePicUrl() {
            // getting profile image signed url
            const formData = new FormData();
            // Update the formData object 
            console.log({ "profile image key": resumeData.profileImageKey });
            formData.append(
                "profileImageKey",
                resumeData.profileImageKey
            );
            axios({
                method: 'post',
                url: 'https://d35i404c0fzoty.cloudfront.net/api/getProfilePic',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then((response) => {
                    console.log("New Image", response.data);
                    // pastProfilePic(response.data);
                    console.log(response);
                    setProfilePictureUrl(response.data);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }
        getProfilePicUrl();
    }, [resumeData]);

    return (
        <Box>
            {/* <Navbar /> */}
            <TabContextProvider>
                {/* <Drawer newCategories={newCategories} setNewCategories={setNewCategories} setResumeData={setResumeData} resumeData={resumeData} checkboxes={checkboxes} setCheckboxes={setCheckboxes} /> */}
                <DrawerNew newCategories={newCategories} setNewCategories={setNewCategories} setResumeData={setResumeData} resumeData={resumeData} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
                <Flex direction={{ base: "column", md: "row" }} justify={{ base: "flex-start", md: "flex-end" }} bg={'gray.50'} w="100vw" maxW="100%" pt="46px" pb="8">
                    <FormInputs newCategories={{ ...newCategories }} resumeData={resumeData} setResumeData={setResumeData} cookie={cookie} profilePictureUrl={profilePictureUrl} />
                    {/* <Preview data={resumeData} newCategories={newCategories} checkboxes={checkboxes} profilePictureUrl={profilePictureUrl} /> */}
                    <PreviewUpdated  data={resumeData} newCategories={newCategories} checkboxes={checkboxes} profilePictureUrl={profilePictureUrl} />
                </Flex>
            </TabContextProvider>
            {/* <Box mt="20"></Box> */}
            {/* <Footer /> */}
        </Box>
    );
}
