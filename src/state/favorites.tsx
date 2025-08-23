import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

let storage:
  | {
    get: () => Promise<string[]>;
    set: (ids: string[]) => Promise<void>;
  }
  | null = null;
try {
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  storage = {
    get: async () =>
      JSON.parse((await AsyncStorage.getItem("@fav:ids")) || "[]"),
    set: async (ids) => {
      await AsyncStorage.setItem("@fav:ids", JSON.stringify(ids));
    },
  };
} catch {}

type FavContextType = {
  ids: Set<string>;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
  count: number;
};

const FavContext = createContext<FavContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      if (!storage) return;
      try {
        const saved = await storage.get();
        setIds(new Set(saved));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!storage) return;
      try {
        await storage.set(Array.from(ids));
      } catch {}
    })();
  }, [ids]);

  const add = useCallback((id: string) => {
    setIds((prev) => new Set(prev).add(id));
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const has = useCallback((id: string) => ids.has(id), [ids]);

  const clear = useCallback(() => setIds(new Set()), []);

  const count = useMemo(() => ids.size, [ids]);

  const value = useMemo(
    () => ({ ids, add, remove, toggle, has, clear, count }),
    [ids, add, remove, toggle, has, clear, count],
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside <FavoritesProvider />");
  }
  return ctx;
}
