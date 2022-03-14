import React, { useEffect } from "react";
import "./styles/global.scss";
import { useAppDispatch } from "./hooks/useApp";
import { fetchCurrencyPairs } from "./store/slices/catalog";
import { PairList } from "./components/PairList/PairList";
import { PairView } from "./components/PairView/PairView";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencyPairs());
  }, [dispatch]);

  return (
    <>
      <PairList />
      <PairView />
    </>
  );
};

export default App;
