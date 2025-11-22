export default function Input({ label, id, name, type = 'text', value, onChange, required = false, disabled = false, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#333333] mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-3 bg-white border border-gray-200 text-[#333333] focus:border-[#00296b] focus:ring-1 focus:ring-[#00296b] disabled:bg-gray-100 disabled:text-gray-600"
        {...props}
      />
    </div>
  );
}
