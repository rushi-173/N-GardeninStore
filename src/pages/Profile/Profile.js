import { useAuth } from "../../contexts/auth-context";
import { useToast } from "../../contexts/toast-context";
import "./Profile.css";

export function Profile() {
  const { auth, setAuth } = useAuth();
  const { showToast } = useToast();

  function handleLogout() {
    setAuth(null);
    localStorage.clear();
    showToast("Logged out Successful", "Thanks for visiting!","error");
  }

  return (
    <div className="account--container">
      <h1>Account Profile</h1>
      <h4>
        Name: <p style={{ display: "inline-block" }}>{auth.user.name}</p>{" "}
      </h4>
      <h4>
        Email: <p style={{ display: "inline-block" }}>{auth.user.email}</p>{" "}
      </h4>

      {auth && (
        <button
          style={{ width: "8rem" }}
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Log Out
        </button>
      )}
    </div>
  );
}
