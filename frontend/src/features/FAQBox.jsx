// featured/FeaturedFAQ.jsx
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
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
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <img src="FAQ.jpg" alt="FAQ Illustration" style={{ width: '100%', borderRadius: '8px' }} />
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Auctions FAQs
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
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Need More Help?
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<ContactMailIcon />} 
          href="/contact-us" // Change this to your actual contact page route
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturedFAQ;

