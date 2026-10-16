import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import Button from "../../components/ui/Button";
import { PasswordField, TextField } from "../../components/ui/Fields";
import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function LoginPage() {
  useDocumentTitle("Sign in");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = login({ email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to explore residences, save homes, and talk to an advisor."
      footer={
        <>
          New here?{" "}
          <Link to="/register" state={location.state} className="font-medium text-forest underline-offset-4 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="grid" onSubmit={handleSubmit} noValidate>
        <TextField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordField
          id="login-password"
          label="Password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <AnimatePresence>
          {error ? (
            <motion.p
              className="rounded-xl bg-danger/10 px-3 py-2 text-xs leading-5 text-danger sm:text-sm"
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
