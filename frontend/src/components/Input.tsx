// frontend/src/components/Input.tsx
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export default function Input({ label, ...props }: Props) {
  return (
    <label className="block mb-4">
      <span className="text-sm text-white">{label}</span>
      <input
        {...props}
        className="w-full mt-1 p-3 rounded bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </label>
  );
}
