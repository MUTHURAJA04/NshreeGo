import React, { useEffect } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HexagramLoader from '../Components/HexagramLoader';

const Landing = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');  // Use replace to prevent going back to Landing
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 bg-[#893f71] items-center justify-center">
      <StatusBar hidden />
      
      {/* Logo */}
      <View>
        <Image
          source={require('../assets/Nshrieelogo.png')}
          className="w-72 h-36 mb-10"
          resizeMode="contain"
        />
      </View>

      {/* Loader positioned bottom center */}
      <View className="absolute bottom-8 self-center">
        <HexagramLoader />
      </View>
    </View>
  );
};

export default Landing;
