"use client";

import {Button} from "./ui/button";

const Checkout = ({makePayment}: {makePayment: any}) => {
  return (
    <>
      <Button
        type="submit"
        role="link"
        size="lg"
        className="button sm:w-fit mt-5 ml-5"
        onClick={() => makePayment()}
      >
        Buy Now
      </Button>
    </>
  );
};

export default Checkout;
