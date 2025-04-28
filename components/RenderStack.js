import { View } from "react-native";
import React, { useState } from "react";
import Swiper from "react-native-deck-swiper";
import * as Linking from "expo-linking";
import Card from "./Card";
import RedirectModal from "./RedirectModal";
import RatingModal from "./RatingModal";

const RenderStack = ({ data }) => {
  const [redirectValue, setRedirectValue] = useState("");
  const [RedirectModalVisibility, setRedirectModalVisibility] = useState(false);
  const [currentMovieName, setCurrentMovieName] = useState("");
  const [currentMovieModalVisibility, setCurrentMovieModalVisibility] =
    useState(false);
  const [currentMovieRating, setCurrentMovieRating] = useState(1);

  return (
    <View className="flex-1 bg-black">
      <Swiper
        infinite={true}
        disableBottomSwipe={true}
        cards={data}
        cardIndex={0}
        stackSize={5}
        animateOverlayLabelsOpacity={true}
        overlayLabels={{
          left: {
            title: "SKIP",
            style: {
              label: {
                color: "#f56565",
                textAlign: "right",
              },
            },
          },
          right: {
            title: "WATCH",
            style: {
              label: {
                color: "#48bb78",
                textAlign: "left",
              },
            },
          },
        }}
        onSwipedRight={async (index) => {
          const url = data[index].link[0];
          const supported = await Linking.canOpenURL(url);

          if (supported) {
            var redirect = url.split(".")[1];
            redirect = redirect.charAt(0).toUpperCase() + redirect.slice(1);
            setRedirectValue(redirect);
            setRedirectModalVisibility(true);
            setTimeout(async () => {
              await Linking.openURL(url);
              setRedirectModalVisibility(false);
            }, 2000);
          } else {
            console.log(`Don't know how to open URI: ${url}`);
          }
        }}
        onSwipedTop={(index) => {
          setCurrentMovieName(data[index].name);
          setCurrentMovieModalVisibility(true);
        }}
        renderCard={(card) => (
          <Card
            movieId={card._id}
            posterImg={card.posterImg}
            name={card.name}
            genre={card.genre}
            cast={card.cast}
            description={card.description}
            director={card.director}
          />
        )}
      />

      {/* Redirect Modal */}
      <RedirectModal
        redirectTo={redirectValue}
        isVisible={RedirectModalVisibility}
      />

      {/* Rating Modal  */}
      <RatingModal
        isVisible={currentMovieModalVisibility}
        movieName={currentMovieName}
        setCurrentMovieRating={setCurrentMovieRating}
        setCurrentMovieModalVisibility={setCurrentMovieModalVisibility}
      />
    </View>
  );
};

export default RenderStack;
