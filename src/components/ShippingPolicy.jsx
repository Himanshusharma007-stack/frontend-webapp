import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export default function ShippingPolicy() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="text" size="sm">
        Shipping Policy
      </Button>
      <Dialog open={open} handler={handleOpen} className="overflow-scroll">
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Shipping Policy
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
            As this is a dine-in policy, there is no delivery option available.
          </p>
        </DialogBody>
      </Dialog>
    </>
  );
}
