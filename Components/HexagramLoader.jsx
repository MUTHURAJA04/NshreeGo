import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

// Reduced triangle sizes for mobile
const triangle1Points = "20,3 38,35 2,35";
const triangle2Points = "20,47 38,15 2,15";

const TRIANGLE_PERIMETER = 112; // Reduced perimeter

export default function HexagramLoader() {
  const dashOffset1 = useSharedValue(TRIANGLE_PERIMETER);
  const dashOffset2 = useSharedValue(TRIANGLE_PERIMETER);
  const rotation = useSharedValue(0);
  const strokeWidth = useSharedValue(3); // Reduced stroke width
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    dashOffset1.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(TRIANGLE_PERIMETER, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    const timeout = setTimeout(() => {
      dashOffset2.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(TRIANGLE_PERIMETER, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }, 600);

    // Slower rotation for mobile
    rotation.value = withRepeat(
      withTiming(360, { duration: 6000, easing: Easing.linear }),
      -1,
      false
    );

    // Gentle stroke width pulse
    strokeWidth.value = withRepeat(
      withSequence(
        withTiming(4, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(3, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Color interpolation animation
    colorProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    return () => clearTimeout(timeout);
  }, []);

  const animatedProps1 = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset1.value,
    strokeWidth: strokeWidth.value,
    stroke: interpolateColor(
      colorProgress.value,
      [0, 1],
      ['#d09c5b', '#f5deb3']
    ),
  }));

  const animatedProps2 = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset2.value,
    strokeWidth: strokeWidth.value,
    stroke: interpolateColor(
      colorProgress.value,
      [0, 1],
      ['#d09c5b', '#f5deb3']
    ),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="w-16 h-16 items-center justify-center">
      <Animated.View style={animatedStyle}>
        <Svg width={50} height={50} viewBox="0 0 40 50">
          <AnimatedPolygon
            points={triangle1Points}
            fill="none"
            strokeDasharray={TRIANGLE_PERIMETER}
            animatedProps={animatedProps1}
            strokeLinecap="round"
          />
          <AnimatedPolygon
            points={triangle2Points}
            fill="none"
            strokeDasharray={TRIANGLE_PERIMETER}
            animatedProps={animatedProps2}
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}