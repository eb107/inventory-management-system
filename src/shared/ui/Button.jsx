export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",

    danger: "bg-red-500 hover:bg-red-600 text-white",

    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-600 border border-gray-200",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} px-4 py-2 rounded-lg font-medium
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer`}
    >
      {children}
    </button>
  );
}
