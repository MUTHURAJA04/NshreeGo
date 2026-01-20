import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const FloatingMandala = ({ source, style, delay = 0 }) => {
  const rotate = useSharedValue(0);
  const floatY = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 15000, easing: Easing.linear, delay }),
      -1
    );
    floatY.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(15, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotate.value}deg` },
      { translateY: floatY.value }
    ],
  }));

  return (
    <Animated.Image
      source={source}
      style={[style, animatedStyle]}
      resizeMode="contain"
    />
  );
};

const Login = () => {
  return (
    <View className="flex-1 bg-[#893f71] justify-center px-6 relative">
    <StatusBar 
        translucent={true}  // makes status bar transparent
        backgroundColor="transparent"  // set background to transparent
        barStyle="light-content"  // white icons/text for dark bg
      />


      {/* Top Left Mandala - MUCH BIGGER */}
      <FloatingMandala
        source={require('../assets/Mandala (1).png')}
        style={{
          position: 'absolute',
          width: 300, // Increased from 120
          height: 300, // Increased from 120
          top: -60, // Adjusted to show half at corner
          left: -60, // Adjusted to show half at corner
          opacity: 0.8, // Slightly more visible
        }}
        delay={0}
      />

      {/* Bottom Right Mandala */}
      <FloatingMandala
        source={require('../assets/Mandala (2).png')}
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          bottom: -70,
          right: -80,
          opacity: 0.6,
        }}
        delay={2000}
      />

      {/* Login Form */}
      <View className="">
        <Text className="text-3xl font-bold text-[#d09c5b] mb-6 text-center">Login</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          className="bg-white rounded-lg px-4 py-3 mb-6 text-black"
        />
        <TouchableOpacity className="bg-[#d09c5b] rounded-lg py-3">
          <Text className="text-center text-black font-semibold text-lg">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-center text-[#f5deb3] mt-4 underline">Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;