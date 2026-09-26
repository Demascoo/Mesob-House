import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Account() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="panel">
        <p className="eyebrow eyebrow--burgundy">● Mesob Member</p>
        <h2 style={{ marginTop: 8 }}>{user?.name}</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 4 }}>
          {user?.email}
        </p>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 2 }}>
          {user?.phone}
        </p>
      </div>

      <button
        className="btn btn--ghost"
        onClick={() => {
          signOut();
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
