import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export default function TnC() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="text" size="sm">
        Terms and Conditions
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Terms and Conditions
            </Typography>
          </div>

          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="max-h-screen overflow-auto">
          <p>
            Welcome to DriveFood. By using our website and services, you agree
            to the following terms and conditions:
          </p>
          <ul>
            <li>
              <strong>Payment Terms:</strong> All payments must be made in
              INR(₹) and are securely processed through Razorpay. By using our
              services, you agree to Razorpay's terms and conditions.
            </li>
            <li>
              <strong>Refunds and Cancellations:</strong> Refunds will be
              processed within 5-7 working days from the date of cancellation.
              The refund amount will be credited to the original payment method.
              Cancellations must be made at least 24 hours before the scheduled
              dine-in time to be eligible for a refund.
            </li>
            <li>
              <strong>Pricing:</strong> All prices listed on our website are in
              INR(₹) and inclusive of applicable taxes. Prices are subject to
              change without prior notice.
            </li>
            <li>
              <strong>Contact Us:</strong> For any queries or support, please
              contact us at +917500431794 or sahyogsabka02@gmail.com. Our
              operating address is Mom's Pizza, Khatauli, U.P. ( Pincode
              251201).
            </li>
            <li>
              <strong>Privacy Policy:</strong> We are committed to protecting
              your privacy. Please refer to our Privacy Policy for detailed
              information on how we collect, use, and protect your personal
              data.
            </li>
          </ul>
        </DialogBody>
      </Dialog>
    </>
  );
}
