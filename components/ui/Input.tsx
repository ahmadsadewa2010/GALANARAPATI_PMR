interface Props
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-950
      px-4
      py-3
      text-white
      outline-none
      focus:border-blue-500
      "
    />
  );
}