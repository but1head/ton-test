import { FC, useEffect } from "react";
import style from "./PairView.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import {
  fetchCurrency,
  selectActivePair,
  selectActivePairData,
} from "../../store/slices/activeCurrency";
import { Spinner, Text, Heading } from "evergreen-ui";
import { Skeleton } from "../Skeleton/Skeleton";
import { BuyForm } from "../BuyForm/BuyForm";

export const PairView: FC = () => {
  const dispatch = useAppDispatch();
  const activePair = useAppSelector(selectActivePair);
  const { isLoading, data } = useAppSelector(selectActivePairData);
  const pairName = `${activePair?.base} / ${activePair?.counter}`;

  useEffect(() => {
    if (activePair) {
      dispatch(fetchCurrency(activePair.baseAddress));
    }
  }, [activePair]);

  return (
    <>
      {!activePair ? (
        <div className={style.EmptyState}>
          <Text color="muted">Choice currency pair</Text>
        </div>
      ) : (
        <div className={style.CurrencyPairView}>
          <div className={style.Chart}>
            {isLoading ? (
              <Spinner size={16} />
            ) : (
              <Text color="muted">Looks like chart :)</Text>
            )}
          </div>
          <Heading size={600} marginTop={32} marginBottom={8}>
            Info
          </Heading>
          {isLoading ? (
            <>
              <Skeleton style={{ height: 20, width: "90%" }} />
              <Skeleton style={{ height: 20, width: "79%" }} />
              <Skeleton style={{ height: 20, width: "35%" }} />
            </>
          ) : (
            <Text color="muted">{data ? JSON.stringify(data) : null}</Text>
          )}
          <br />
          <br />
          {isLoading ? null : <BuyForm pairName={pairName} />}
        </div>
      )}
    </>
  );
};
