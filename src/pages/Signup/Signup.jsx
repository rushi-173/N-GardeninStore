import "./Signup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useToasts } from 'react-toast-notifications';
import { useAuth } from "../../contexts/auth-context";

export function Signup() {
	const [error, setError] = useState("");
	const { addToast } = useToasts();
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRepassword] = useState("");
	const [passErr, setPassErr] = useState("");
	const navigate = useNavigate();
	const params = useLocation();
	const { auth, setAuth } = useAuth();

	useEffect(() => {
		if(auth){
		  navigate("/")
		}
	  }, [auth])

	useEffect(() => {
		if (password !== repassword) {
			setPassErr("password do not match");
		} else if (password === repassword && repassword) {
			setPassErr("password matches");
		}
	}, [repassword, password]);

	useEffect(() => {
		setTimeout(() => {
      if(error!=""){
			  setError("");
      }
		}, 5000);
	}, [error]);

	function validate() {
		function validMail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
      return (true)
    }
      
      return (false)
      
    }
    
		if (name.length < 6) {
			setError("Name must be atleast 6 characters long.");
      return 0;
		}
    
    if(!validMail(email)){
      setError("Enter Valid Email Adress.")
      return 0;
    }
		if (password.length < 6) {
			setError("Password must be atleast 6 characters");
      return 0;
		}
    
    return 1;
	}

	async function handleSignUp(e) {
		e.preventDefault();
		if (validate() && passErr === "password matches") {
			try {
				setIsLoading(true);
				const res = await axios.post(
					"https://gardenin-store-backend-v030.rushi173.repl.co/auth/register",
					{
						name: name,
						email: email,
						password: password,
					}
				);
				console.log(res);
				setIsLoading(false);
				if (!res.data.user) {
					setError(res.data);
				} else {
					addToast("Signed Up Successful! Login to Continue", {appearance: 'success'});
					setEmail("");
					setName("");
					setError("");
					setPassword("");
					setRepassword("");
					navigate("/login");
				}
			} catch (err) {
				setIsLoading(false);
				console.log(err);
        addToast("Something error occurred! Try again.", {appearance: 'error'});
        
			}
		}
	}

	return (
		<div className="Signup container-center">
			<div className="container-center container-column Signup-form-container">
				<h2>Sign Up</h2>
				<form className="basic-form-container container-column">
					<div className="basic-input-group">
						<label for="name">
							Name: <span style={{ color: "red" }}>*</span>
						</label>
						<input
							id="name"
							type="text"
							className="input-area"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="basic-input-group">
						<label for="email">
							Email: <span style={{ color: "red" }}>*</span>
						</label>
						<input
							id="email"
							type="text"
							className="input-area"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="basic-input-group">
						<label for="password">
							Password: <span style={{ color: "red" }}>*</span>
						</label>
						<input
							id="password"
							type="password"
							className="input-area"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="basic-input-group">
						<label for="repassword">
							Re-enter Password: <span style={{ color: "red" }}>*</span>
						</label>
						<input
							id="repassword"
							type="password"
							className="input-area"
							value={repassword}
							onChange={(e) => setRepassword(e.target.value)}
						/>
						<small className="err-msg" style={{ color: "red" }}>
							{passErr}
						</small>
					</div>
					<small className="err-msg" style={{ color: "red" }}>{error}</small>
					<button className="btn btn-primary btn-Signup" onClick={handleSignUp}>
						{isLoading ? (
							<Loader type="TailSpin" color="#fff" height={20} width={20} />
						) : (
							"Sign Up"
						)}
					</button>

					<div className="container-space-between btn-Signup">
						<Link to="/login">
							<p>Already Registered? Login🚀</p>
						</Link>
						<p></p>
					</div>
					<hr color="white" width="100%" className="btn-Signup" />
					<br />
					{/* <p>
						<u>Or Signup With</u>
					</p>
					<div className="container-space-between social-Signup btn-Signup">
						<button class="btn btn-facebook" disabled>
							Facebook
							<i class="fa fa-facebook icon-right" aria-hidden="true"></i>
						</button>
						<button class="btn btn-twitter" disabled>
							Twitter<i class="fa fa-twitter icon-right" aria-hidden="true"></i>
						</button>
						<button class="btn btn-google" disabled>
							Google
							<i class="fa fa-google-plus icon-right" aria-hidden="true"></i>
						</button>
					</div> */}
				</form>
			</div>
		</div>
	);
}
