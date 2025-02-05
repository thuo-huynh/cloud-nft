import { IoArrowBack } from "react-icons/io5";
import Button from "../common/Button/Button";
import { useRouter } from "next/navigation";

type Props = {};

export default function BackButton({}: Props) {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/")}>
      <span className="flex items-center gap-1">
        <IoArrowBack />
        <span>Back to home</span>
      </span>
    </Button>
  );
}
