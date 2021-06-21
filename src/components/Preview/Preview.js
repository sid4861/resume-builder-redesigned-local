import React from "react";
import { Box, Flex } from '@chakra-ui/react';
import { Document, Page, PDFViewer, Text, View, Image } from '@react-pdf/renderer';

export default function Preview({ data, newCategories, checkboxes, profilePictureUrl }) {
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
                            <View style={{ backgroundColor: "#373d48", padding: "8", color: "#ffffff", flexDirection: "row", justifyContent: "space-between" }}>

                                <View style={{ width: "80%", flexDirection: "column" }} >
                                    <Text style={{ fontSize: "16px", fontWeight: "bold" }} > {data.firstName} {data.middleName} {data.lastName} </Text>
                                    <Text style={{ marginTop: "9px", lineHeight: "2", fontSize: "9px" }} >{data.intro}</Text>
                                    {data.licenceNo.length > 0 ? (<Text style={{ marginTop: "6px", fontSize: "16", fontWeight: "400" }} >License No. {data.licenceNo}</Text>) : null}
                                </View>

                                <View style={{ width: "20%", flexDirection: "column" }} >
                                    {profilePictureUrl ? <Image style={{ width: "100px", height: "auto" }} source={{
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
                                </View>

                            </View>

                            {/* ---------------------------------------------------------------------------------------							 */}
                            {/* //Clinical */}

                            {(data.clinicalCheckBox && ((data.medicalLicenses.length > 0) || (data.medicalLicenses.length > 0) || (data.hospitalExperiences.length > 0) || (data.specialAssignmentsServed.length > 0) || (data.proffessionalPositions.length > 0) || (data.previousProfessionalPositionsAndAppointments.length > 0) || (data.specialTrainings.length > 0) || (data.honorsAndAwards.length > 0))) ?
                                <View style={{ backgroundColor: "#373d48", padding: "16 8 16 8", color: "#ffffff", marginTop: "10px" }} >
                                    <Text>Clinical Experiences</Text>
                                </View>
                                : null}

                            {/* medicine Licenses */}

                            {(data.clinicalCheckBox && (checkboxes.medicalLicense && data.medicalLicenses.length > 0)) ? <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} > Medical Licenses </Text>
                                {data.medicalLicenses.map((experience, index) => (
                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                        <Text> &#8226; {experience.number} </Text>
                                        <Text> {experience.description} </Text>
                                    </View>
                                ))}
                            </View> : null}


                            {/* cme Training */}

                            {(data.clinicalCheckBox && checkboxes.specialTraining && (data.specialTrainings.length > 0)) ? <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} > CME and Training: </Text>
                                {data.specialTrainings.map((training, index) => (
                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                        <Text> &#8226; {training.trainingName} </Text>
                                        <Text> {training.trainingDescription} </Text>
                                    </View>
                                ))}
                            </View> : null}

                            {/* professional experiences */}

                            {
                                (data.clinicalCheckBox && checkboxes.workExperience && data.proffessionalExperiences.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Professional Experiences:</Text>

                                        {data.proffessionalExperiences.map((experience, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {experience.organisationName} </Text>
                                                <Text> {experience.position} </Text>
                                                <Text> {experience.type} </Text>
                                                <Text> {experience.startDate} </Text>
                                                <Text> {experience.endDate} </Text>
                                                <Text> {experience.description} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }


                            {/* awards and honors */}

                            {
                                (data.clinicalCheckBox && checkboxes.awardsAndHonors && data.honorsAndAwards.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Awards / honors</Text>

                                        {data.honorsAndAwards.map((award, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {award.awardName} </Text>
                                                <Text> {award.awardingAuthority} </Text>
                                                <Text> {award.awardDate} </Text>
                                                <Text> {award.awardDescription} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }

                            {/* --------------------------------------------------- */}

                            {/* Academics */}

                            {(data.acedemicCheckBox && ((data.educationPG.length > 0) || (data.fellowships.length > 0) || (data.additionalTeachingActivities.length > 0) || (data.dissertationAndThesis.length > 0) || (data.bibliography.length > 0))) ?
                                <View style={{ backgroundColor: "#373d48", padding: "16 8 16 8", color: "#ffffff", marginTop: "10px" }}  >
                                    <Text>Academics</Text>
                                </View>
                                : null}

                            {/* education section */}

                            {
                                (data.acedemicCheckBox && checkboxes.education && data.educationPG.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Education</Text>

                                        {data.educationPG.map((education, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {education.universityName} </Text>
                                                <Text> {education.degreeName} </Text>
                                                <Text> {education.degreeType} </Text>
                                                <Text> {education.degreeStartDate} </Text>
                                                <Text> {education.degreeEndDate} </Text>
                                                <Text> {education.degreeDescription} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }

                            {/* fellowship section */}

                            {
                                (data.acedemicCheckBox && checkboxes.fellowship && data.fellowships.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Fellowships</Text>

                                        {data.fellowships.map((fellowship, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {fellowship.universityName} </Text>
                                                <Text> {fellowship.fellowshipName} </Text>
                                                <Text> {fellowship.fellowshipType} </Text>
                                                <Text> {fellowship.fellowshipStartDate} </Text>
                                                <Text> {fellowship.fellowshipEndDate} </Text>
                                                <Text> {fellowship.fellowshipDescription} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }

                            {/* teaching experience section */}

                            {
                                (data.acedemicCheckBox && checkboxes.teachingExperience && data.additionalTeachingActivities.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Teaching experience</Text>

                                        {data.additionalTeachingActivities.map((exp, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {exp.positionName} </Text>
                                                <Text> {exp.teachingExperienceStartDate} </Text>
                                                <Text> {exp.teachingExperienceEndDate} </Text>
                                                <Text> {exp.fellowshipStartDate} </Text>
                                                <Text> {exp.teachingExperienceDescription} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }
                            {/* thesis section */}

                            {
                                (data.acedemicCheckBox && checkboxes.thesis && data.dissertationAndThesis.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Thesis</Text>

                                        {data.dissertationAndThesis.map((thesis, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {thesis.thesisName} </Text>
                                                <Text> {thesis.thesisDescription} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }

                            {/* bibliography section */}

                            {
                                (data.acedemicCheckBox && checkboxes.bibliography && data.bibliography.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Bibliography</Text>

                                        {data.bibliography.map((item, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {item.bibliographyName} </Text>
                                                <Text> {item.bibliographyDescription} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }



                            {/* --------------------------------------------------- */}
                            {/* conferences and congress */}
                            {(data.conferencesAndCongressCheckBox && ((data.professionalPresentationInConference.length > 0) || (data.conferencesParticipatedAsDelegate.length > 0) || (data.megaScientificProgramsConducted.length > 0))) ?
                                <View style={{ backgroundColor: "#373d48", padding: "16 8 16 8", color: "#ffffff", marginTop: "10px" }} >
                                    <Text>Conferences and Congress</Text>
                                </View>
                                : null}



                            {/* presentation section */}

                            {
                                (data.conferencesAndCongressCheckBox && checkboxes.presentation && data.professionalPresentationInConference.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Presentations</Text>

                                        {data.professionalPresentationInConference.map((item, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {item.presentationName} </Text>
                                                <Text> {item.presentationDescription} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }

                            {/* Conferences section */}

                            {
                                (data.conferencesAndCongressCheckBox && checkboxes.participation && data.conferencesParticipatedAsDelegate.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Conferences attended</Text>

                                        {data.conferencesParticipatedAsDelegate.map((item, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {item.eventName} </Text>
                                                <Text> {item.eventDescription} </Text>
                                            </View>
                                        ))}
                                    </View>
                                    : null
                            }

                            {/* Programs section */}

                            {
                                (data.conferencesAndCongressCheckBox && checkboxes.programs && data.megaScientificProgramsConducted.length > 0) ?
                                    <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                        <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >Programs conducted</Text>

                                        {data.megaScientificProgramsConducted.map((item, index) => (
                                            <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                <Text> &#8226; {item.programmeName} </Text>
                                                <Text> {item.programmeDescription} </Text>
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
                                                <View style={{ backgroundColor: "#373d48", padding: "16 8 16 8", color: "#ffffff" }} >
                                                    <Text>{key}</Text>
                                                </View>
                                                {
                                                    newCategories[`${key}`].map(section => (

                                                        (data[`${section}`].length > 0 && checkboxes[`${section}`] ) ?
                                                            (<View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                                                <Text style={{ marginTop: "8px", fontSize: "16", fontWeight: "600" }} >{section}</Text>

                                                                {data[`${section}`].map((item, index) => (
                                                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                                                        <Text> &#8226; {item[Object.keys(item)[0]]} </Text>
                                                                        <Text> {item[Object.keys(item)[1]]} </Text>
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
                            <View style={{ backgroundColor: "#373d48", padding: "16 8 16 8", color: "#ffffff", marginTop: "10px" }} >
                                <Text>Social</Text>
                            </View>

                            {
                                checkboxes.personalDetails ?
                                    <Text style={{ marginTop: "16px", marginLeft: "20px", fontSize: "16" }} >
                                        Personal:
                                    </Text>
                                    : null
                            }

                            {
                                checkboxes.personalDetails ?
                                    <View style={{ marginLeft: "32px" }} >
                                        <Text style={{ fontSize: "10" }} > <span>&#8226;</span>Name: {data.firstName} {data.middleName} {data.lastName} </Text>
                                        <Text style={{ marginTop: "8px", fontSize: "10" }}><span>&#8226;</span>Date of Birth: {data.DOB} </Text>
                                        <Text style={{ marginTop: "8px", fontSize: "10" }}><span>&#8226;</span>Email Id: {data.emailPrimary}</Text>
                                        <Text style={{ marginTop: "8px", fontSize: "10" }}> <span>&#8226;</span>Secondary Email Id: {data.emailSecondary} </Text>
                                        <Text style={{ marginTop: "8px", fontSize: "10" }}><span>&#8226;</span>Phone Number: {data.phoneNumberPrimary} </Text>
                                        <Text style={{ marginTop: "8px", fontSize: "10" }}><span>&#8226;</span>Secondary Phone Number: {data.phoneNumberSecondary} </Text>
                                    </View>
                                    : null
                            }


                            {/* communityActivity */}

                            {(checkboxes.communityActivity && data.communityActivity.length > 0) ? <View style={{ display: 'block', marginTop: "16px", marginLeft: "20px" }} >
                                <Text style={{ marginTop: "8px", fontSize: "16" }} > Community Activites: </Text>
                                {data.communityActivity.map((experience, index) => (
                                    <View style={{ marginLeft: "12px", marginTop: "8px", fontSize: "10" }} >
                                        <Text> &#8226; {experience.name} </Text>
                                        <Text> {experience.description} </Text>
                                    </View>
                                ))}
                            </View> : null}

                        </Page>
                    </Document>
                </PDFViewer>
            </Box>

        </Flex>
    );
}