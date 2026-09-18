export function getAuthError(message: string): string {
  switch (message) {
    case "Invalid login credentials":
      return "Email atau password salah.";

    case "Email not confirmed":
      return "Email belum diverifikasi. Silakan cek inbox email Anda.";

    case "User not found":
      return "Akun tidak ditemukan.";

    case "Password should be at least 6 characters":
      return "Password minimal 6 karakter.";

    case "Too many requests":
      return "Terlalu banyak percobaan login. Silakan coba beberapa saat lagi.";

    default:
      return "Terjadi kesalahan. Silakan coba lagi.";
  }
}