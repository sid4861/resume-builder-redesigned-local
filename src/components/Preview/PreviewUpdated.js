import React from "react";
import { Box, Flex } from '@chakra-ui/react';
import { Document, Page, PDFViewer, Text, View, Image } from '@react-pdf/renderer';

export default function PreviewUpdated({ data, newCategories, checkboxes, profilePictureUrl }) {
    // console.log({ "imageUrl": data.profileImageLink });
    // const imgUrl = { uri: data.profileImageLink };
    console.log(profilePictureUrl);
    return (
        <Flex w={{ base: "100%", md: "27%" }} direction="column" align="center" mr={[0, '4']} mt={["8", "0"]} order={['1', '2']} >
            <div color={'gray.600'}>
                PREVIEW
            </div>

            <Box w="100%" h="70vh" bgColor="white" p="4" mt="8" borderRadius="3xl" shadow="lg" borderWidth="1px" borderColor={'blue.500'}>
                <PDFViewer style={{ width: "100%", maxWidth: "100%", height: "100%" }} >
                    <Document style={{ width: "100%", maxWidth: "100%", height: "100%" }} >
                        <Page size="A4" style={{ padding: "8" }} >
                            <View style={{ backgroundColor: "#ffffff", padding: "8", color: "#ffffff", flexDirection: "row" }}>

                                <View style={{ backgroundColor: "#373d48", width: "30%", flexDirection: "column", alignItems: "flex-start", padding: "8pt", justifyContent: "space-between" }} >
                                    <View>
                                        {profilePictureUrl ? <Image style={{ width: "60px", height: "60px", borderRadius: "100px" }} source={{
                                            // uri: data.profileImageLink,
                                            uri: profilePictureUrl,
                                            method: "GET",
                                            headers: {
                                                'Access-Control-Allow-Origin': '*',
                                                // "Access-Control-Request-Method": "GET",
                                                Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                                                Connection: "keep-alive",
                                                Host: "resumebuilderbucket.s3.ap-south-1.amazonaws.com",
                                                'Sec-Fetch-Dest': "image",
                                                "Sec-Fetch-Mode": "no-cors",
                                                "Sec-Fetch-Site": "cross-site",
                                                'User-Agent': "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                                                Pragma: 'no-cache',
                                                'Cache-Control': 'no-cache'
                                            }
                                        }} ></Image> : null}
                                        <Text style={{ fontSize: "12px", marginTop: "9pt", fontWeight: "bold", color: "#ffffff" }} > Dr. {data.firstName} {data.middleName} {data.lastName} </Text>
                                        {data.licenceNo.length > 0 ? (<Text style={{ marginTop: "6px", fontSize: "10", color: "#ffffff" }} >{data.licenceNo}</Text>) : null}
                                    </View>

                                    <View>
                                        <Text style={{ marginTop: "9pt", lineHeight: "2", fontSize: "9px" }} >{data.phoneNumberPrimary}</Text>
                                        <Text style={{ marginTop: "4pt", lineHeight: "2", fontSize: "9px" }} >{data.emailPrimary}</Text>
                                    </View>
                                </View>

                                <View style={{ width: "70%", padding: "8pt", flexDirection: "column", backgroundColor: "#F2F2F2" }} >

                                    {
                                        (data.acedemicCheckBox && checkboxes.education && data.educationPG.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                                <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600", color: "#02223C" }} >EDUCATION BACKGROUND</Text>

                                                {data.educationPG.map((education, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                        <Text style={{ color: "#4a4a4a", fontWeight: "bold", fontSize: "16px" }} > {education.universityName} {education.degreeName}</Text>
                                                        <Text style={{ fontSize: "12px", color: "#4a4a4a" }} >  {education.degreeType} </Text>
                                                        <Text style={{ fontSize: "12px", color: "#4a4a4a" }} > {education.degreeStartDate} - {education.degreeEndDate}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }

                                </View>

                            </View>

                            <View style={{ backgroundColor: "#ffffff", paddingLeft: "8", paddingRight: '8', marginTop: "-8", color: "#ffffff", flexDirection: "row" }}>
                                <View style={{ backgroundColor: "#F2F2F2", width: "30%", flexDirection: "column", alignItems: "flex-start", padding: "16pt" }} >
                                    <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600", color: "#02223C" }} >EMPLOYMENT HISTORY</Text>

                                    {/* professional experiences */}

                                    {
                                        (data.clinicalCheckBox && checkboxes.workExperience && data.proffessionalExperiences.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px" }} >
                                                {/* <Text style={{ marginTop: "8pt", fontSize: "14pt", color: "#4a4a4a" }} >Professional Experiences:</Text> */}

                                                {data.proffessionalExperiences.map((experience, index) => (
                                                    <View style={{ marginLeft: "4px", marginTop: "8px", fontSize: "10" }}  >
                                                        <Text style={{ color: "#4a4a4a", fontSize: "10pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "10pt" }} > ORGANIZATION NAME {experience.organisationName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "10pt" }} > POSITION/TITLE {experience.position} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "10pt" }} > JOB TYPE {experience.type} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "10pt" }} > START DATE{experience.startDate} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "10pt" }} > {experience.endDate} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "10pt" }} > DESCRIPTION {experience.description} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }

                                </View>

                                <View style={{ width: "70%", padding: "8pt", flexDirection: "column", backgroundColor: "#ffffff" }} >

                                    {/* //Clinical */}

                                    {(data.clinicalCheckBox && ((data.medicalLicenses.length > 0) || (data.medicalLicenses.length > 0) || (data.hospitalExperiences.length > 0) || (data.specialAssignmentsServed.length > 0) || (data.proffessionalPositions.length > 0) || (data.previousProfessionalPositionsAndAppointments.length > 0) || (data.specialTrainings.length > 0) || (data.honorsAndAwards.length > 0))) ?
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600", color: "#02223C" }} >CLINICAL EXPERIENCES</Text>
                                        : null}

                                    {/* medicine Licenses */}

                                    {(data.clinicalCheckBox && (checkboxes.medicalLicense && data.medicalLicenses.length > 0)) ? <View style={{ display: 'block', marginTop: "16px" }} >
                                        <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} > Medical Licenses </Text>
                                        {data.medicalLicenses.map((experience, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >

                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > LICENSE NUMBER {experience.number} </Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {experience.description} </Text>

                                            </View>
                                        ))}
                                    </View> : null}


                                    {/* cme Training */}

                                    {(data.clinicalCheckBox && checkboxes.specialTraining && (data.specialTrainings.length > 0)) ? <View style={{ display: 'block', marginTop: "16px" }} >
                                        <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} > CME and Training: </Text>
                                        {data.specialTrainings.map((training, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > TRAINING NAME {training.trainingName} </Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {training.trainingDescription} </Text>
                                            </View>
                                        ))}
                                    </View> : null}




                                    {/* awards and honors */}

                                    {
                                        (data.clinicalCheckBox && checkboxes.awardsAndHonors && data.honorsAndAwards.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px" }} >
                                                <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} >Awards / honors</Text>

                                                {data.honorsAndAwards.map((award, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }}>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} >AWARD NAME {award.awardName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} >AWARDING AUTHORITY {award.awardingAuthority} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DATE RECEIVED {award.awardDate} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {award.awardDescription} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }

                                    {/* --------------------------------------------------- */}

                                    {/* Academics */}

                                    {(data.acedemicCheckBox && ((data.educationPG.length > 0) || (data.fellowships.length > 0) || (data.additionalTeachingActivities.length > 0) || (data.dissertationAndThesis.length > 0) || (data.bibliography.length > 0))) ?
                                        <Text style={{ marginTop: "32pt", fontSize: "16", fontWeight: "600", color: "#02223C" }} >ACADEMICS</Text>
                                        : null}

                                    {/* fellowship section */}

                                    {
                                        (data.acedemicCheckBox && checkboxes.fellowship && data.fellowships.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px" }} >
                                                <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} >Fellowships</Text>

                                                {data.fellowships.map((fellowship, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > UNIVERSITY NAME {fellowship.universityName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > FELLOWSHIP NAME {fellowship.fellowshipName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > TYPE {fellowship.fellowshipType} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > START DATE {fellowship.fellowshipStartDate} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > {fellowship.fellowshipEndDate} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {fellowship.fellowshipDescription} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }

                                    {/* teaching experience section */}

                                    {
                                        (data.acedemicCheckBox && checkboxes.teachingExperience && data.additionalTeachingActivities.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px", }} >
                                                <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }}  >Teaching experience</Text>

                                                {data.additionalTeachingActivities.map((exp, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > POSITION NAME {exp.positionName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > START DATE {exp.teachingExperienceStartDate} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > END DATE {exp.teachingExperienceEndDate} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {exp.teachingExperienceDescription} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }
                                    {/* thesis section */}

                                    {
                                        (data.acedemicCheckBox && checkboxes.thesis && data.dissertationAndThesis.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px" }} >
                                                <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} >Thesis</Text>

                                                {data.dissertationAndThesis.map((thesis, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > TITLE {thesis.thesisName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {thesis.thesisDescription} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }

                                    {/* bibliography section */}

                                    {
                                        (data.acedemicCheckBox && checkboxes.bibliography && data.bibliography.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px" }} >
                                                <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} >Bibliography</Text>

                                                {data.bibliography.map((item, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > TITLE {item.bibliographyName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {item.bibliographyDescription} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }



                                    {/* --------------------------------------------------- */}
                                    {/* conferences and congress */}
                                    {(data.conferencesAndCongressCheckBox && ((data.professionalPresentationInConference.length > 0) || (data.conferencesParticipatedAsDelegate.length > 0) || (data.megaScientificProgramsConducted.length > 0))) ?
                                        <Text style={{ marginTop: "32pt", fontSize: "16", fontWeight: "600", color: "#02223C" }} >CONFERENCES AND CONGRESS</Text>
                                        : null}



                                    {/* presentation section */}

                                    {
                                        (data.conferencesAndCongressCheckBox && checkboxes.presentation && data.professionalPresentationInConference.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px", }} >
                                                <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} >Presentations</Text>

                                                {data.professionalPresentationInConference.map((item, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > TITLE {item.presentationName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {item.presentationDescription} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }

                                    {/* Conferences section */}

                                    {
                                        (data.conferencesAndCongressCheckBox && checkboxes.participation && data.conferencesParticipatedAsDelegate.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                                <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }}>Conferences attended</Text>

                                                {data.conferencesParticipatedAsDelegate.map((item, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > EVENT/CONFERENCE NAME {item.eventName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {item.eventDescription} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }

                                    {/* Programs section */}

                                    {
                                        (data.conferencesAndCongressCheckBox && checkboxes.programs && data.megaScientificProgramsConducted.length > 0) ?
                                            <View style={{ display: 'block', marginTop: "16px" }} >
                                                <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} >Programs conducted</Text>

                                                {data.megaScientificProgramsConducted.map((item, index) => (
                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > NAME {item.programmeName} </Text>
                                                        <Text style={{ color: "#4a4a4a", fontSize: "12pt" }}> DESCRIPTION {item.programmeDescription} </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            : null
                                    }

                                    {/* user defined categories */}
                                    {
                                        Object.keys(newCategories).length > 0 ?

                                            (
                                                Object.keys(newCategories).map(key => (
                                                    <View style={{ marginTop: "10px" }} >
                                                        <Text style={{ marginTop: "32pt", fontSize: "16", fontWeight: "600", color: "#02223C" }} >{key}</Text>
                                                        {
                                                            newCategories[`${key}`].map(section => (

                                                                (data[`${section}`].length > 0 && checkboxes[`${section}`]) ?
                                                                    (<View style={{ display: 'block', marginTop: "16px" }} >
                                                                        <Text style={{ marginTop: "8pt", fontSize: "16pt", color: "#4a4a4a", fontWeight: "bold" }} >{section}</Text>

                                                                        {data[`${section}`].map((item, index) => (
                                                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > FIELD NAME {item[Object.keys(item)[0]]} </Text>
                                                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {item[Object.keys(item)[1]]} </Text>
                                                                            </View>
                                                                        ))}
                                                                    </View>
                                                                    )
                                                                    : null


                                                            ))
                                                        }
                                                    </View>

                                                ))
                                            )


                                            : null
                                    }
                                    {/* -------------------------------------------------------------------- */}
                                    {/* Social */}
                                    <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600", color: "#02223C" }} >SOCIAL</Text>

                                    {
                                        checkboxes.personalDetails ?
                                            <Text style={{ marginTop: "8pt", fontSize: "14pt", color: "#4a4a4a" }} >
                                                Personal:
                                            </Text>
                                            : null
                                    }

                                    {
                                        checkboxes.personalDetails ?
                                            <View style={{ marginLeft: "12px", marginTop: "8pt", fontSize: "10" }} >
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", marginTop: "4pt" }} > NAME: {data.firstName} {data.middleName} {data.lastName} </Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", marginTop: "4pt" }}>DATE OF BIRTH: {data.DOB} </Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", marginTop: "4pt" }}>EMAIL ID: {data.emailPrimary}</Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", marginTop: "4pt" }}> SECONDARY EMAIL ID: {data.emailSecondary} </Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", marginTop: "4pt" }}>PHONE NUMBER: {data.phoneNumberPrimary} </Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", marginTop: "4pt" }}>SECONDARY PHONE NUMBER: {data.phoneNumberSecondary} </Text>
                                            </View>
                                            : null
                                    }


                                    {/* communityActivity */}

                                    {(checkboxes.communityActivity && data.communityActivity.length > 0) ? <View style={{ display: 'block', marginTop: "16pt" }} >
                                        <Text style={{ marginTop: "8pt", fontSize: "14pt", color: "#4a4a4a" }} > Community Activites: </Text>
                                        {data.communityActivity.map((experience, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "4px", fontSize: "10" }} >
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt", position: "relative", top: "12pt", right: "10pt" }} >{index + 1}</Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > ACTIVITY NAME {experience.name} </Text>
                                                <Text style={{ color: "#4a4a4a", fontSize: "12pt" }} > DESCRIPTION {experience.description} </Text>
                                            </View>
                                        ))}
                                    </View> : null}


                                </View>

                            </View>
                            {/* ---------------------------------------------------------------------------------------							 */}

                        </Page>
                    </Document>
                </PDFViewer>
            </Box>

        </Flex>
    );
}