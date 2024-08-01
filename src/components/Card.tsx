import { StyleSheet, Image, View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  useAnimatedReaction,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";

type CardProps = {
  card: {
    source: ReturnType<typeof require>;
  };
  shuffleBack: SharedValue<boolean>;
  index: number;
};

const { width: wWidth, height } = Dimensions.get("window");
const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 158;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 100;

const Card: React.FC<CardProps> = ({ card, shuffleBack, index }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-height);
  const rotateZ = useSharedValue(Math.random() * 20 - 10);
  const offset = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const delay = index * DURATION;
  const theta = Math.random() * 20 - 10;

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: DURATION, easing: Easing.inOut(Easing.ease) })
    );
    translateY.value = withDelay(
      delay,
      withTiming(theta, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      })
    );
  }, [index, translateY]);

  useAnimatedReaction(
    () => shuffleBack.value,
    () => {
      if (shuffleBack.value) {
        translateX.value = withDelay(delay, withSpring(0));
        rotateZ.value = withDelay(
          delay,
          withSpring(theta, {}, () => {
            shuffleBack.value = false;
          })
        );
      }
    }
  );
  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      offset.value = { x: translateX.value, y: translateY.value };
      scale.value = withTiming(1.1);
      rotateZ.value = withTiming(0);
    })
    .onUpdate((event) => {
      translateX.value = offset.value.x + event.translationX;
      translateY.value = offset.value.y + event.translationY;
    })
    .onEnd((event) => {
      const dest = snapPoint(translateX.value, event.velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: event.velocityX });
      translateY.value = withSpring(0, { velocity: event.velocityY });
      scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) }, () => {
        if (index === 0 && dest !== 0) {
          shuffleBack.value = true;
        }
      });
    });

  const rCardStlye = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1500 },
        { rotateX: "30deg" },
        { rotateZ: `${rotateZ.value}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, rCardStlye]}>
          <Image
            source={card.source}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
