import styleModule from "./Skeleton.module.scss";
import React, { FC } from "react";

type Props = {
  style: React.CSSProperties,
}
export const Skeleton: FC<Props> = ({ style }) => {
  return <div className={styleModule.Skeleton} style={style} />;
};
