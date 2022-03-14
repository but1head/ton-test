import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import {
  selectCurrencyPairs,
  selectFavoritePairs,
  toggleFavoritePair,
} from "../../store/slices/catalog";
import styles from "./PairList.module.scss";
import { Tab, Tablist } from "evergreen-ui";
import { PairListItem } from "../PairListItem/PairListItem";
import { PairListItemSkeleton } from "../PairListItem/PairListItemSkeleton";
import { CurrencyPair } from "../../types/general";
import { toggleActivePair } from "../../store/slices/activeCurrency";

enum Tabs {
  "all" = "All",
  "favorite" = "Favorite",
}

// @ts-ignore
const skeletons: number[] = [...new Array(10).keys()];

export const PairList: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector(selectCurrencyPairs);
  const favoritePairs = useAppSelector(selectFavoritePairs);
  const [tabs] = useState<Tabs[]>([Tabs.all, Tabs.favorite]);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.all);

  const onToggleFavorite = (name: string) => {
    dispatch(toggleFavoritePair({ name }));
  };

  const onToggleActivePair = (pair: CurrencyPair) => {
    dispatch(toggleActivePair(pair));
  };

  const renderItems = () => {
    return data.map((pair) => {
      const name = `${pair.base} / ${pair.counter}`;
      const isFavorite = favoritePairs.includes(name);
      if (selectedTab === Tabs.favorite && !isFavorite) return null;
      return (
        <PairListItem
          data={pair}
          key={pair.poolAddress}
          name={name}
          isFavorite={isFavorite}
          toggleFavorite={onToggleFavorite}
          onClick={onToggleActivePair}
        />
      );
    });
  };

  return (
    <div>
      <Tablist>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            id={tab}
            onSelect={() => setSelectedTab(tab)}
            isSelected={tab === selectedTab}
            aria-controls={`panel-${tab}`}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
      <div className={styles.CurrencyPairsList}>
        {isLoading
          ? skeletons.map((idx) => <PairListItemSkeleton key={idx} />)
          : renderItems()}
      </div>
    </div>
  );
};
