import { ButtonHTMLAttributes } from "react";

import Button from "@/components/Button";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
}

function FormButton({ children, isLoading, disabled, ...rest }: Props) {
  return (
    <Button
      type="button"
      sizeType="large"
      loading={isLoading}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default FormButton;
