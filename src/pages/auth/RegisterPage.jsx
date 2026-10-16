import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import Button from "../../components/ui/Button";
import { PasswordField, TextField } from "../../components/ui/Fields";
import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { isEmail } from "../../lib/utils";

export default function RegisterPage() {
  useDocumentTitle("Create account");
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const problem = !name.trim()
      ? "Please enter your name."
      : !isEmail(email)
        ? "Please enter a valid email."
        : password.length < 6
          ? "Password needs at least six characters."
          : "";
    if (problem) {
      setError(problem);
      return;
    }
    const result = register({ name, email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="One minute, then save and compare homes across India."
      footer={
        <>
          Already registered?{" "}
          <Link to="/login" state={location.state} className="font-medium text-forest underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="grid" onSubmit={handleSubmit} noValidate>
        <TextField
          id="register-name"
          label="Full name"
          autoComplete="name"
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          id="register-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordField
          id="register-password"
          label="Password"
          autoComplete="new-password"
          placeholder="Password (6+ characters)"
          hint="At least six characters."
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
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
