import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { X } from "lucide-react";

export default function PrivacyPolicy() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="text" size="sm">
        Privacy Policy
      </Button>
      <Dialog open={open} handler={handleOpen} >
        <DialogHeader className="flex justify-between items-center">
          Privacy Policy
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="rounded-full"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </Button>
        </DialogHeader>
        <DialogBody className="max-h-screen overflow-auto">
          <p>
            We value your privacy and are committed to protecting your personal
            data. This policy outlines how we collect, use, and safeguard your
            information:
          </p>
          <ul>
            <li>
              <strong>Data Collection:</strong> We collect personal information
              such as your name, contact details, and payment information to
              provide our services.
            </li>
            <li>
              <strong>Use of Data:</strong> Your data is used to process orders,
              manage bookings, and improve our services. Payment information is
              securely processed through Razorpay.
            </li>
            <li>
              <strong>Data Sharing:</strong> We do not share your personal
              information with third parties except as necessary to process
              payments and comply with legal obligations.
            </li>
            <li>
              <strong>Data Security:</strong> We implement industry-standard
              security measures to protect your data. However, no method of
              transmission over the internet is 100% secure.
            </li>
            <li>
              <strong>Your Rights:</strong> You have the right to access,
              update, or delete your personal information. Contact us at
              sahyogsabka02@gmail.com for any requests.
            </li>
          </ul>
        </DialogBody>
      </Dialog>
    </>
  );
}
