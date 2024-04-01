import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import userLogo from '../../Assets/avatar.png';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import Theme from '../../Utils/Theme';
// import { db, auth } from "../../Utils/Exports";
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export function DrawerContent(props) {
  const {navigation} = props;
  const [userData, setUserData] = useState([]);
  // useEffect(() => {
  //   const onValueChange = db
  //     .ref(`/Users/${auth.currentUser.uid}`)
  //     .on("value", (snapshot) => {
  //       setUserData(snapshot.val());
  //     });
  //   // Stop listening for updates when no longer required
  //   return () =>
  //     db.ref(`/Users/${auth.currentUser.uid}`).off("value", onValueChange);
  // }, []);
  // useEffect(() => {
  //   navigation.closeDrawer(); // Close the drawer when the component mounts
  // }, []);
  // useEffect(() => {
  //   const currentUser = auth.currentUser;
  //   if (currentUser) {
  //     const onValueChange = db
  //       .ref(`/Users/${currentUser.uid}`)
  //       .on("value", (snapshot) => {
  //         setUserData(snapshot.val());
  //       });
  //       navigation.closeDrawer(); // Close the drawer by default
  //     // Stop listening for updates when no longer required
  //     return () =>
  //       db.ref(`/Users/${currentUser.uid}`).off("value", onValueChange);
  //   }
  // }, []);

  // const signOutUser = async () => {
  //   try {
  //     await auth.signOut();
  //     navigation.navigate("LoginScreen");
  //   } catch (e) {
  //     Alert.alert(e.code, e.message);
  //   }
  // };

  const signOutUser = async () => {
    try {
      if (auth.currentUser) {
        const {email, displayName, providerData} = auth.currentUser;
        const isGoogleSignIn = providerData.some(
          provider => provider.providerId === GoogleSignin.PROVIDER_ID,
        );
        if (isGoogleSignIn) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        }
        await auth.signOut();
        console.log(`User ${displayName} (${email}) logged out successfully`);
        navigation.navigate('LoginScreen');
      } else {
        console.log('No user to log out');
        navigation.navigate('LoginScreen');
      }
    } catch (e) {
      Alert.alert(e.code, e.message);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#262450'}}>
      {/* <DrawerContentScrollView {...props}> */}

      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View
            style={
              {
                // flexDirection: "row",
                // marginTop: 15,
                // alignItems: "center",
                // backgroundColor:'blue'
              }
            }>
            {userData?.profileImg ? (
              <Avatar.Image
                source={{uri: userData?.profileImg}}
                size={50}
                style={{
                  ...Theme.shadow,
                }}
              />
            ) : (
              <Avatar.Image
                source={userLogo}
                size={50}
                style={{...Theme.shadow}}
              />
            )}

            <View
              style={{
                marginLeft: Theme.wp('1.5%'),
                flexDirection: 'column',
              }}>
              {/* <Title style={styles.title}>{userData?.Name}</Title> */}
              <Title style={styles.title}>User Name</Title>

              {/* <Icon
                  name="close"
                  color={Theme.primary}
                  size={Theme.iconSize}
                  onPress={() => navigation.closeDrawer()}
                  style={{
                    position: "absolute",
                    right: -Theme.wp("5%"),
                    top: 0,
                  }}
                /> */}
              {/* <Caption style={styles.caption}>{userData?.Email}</Caption> */}
              {/* <Caption style={styles.caption}>text</Caption> */}
            </View>
          </View>
        </View>
        {/* <Drawer.Section style={styles.drawerSection}> */}
        <DrawerItem
          icon={({size}) => (
            <MIcon name="location-on" color={'#FF4A4A'} size={size} />
          )}
          label="Add Place"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate('AddPlace')}
        />
        <View style={styles.bottomSection}></View>
        <DrawerItem
          icon={({size}) => (
            <Icon name="account-circle-outline" color={'#FF4A4A'} size={size} />
          )}
          label="Profile"
          labelStyle={styles.labelStyle}
          onPress={() =>
            navigation.navigate('Profile', {
              userData: userData,
            })
          }
        />
         <View style={styles.bottomSection}></View>
        <DrawerItem
          icon={({size}) => (
            <Icon name="clipboard-text-outline" color={'#FF4A4A'} size={size} />
          )}
          label="Term and Condition"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate('TermAndCondtion')}
        />
         <View style={styles.bottomSection}></View>
        <DrawerItem
          icon={({size}) => (
            <MIcon name="support-agent" color={'#FF4A4A'} size={size} />
          )}
          label="Support"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate('Support')}
        />
         <View style={styles.bottomSection}></View>
        <DrawerItem
          icon={({size}) => (
            <MIcon name="feedback" color={'#FF4A4A'} size={20} />
          )}
          label="Feedback"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate('Support')}
        />
         <View style={styles.bottomSection}></View>
        <DrawerItem
          icon={({size}) => (
            <FontAwesome name="mail-forward" color={'#FF4A4A'} size={18} />
          )}
          label="Creator Mode"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate('HomePage2')}
        />
         <View style={styles.bottomSection}></View>
        {/* </Drawer.Section> */}

        {/* <Drawer.Section style={styles.bottomDrawerSection}> */}
        <View style={{flex:1,justifyContent:'center',width:'100%'}}>
      <View style={{width:'70%',backgroundColor:'#19173D',alignSelf:'center',borderRadius:30,padding:2}}>
        <DrawerItem
          icon={({size}) => (
            <SimpleLineIcons name="logout" color='#828282' size={size} />
          )}
          label="Logout"
          labelStyle={{...styles.labelStyle, color: '#828282'}}
          onPress={() => {
            signOutUser();
          }}
        />
        </View>
        </View>
        {/* </Drawer.Section> */}
      </View>
      {/* </DrawerContentScrollView> */}
      {/* <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          style={{ justifyContent: "center"}}
          icon={({ size }) => (
            <Icon name="exit-to-app"
             color={Theme.red}
              size={size} />
          )}
          label="Logout"
          labelStyle={{ ...styles.labelStyle, color: Theme.red}}
          onPress={() => {
            signOutUser();
          }}
        />
      </Drawer.Section> */}
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#262450',
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: '#19173D',
    padding: 50,
    // bottom:0
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#fff',
  },
  caption: {
    fontSize: 14,
    // lineHeight: 50,
    fontWeight: '500',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    // marginBottom: 15,
    // borderTopColor: Theme.lightGray,
    // borderTopWidth: 1,
  },
  bottomSection: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelStyle: {
    fontWeight: '700',
    fontSize: Theme.txtMedium,
    color: '#A7A7A7',
    padding:2
  },
});
