import React, { useEffect, useState } from "react";
import {
  View,
  PanResponder,
  Animated,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.35;
const SWIPE_OUT_DURATION = 300;
// const gestureObjectExample = {
//   _accountsForMovesUpTo: 667043491.634125,
//   dx: 5.3333282470703125, // how much the user moved in x
//   dy: 14, // how much the user moved in y
//   moveX: 165.3333282470703,
//   moveY: 453.3333282470703,
//   numberActiveTouches: 1,
//   stateID: 0.8807266688893617,
//   vx: 0.039531143357906647, // how fast the user moved in x
//   vy: 0.11859523969346625, // how fast the user moved in y
//   x0: 160,
//   y0: 439.3333282470703,
// };

const Deck = ({
  data,
  renderCard,
  onSwipeLeft,
  onSwipeRight,
  renderNoMoreCards,
}) => {
  const [indexToAnimate, setIndexToAnimate] = useState(0);
  const cardPosition = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    // any time that user touch the screen,
    // true means i want the PanResponder to be responsible for the touch
    onStartShouldSetPanResponder: () => true,
    // any time the use drag something on the screen
    onPanResponderMove: (event, gesture) => {
      cardPosition.setValue({ x: gesture.dx, y: gesture.dy });
    },
    // any time the user remove the finger from the screen
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe("left");
      } else {
        resetPosition();
      }
    },
  });
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);

    LayoutAnimation.spring();
  }, [indexToAnimate]);

  useEffect(() => {
    setIndexToAnimate(0);
  }, [data]);

  const resetPosition = () => {
    Animated.spring(cardPosition, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };
  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(cardPosition, {
      toValue: { x, y: 100 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      onSwipeComplete();
    });
  };

  const onSwipeComplete = (direction) => {
    const item = data[indexToAnimate];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    cardPosition.setValue({ x: 0, y: 0 });
    setIndexToAnimate(indexToAnimate + 1);
  };

  getCardStyle = () => {
    const rotate = cardPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...cardPosition.getLayout(), transform: [{ rotate }] };
  };

  const renderCards = () => {
    if (indexToAnimate >= data.length) {
      return renderNoMoreCards();
    }
    return data
      .map((item, index) => {
        if (index < indexToAnimate) return null;
        if (index === indexToAnimate) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardStyle]}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: (index - indexToAnimate) * 10 }]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
};
export default Deck;
