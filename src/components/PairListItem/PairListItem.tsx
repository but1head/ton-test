import { FC } from "react";
import { HeartIcon } from "evergreen-ui";
import style from "./PairListItem.module.scss";
import { CurrencyPair } from "../../types/general";

type Props = {
  data: CurrencyPair;
  name: string;
  isFavorite: boolean;
  toggleFavorite: (name: string) => void;
  onClick: (pair: CurrencyPair) => void;
};

export const PairListItem: FC<Props> = ({
  data,
  name,
  isFavorite,
  toggleFavorite,
  onClick,
}) => (
  <div className={style.PairListItem}>
    <HeartIcon
      color={isFavorite ? "danger" : "disabled"}
      onClick={() => toggleFavorite(name)}
      size={12}
      className={style.PairListItemHeart}
    />
    <span onClick={() => onClick(data)}>{name}</span>
  </div>
);
