import React, { createContext, useContext, useMemo, useState } from "react";

type QtyMap = Record<string, number>;

type CartContextType = {
  qty: QtyMap;
  count: number;
  add: (id: string, max?: number) => void;
  inc: (id: string, max?: number) => void;
  dec: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [qty, setQty] = useState<QtyMap>({});

  const add = (id: string, max?: number) =>
    setQty((m) => ({
      ...m,
      [id]: Math.min((m[id] ?? 0) + 1, max ?? Infinity),
    }));

  const inc = (id: string, max?: number) =>
    setQty((m) => ({
      ...m,
      [id]: Math.min((m[id] ?? 0) + 1, max ?? Infinity),
    }));

  const dec = (id: string) =>
    setQty((m) => {
      const next = { ...m };
      const cur = (next[id] ?? 0) - 1;
      if (cur <= 0) delete next[id];
      else next[id] = cur;
      return next;
    });

  const clear = () => setQty({});

  const count = useMemo(() => Object.values(qty).reduce((a, b) => a + b, 0), [
    qty,
  ]);

  const value = useMemo(() => ({ qty, count, add, inc, dec, clear }), [
    qty,
    count,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider />");
  return ctx;
}
