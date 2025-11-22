export default function Button({ children, type = 'button', disabled = false, variant = 'primary', fullWidth = true, onClick, ...props }) {
  const baseClasses = "px-8 py-3 text-xs uppercase tracking-widest font-medium transition-all duration-300 disabled:opacity-50 cursor-pointer";
  
  const variants = {
    primary: "bg-[#2c3e50] text-white hover:bg-[#34495e]",
    secondary: "border border-gray-300 text-black hover:bg-gray-50",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${widthClass}`}
      {...props}
    >
      {children}
    </button>
  );
}
