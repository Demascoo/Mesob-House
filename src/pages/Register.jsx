import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../validation/schemas";
import { useAuthStore } from "../store/authStore";

export default function Register() {
  const registerUser = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(data) {
    const result = registerUser(data);
    if (!result.ok) {
      setError("root", { message: result.error });
      return;
    }
    navigate("/", { replace: true });
  }

  return (
    <div className="page">
      <div className="auth-welcome">
        <p className="eyebrow eyebrow--burgundy">✦ MEMBER CIRCLE</p>
        <h2>Create Your Account</h2>
        <p style={{ fontSize: "0.82rem", color: "var(--soft)", marginTop: 8 }}>
          Join our culinary heritage circle in less than a minute.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span className="field__label">Full Name</span>
          <input
            type="text"
            {...register("name")}
            placeholder="e.g. Abebe Bikila"
          />
          {errors.name && <p className="field__error">{errors.name.message}</p>}
        </label>

        <label className="field">
          <span className="field__label">Ethiopian Mobile Number</span>
          <input type="tel" {...register("phone")} placeholder="0911 234 567" />
          {errors.phone && (
            <p className="field__error">{errors.phone.message}</p>
          )}
        </label>

        <label className="field">
          <span className="field__label">Email Address</span>
          <input
            type="email"
            {...register("email")}
            placeholder="guest@mesobhouse.com"
          />
          {errors.email && (
            <p className="field__error">{errors.email.message}</p>
          )}
        </label>

        <label className="field">
          <span className="field__label">Password</span>
          <input
            type="password"
            {...register("password")}
            placeholder="Minimum 8 characters"
          />
          {errors.password && (
            <p className="field__error">{errors.password.message}</p>
          )}
        </label>

        <label className="field">
          <span className="field__label">Confirm Password</span>
          <input
            type="password"
            {...register("confirm")}
            placeholder="Repeat password"
          />
          {errors.confirm && (
            <p className="field__error">{errors.confirm.message}</p>
          )}
        </label>

        {errors.root && <p className="err">{errors.root.message}</p>}

        <button type="submit" className="btn" disabled={isSubmitting}>
          Create Account &amp; Receive Welcome Gursha →
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.85rem" }}>
        Already part of our dining family?{" "}
        <Link to="/login" style={{ color: "var(--burgundy)", fontWeight: 600 }}>
          Sign in here
        </Link>
      </p>
    </div>
  );
}
