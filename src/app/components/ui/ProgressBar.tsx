import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const progressBarStyle = cva("h-full absolute left-0 top-0 rounded-md", {
  variants: {
    variant: {
      regular: "z-20 bg-green-700",
      future: "h-10 bg-green-400",
    },
  },
  defaultVariants: {
    variant: "regular",
  },
});

type Props = ComponentProps<"div"> &
  VariantProps<typeof progressBarStyle> & {
    percentaje: string;
  };

export function ProgressBar({
  percentaje,
  className,
  variant,
  ...args
}: Props) {
  return (
    <div
      className={progressBarStyle({ className, variant })}
      style={{ width: `${percentaje}%` }}
      {...args}
    />
  );
}
