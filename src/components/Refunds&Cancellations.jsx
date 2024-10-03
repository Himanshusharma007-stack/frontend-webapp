import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export default function RefundsandCancellation() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="text" size="sm">
        Refunds / Cancellations
      </Button>
      <Dialog open={open} handler={handleOpen} className="overflow-scroll">
        <DialogHeader className="flex justify-between items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
            Refunds / Cancellations
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
            We understand that plans can change. Here is our policy for refunds
            and cancellations:
          </p>
          <ul>
            <li>
              <strong>Refund Processing:</strong> Refunds will be processed
              within 5-7 working days from the date of cancellation.
            </li>
            <li>
              <strong>Refund Method:</strong> The refund amount will be credited
              to the original payment method.
            </li>
            <li>
              <strong>Cancellation Policy:</strong> Cancellations must be made
              at least 24 hours before the scheduled dine-in time to be eligible
              for a refund.
            </li>
            <li>
              <strong>Contact Us:</strong> For any queries or support, please
              contact us at +917500431794 or sahyogsabka02@gmail.com.
            </li>
          </ul>
        </DialogBody>
      </Dialog>
    </>
  );
}
