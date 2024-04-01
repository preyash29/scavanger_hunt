import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './Style';
import Header from '../../Components/Headers/Headers';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomePageFL from '../../Components/FlatLists/userSideFlatList/HomePageFL';
import {db, auth} from '../../Utils/Exports';
import Theme from '../../Utils/Theme';
import LinearGradient from 'react-native-linear-gradient';

const userChoosePlace = props => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [HomePageData, setHomePageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = () => {
    try {
      setIsLoading(true); // Start loading indicator
      const currentUid = auth.currentUser.uid;
      const ref = db.ref('Users/' + currentUid).child('Posts');
      ref.on(
        'value',
        snapshot => {
          if (snapshot.exists()) {
            const Posts = snapshot.val();
            console.log('Posts:', Posts); 
            const {'Custom-Coords': Custom_Coords, ...remainingData} = Posts;
            const list = Object.values(remainingData);
            console.log('List:', list);
            setHomePageData(list);
            setMasterDataSource(list);
          } else {
            console.log('No data found');
            setHomePageData([]);
            setMasterDataSource([]);
          }
          setIsLoading(false);
        },
        error => {
          setIsLoading(false);
          console.error('Error fetching data:', error);
        },
      );
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.City ? item.City.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setHomePageData(newData);
      setSearchQuery(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setHomePageData(masterDataSource);
      setSearchQuery(text);
    }
  };
  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.MainView}>
      <Header label={'User Mode'} labelIcon={true} onPress={navigateToLogin} />
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={Theme.RFPercentage(2.5)} color={'gray'} />
        <TextInput
          placeholder="Search Place by City"
          style={styles.searchTxtInp}
          maxLength={30}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={isFocused ? '#7B78AA' : '#7B78AA'}
          value={searchQuery}
          clearButtonMode="always"
          onChangeText={text => searchFilterFunction(text)}
          onClear={text => searchFilterFunction('')}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('DrawerNavigation')}>
        <LinearGradient
          colors={['#FF4A4A', '#852626']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.linearStyle}>
          <View style={styles.LoginViw}>
            <Text style={styles.loginTxt}>Voice Navigation</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Theme.primary} />
        </View>
      ) : (
        <HomePageFL data={HomePageData} navigation={navigation} />
      )}
    </View>
  );
};

export default userChoosePlace;
