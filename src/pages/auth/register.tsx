import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    login(
      { id: "u1", name: "John Doe", email: "john@example.com", addresses: [], createdAt: new Date().toISOString() },
      "mock-jwt-token"
    );
    setLoading(false);
    toast.success("Account created successfully!");
    navigate("/account");
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="Launchpad Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create Account</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Join Launchpad and start shopping</p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" required icon={<User className="h-4 w-4" />} />
            <Input label="Email" type="email" placeholder="you@example.com" required icon={<Mail className="h-4 w-4" />} />
            <div className="relative">
              <Input label="Password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" required icon={<Lock className="h-4 w-4" />} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-[var(--text-tertiary)]" aria-label="Toggle password">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Input label="Confirm Password" type="password" placeholder="••••••••" required icon={<Lock className="h-4 w-4" />} />

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-[var(--border)] text-primary-600" />
              <span className="text-xs text-[var(--text-secondary)]">
                I agree to the <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <Button variant="primary" size="lg" fullWidth loading={loading} type="submit">
              Create Account <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account? <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-700">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
