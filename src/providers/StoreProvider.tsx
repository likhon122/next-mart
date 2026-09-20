"use client";
import { makeStore } from "@/redux/store";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => makeStore());
  const persistedStore = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
