import classNames from "classnames";
import React from "react";

type Props = {
  innerRef?: React.LegacyRef<HTMLInputElement> | undefined;
  className?: string;
  rightLabel?: string;
};

function Input({ innerRef, className, rightLabel }: Props) {
  return (
    <div className="relative">
      <input
        ref={innerRef}
        className={classNames(
          "border rounded py-3 outline-none hover:border-yellow-500 focus:border-yellow-500 w-full",
          className
        )}
      />
      {rightLabel && (
        <div className="absolute right-3 top-3">
          <span className="text-gray-700 font-semibold">{rightLabel}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
