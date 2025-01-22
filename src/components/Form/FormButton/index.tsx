"use client";

import { useFormStatus } from "react-dom";

import Button from "@/components/Button";

interface Props {
  children?: React.ReactNode;
  isLoading?: boolean;
}

function FormButton({ children, isLoading }: Props) {
  const { pending, data, action } = useFormStatus();

  const isShowLoading = isLoading || pending;

  return (
    <Button
      type="submit"
      loading={isShowLoading}
      disabled={isShowLoading}
      onClick={() => {
        console.log(data, action);
      }}
    >
      {children}
    </Button>
  );
}

export default FormButton;
