import React from "react";
import { Link } from "react-router";

const Faq = () => {
  return (
    <div className='my-25'>
        <h2 className='text-4xl text-secondary font-bold text-center'>Frequently Asked Question (FAQ)</h2>
        <p className="text-base-300 text-center my-6">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      <div className="collapse collapse-arrow bg-base-100  border border-secondary">
        <input type="radio" className="bg-base-100" name="my-accordion-2" defaultChecked />
        <div className="collapse-title bg-white font-semibold ">
          How do I create an account?
        </div>
        <div className="collapse-content text-sm bg-base-100">
          Click the "Sign Up" button in the top right corner and follow the
          registration process.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-secondary">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title bg-white font-semibold">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-secondary">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title bg-white font-semibold">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
      <div className="flex justify-center my-10">
        <Link to={'/faq'} className="btn btn-primary text-secondary font-semibold ">See More FAQ’s</Link>
      </div>
    </div>
  );
};

export default Faq;
