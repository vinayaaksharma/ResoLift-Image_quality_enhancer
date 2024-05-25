import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const Slider = () => {
  return (
    <div className=" w-1/2 absolute left-[700px] pt-8 rounded-2xl">
      <ReactCompareSlider className="h-[600px] rounded-2xl"
        itemOne={
          <ReactCompareSliderImage src="src\assets\blur.png" srcSet="src\assets\blur.png 480w" alt="Image one" />
        }
        itemTwo={
          <ReactCompareSliderImage src="src\assets\enhanced.png" srcSet="src\assets\enhanced.png 480w" alt="Image two" />
        }
      />
    </div>
  );
};

export default Slider;
