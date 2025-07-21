// frontend/src/components/Button.tsx
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}
export default function Button({ children, variant = 'primary', ...props }: Props) {
  const bg = variant === 'primary' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700';
  return (
    <button
      {...props}
      className={`w-full py-3 rounded text-white ${bg} transition`}
    >
      {children}
    </button>
  );
}
