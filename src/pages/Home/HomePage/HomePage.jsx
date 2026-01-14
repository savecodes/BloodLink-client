import React from "react";
import Banner from "../Banner/Banner";
import WhyChooseBloodLink from "../WhyChooseBloodLink/WhyChooseBloodLink";
import HowItWorks from "../HowItWorks/HowItWorks";
import CallToAction from "../CallToAction/CallToAction";
import ContactUs from "../ContactUs/ContactUs";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const HomePage = () => {
  const { loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
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
