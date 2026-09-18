"use client";

interface SocialLoginProps {
  onGoogle?: () => void;
  loading?: boolean;
}

export default function SocialLogin({
  onGoogle,
  loading = false,
}: SocialLoginProps) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onGoogle}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-3

        rounded-2xl
        border
        border-white/10

        bg-slate-900/70

        px-5
        py-3.5

        text-white

        transition-all
        duration-300

        hover:border-blue-500/30
        hover:bg-slate-800
        hover:-translate-y-0.5

        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="h-5 w-5"
      />

      <span className="font-medium">
        Lanjut dengan Google
      </span>
    </button>
  );
}