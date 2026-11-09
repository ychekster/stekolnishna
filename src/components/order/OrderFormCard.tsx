"use client";

/**
 * Holder of the order form: remounts it with a fresh key for "Новая заявка", which is the
 * only way to clear a form's action state after a successful submission.
 */
import { useState, type ComponentProps } from "react";

import { OrderForm } from "./OrderForm";

export function OrderFormCard(props: Omit<ComponentProps<typeof OrderForm>, "onReset">) {
  const [key, setKey] = useState(0);
  return <OrderForm key={key} {...props} onReset={() => setKey((value) => value + 1)} />;
}
