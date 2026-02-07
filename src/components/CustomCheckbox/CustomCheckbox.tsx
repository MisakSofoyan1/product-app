import type React from "react";
import CheckIcon from "../../assets/icons/CheckIcon";
import './CustomCheckbox.scss';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  id,
  label,
}) => {
  return (
    <div className="checkbox-item" onClick={onChange}>
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        className={`checkbox ${checked ? "checked" : ""}`}
      >
        {checked && <CheckIcon width={12} height={12} />}
      </button>
      <span className="checkbox-label">
        {label}
      </span>
    </div>
  );
};

export default CustomCheckbox;
