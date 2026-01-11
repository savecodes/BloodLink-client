import React from "react";
import Banner from "../Banner/Banner";
import WhyChooseBloodLink from "../WhyChooseBloodLink/WhyChooseBloodLink";
import HowItWorks from "../HowItWorks/HowItWorks";
import CallToAction from "../CallToAction/CallToAction";
import ContactUs from "../ContactUs/ContactUs";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <WhyChooseBloodLink />
      <HowItWorks />
      <CallToAction />
      <ContactUs />
    </div>
  );
};

export default HomePage;
