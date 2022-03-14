import React, { FC, useState } from "react";
import { TextInputField, Button, toaster } from "evergreen-ui";
import { randomIntFromInterval } from "../../utils/utils";

type Props = {
  pairName: string;
};

const buyRequest = async () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const functions = [resolve, reject];
      const randomFunctionIndex = randomIntFromInterval(0, 1);
      functions[randomFunctionIndex]();
    }, randomIntFromInterval(5, 10) * 1000);
  });

// Тут мог быть hook-form который я активно использую в текущем проекте,
// но конкретно в этом случае он избыточен
export const BuyForm: FC<Props> = ({ pairName }) => {
  const [value, setValue] = useState<number>(1);
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = () => {
    setSubmitting(true);
    buyRequest()
      .then(() => {
        toaster.success("Transaction success");
      })
      .catch(() => {
        toaster.danger("Something went wrong");
      })
      .finally(() => {
        setValue(1);
        setSubmitting(false);
      });
  };

  return (
    <div style={{ width: 300 }}>
      <TextInputField label="Pair" value={pairName} disabled />
      <TextInputField
        label={"Amount"}
        type={"number"}
        min={0}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(+e.currentTarget.value)
        }
        disabled={isSubmitting}
      />
      <Button isLoading={isSubmitting} onClick={onSubmit}>
        Buy
      </Button>
    </div>
  );
};
