interface Props {
  goLogin: () => void;
}

export default function RegisterView({
  goLogin,
}: Props) {
  return (
    <div>

      <h2 className="text-3xl font-bold text-white">
        Daftar
      </h2>

      <p className="mt-2 text-slate-400">
        Halaman register.
      </p>

      <button
        onClick={goLogin}
        className="mt-8 text-blue-400"
      >
        Sudah punya akun?
      </button>

    </div>
  );
}