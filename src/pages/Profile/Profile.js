import { useAuth } from "../../contexts/auth-context";
import "./Profile.css";
import { useCart } from './../../contexts/cart-context';
import { useWishlist } from './../../contexts/wishlist-context';
import { useToasts } from "react-toast-notifications";

export function Profile() {
  const { auth, setAuth } = useAuth();
  const { addToast } = useToasts();
  const {setCart} = useCart()
  const {setWishlist} = useWishlist()

  function handleLogout() {
    setAuth(null);
    localStorage.clear();
    addToast("Logged out Successful",{appearance: "error"});
    setCart([])
    setWishlist([])

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
