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

  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <div className="flex">
        <input
          type="text"
          id={label}
          className="bg-gray-50 border rounded-none rounded-l-lg border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-r-lg border-l-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {unit}
        </span>
      </div>
    </div>
  );
};
