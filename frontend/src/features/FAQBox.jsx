// featured/FeaturedFAQ.jsx
import React from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactMailIcon from "@mui/icons-material/ContactMail"; // Import icon for contact us

const FeaturedFAQ = () => {
  const faqs = [
    {
      question: "What is the purpose of this auction website?",
      answer: "This auction website allows users to buy and sell items through a bidding system."
    },
    {
      question: "How can I participate in an auction?",
      answer: "To participate, you need to register an account, log in, and then you can place bids on auction items."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods, including PayPal and credit cards."
    },
    {
      question: "How do I list an item for auction?",
      answer: "Once you log in as a seller, you can navigate to the 'Add Auction Item' page and fill out the required information."
    },
    {
      question: "Can I cancel my bid?",
      answer: "Once a bid is placed, it cannot be canceled. Please make sure you want to place a bid before doing so."
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="mb-8 text-center">
        <img src="FAQ.jpg" alt="FAQ Illustration" className="w-full rounded-lg" />
      </div>
      <Typography variant="h2" align="center" gutterBottom>
        FAQs
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <div className="text-center mt-8">
        <Typography variant="h5" gutterBottom>
          Need More Help?
        </Typography>
        <Button
          variant="contained"
          className="bg-orange-500 hover:bg-orange-600 text-white"
          startIcon={<ContactMailIcon />}
          href="/contact-us" // Change this to your actual contact page route
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default FeaturedFAQ;
