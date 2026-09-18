interface Props {
  goLogin: () => void;
}

export default function ForgotView({
  goLogin,
}: Props) {
  return (
    <div>

      <h2 className="text-3xl font-bold text-white">
        Lupa Password
      </h2>

      <p className="mt-2 text-slate-400">
        Reset password akun.
      </p>

      <button
        onClick={goLogin}
        className="mt-8 text-blue-400"
      >
        Kembali ke Login
      </button>

    </div>
  );
}