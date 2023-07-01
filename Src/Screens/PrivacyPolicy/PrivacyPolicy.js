import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../Components/Container/Container';
import TextCustom from '../../Components/Text/Text';

const PrivacyPolicy = () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <TextCustom title={'Privacy Policy'} styles={styles.heading} />
        <TextCustom
          title={
            'This Privacy Policy governs the manner in which our Android application collects, uses, maintains, and discloses information collected from users ("User") of the Cash Flow app ("App").'
          }
          styles={styles.Subheading}
        />
        <View>
          <TextCustom
            title={'1. Personal Identification Information:'}
            styles={styles.point}
          />
          <TextCustom
            title={
              "The App may request the following permission from the User: 'Read SMS' permission. This permission is required to access and read SMS messages from the User's device."
            }
            styles={styles.subPoint}
          />
          <TextCustom
            title={
              'The App will only collect and process SMS data for the sole purpose of providing income and expense statistics to the User. The App will not store or transmit any sensitive personal information contained within the SMS messages.'
            }
            styles={styles.subPoint}
          />
        </View>
        <View>
          <TextCustom
            title={'2. Non-Personal Identification Information:'}
            styles={styles.point}
          />
          <TextCustom
            title={
              "The App may collect non-personal identification information about Users whenever they interact with the App. This information may include technical details such as the device's operating system version, device model, and other similar information."
            }
            styles={styles.subPoint}
          />
        </View>
        <View>
          <TextCustom title={'3. Permissions:'} styles={styles.point} />
          <TextCustom
            title={
              "The App requires the 'Read SMS' permission to analyze SMS data and generate income and expense statistics for the User. The App will only access and process SMS messages necessary for this specific purpose."
            }
            styles={styles.subPoint}
          />
        </View>
        <View>
          <TextCustom
            title={'4. Data Collection and Usage:'}
            styles={styles.point}
          />
          <TextCustom
            title={
              "The App may collect and use the User's SMS data to generate income and expense statistics."
            }
            styles={styles.subPoint}
          />
          <TextCustom
            title={
              "The App may collect non-personal identification information for analytical purposes, to improve the App's functionality, and to enhance the User's experience."
            }
            styles={styles.subPoint}
          />
          <TextCustom
            title={
              'The App will not disclose or share any personal or sensitive information collected from the User with third parties, except as required by law or as necessary to provide the requested services.'
            }
            styles={styles.subPoint}
          />
        </View>

        <View>
          <TextCustom title={'5. Data Security:'} styles={styles.point} />
          <TextCustom
            title={
              "The App implements industry-standard security measures to protect against unauthorized access, alteration, disclosure, or destruction of the User's personal information, including SMS data."
            }
            styles={styles.subPoint}
          />
          <TextCustom
            title={
              "However, please note that no method of transmission over the internet or electronic storage is 100% secure. The App cannot guarantee absolute security of the User's data."
            }
            styles={styles.subPoint}
          />
        </View>
        <View>
          <TextCustom
            title={'6. Third-Party Services:'}
            styles={styles.point}
          />
          <TextCustom
            title={
              'The App may use third-party services, such as analytics tools, to collect and analyze non-personal identification information. These third-party services have their own privacy policies and terms of use that govern their collection and use of information.'
            }
            styles={styles.subPoint}
          />
        </View>
        <View>
          <TextCustom title={"7. Children's Privacy:"} styles={styles.point} />
          <TextCustom
            title={
              'The App is not intended for use by individuals under the age of 13. The App does not knowingly collect or store personal information from children under 13. If you are a parent or guardian and believe that your child has provided personal information through the App, please contact us, and we will promptly delete such information.'
            }
            styles={styles.subPoint}
          />
        </View>
        <View>
          <TextCustom
            title={'8. Changes to this Privacy Policy:'}
            styles={styles.point}
          />
          <TextCustom
            title={
              'The App may update this Privacy Policy at any time. Users are encouraged to check this page periodically for any changes. The User acknowledges and agrees that it is their responsibility to review this Privacy Policy periodically and become aware of any modifications.              '
            }
            styles={styles.subPoint}
          />
        </View>
        <View>
          <TextCustom
            title={'9. Acceptance of these Terms:'}
            styles={styles.point}
          />
          <TextCustom
            title={
              'By using the App, the User signifies their acceptance of this Privacy Policy. If the User does not agree to this policy, please do not use the App.'
            }
            styles={styles.subPoint}
          />
        </View>
        <View>
          <TextCustom title={'10. Contact Us:'} styles={styles.point} />
          <TextCustom
            title={
              'If you have any questions or concerns regarding this Privacy Policy or the practices of the App, please contact us at akshayaksh23484@gmail.com.'
            }
            styles={styles.subPoint}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
  },
  Subheading: {
    fontSize: 14,
  },
  point: {
    fontSize: 16,
    marginTop: 10,
  },
  subPoint: {
    fontSize: 14,
    marginTop: 5,
  },
});
