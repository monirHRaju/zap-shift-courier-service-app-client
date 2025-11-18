import React from 'react';
import Banner from './Banner/Banner';
import HowItWorks from './Works/HowItWorks';
import Services from './Services/Services';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';
import FAQSection from './FAQ/FAQSection';
import Faq from './FAQ/Faq';
import { ToastContainer } from 'react-toastify';

const Home = () => {
    return (
        <>
            
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Brands></Brands>
            <Faq></Faq>
            
            <ToastContainer></ToastContainer>

        </>
    );
};

export default Home;