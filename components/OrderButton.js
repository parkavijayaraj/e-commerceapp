"use client";

import { createOrder } from "@/services/api";
import { Button } from "@mui/material";

export default function OrderButton({ productId }) {
  const handleOrder = async () => {
    const res = await createOrder({
      products: [
        {
          productId,
          quantity,
        },
      ],
    });

    alert("Order Placed");
    console.log(res);
  };

  return (
    <Button variant="contained" color="success" onClick={handleOrder}>
      Order Now
    </Button>
  );
}


