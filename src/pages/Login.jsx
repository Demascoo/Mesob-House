import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginSchema } from "../validation/schemas";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const signIn = useAuthStore((s) => s.signIn);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data) {
    const result = signIn(data);
    if (!result.ok) {
      setError("root", { message: result.error });
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div className="page">
      <div className="auth-welcome">
        <p className="eyebrow eyebrow--burgundy">● ENKUAN DEHNA METAHU</p>
        <h2>Welcome to the Mesob Table</h2>
        <p style={{ fontSize: "0.82rem", color: "var(--soft)", marginTop: 8 }}>
          Sign in to manage your feasts
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span className="field__label">Email</span>
          <input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="field__error">{errors.email.message}</p>
          )}
        </label>

        <label className="field">
          <span className="field__label">Secret Password / PIN</span>
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="field__error">{errors.password.message}</p>
          )}
        </label>

        {errors.root && <p className="err">{errors.root.message}</p>}

        <button type="submit" className="btn" disabled={isSubmitting}>
          Sign In to Mesob House →
        </button>

        <Link to="/" className="btn btn--ghost" style={{ marginTop: 10 }}>
          Continue as Guest 🍴
        </Link>
      </form>

      <div
        className="panel panel--gold"
        style={{
          marginTop: 20,
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "1.6rem" }}>🎉</span>
        <div style={{ flex: 1 }}>
          <strong style={{ fontSize: "0.9rem" }}>
            New to our dining family?
          </strong>
          <p
            style={{ fontSize: "0.75rem", color: "var(--soft)", marginTop: 2 }}
          >
            Join the Mesob
          </p>
        </div>
        <Link
          to="/register"
          style={{
            color: "var(--burgundy)",
            fontWeight: 700,
            fontSize: "0.85rem",
          }}
        >
          Register
        </Link>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.8rem",
          color: "var(--muted)",
          marginTop: 20,
        }}
      >
         One shared plate, infinite connections.
      </p>
    </div>
  );
}
