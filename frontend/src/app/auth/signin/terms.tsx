import Link from "next/link";
import React from "react";

const Terms = ({
  title,
  termsUrl,
  checked,
  setChecked,
}: {
  title: string;
  termsUrl?: string;
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>> | ((value: boolean) => void);
}) => {
  const [tmpChecked, setTmpChecked] = React.useState(false);
  const [dChecked, setDChecked] = [checked ?? tmpChecked, setChecked ?? setTmpChecked];
  return (
    <div className="flex flex-row items-center justify-start w-full gap-4">
      <button
        className="flex flex-row items-center justify-start gap-2 p-4 -m-4 w-full"
        onClick={() => setDChecked(!dChecked)}
      >
        <input type="checkbox" checked={dChecked} readOnly />
        <p className={["font-medium transition-colors", dChecked ? "text-black" : "text-gray-400"].join(" ")}>
          {title}
        </p>
      </button>
      <Link href={termsUrl ?? ""} className="text-gray-400 whitespace-nowrap text-sm">
        자세히 보기
      </Link>
    </div>
  );
};

export default Terms;
