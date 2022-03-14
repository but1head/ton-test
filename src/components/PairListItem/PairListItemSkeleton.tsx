import { Skeleton } from "../Skeleton/Skeleton";
import { FC } from "react";
import { randomIntFromInterval } from "../../utils/utils";

const style = { height: 20, marginBottom: 4 };
export const PairListItemSkeleton: FC = () => (
  <div style={{ display: "flex" }}>
    <Skeleton style={{ ...style, width: 12, marginRight: 8 }} />
    <Skeleton style={{ ...style, width: randomIntFromInterval(50, 150) }} />
  </div>
);
