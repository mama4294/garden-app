"use client";

type Props = {
  label: string;
  value: number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
};

export const InputGroup = ({
  label,
  placeholder,
  value,
  onChange,
  unit,
}: Props) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <label className="input-group">
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered"
          value={value}
          onChange={onChange}
        />
        <span>{unit}</span>
      </label>
    </div>
  );
};
