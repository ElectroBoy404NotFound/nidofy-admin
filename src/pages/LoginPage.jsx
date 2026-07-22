import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

import { login } from "../data/Api";

function LoginPage() {
    const { isAuthenticated, authLoginFunc } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    async function performLogin(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const result = await login(email, password);
            if("error" in result) {
                switch(result.error) {
                    case 1003:
                        setError("User doesn't exist or invalid password!");
                        break;
                    default:
                        setError(`Unknown server error ${result.error}!`);
                }
                return;
            }

            await authLoginFunc(result.token);
            navigate("/", { replace: true });
        } catch (err) {
            setError("Unknown Network Error Occured");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                        <div className="card-body">
                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            <form onSubmit={performLogin}>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        className="form-control"
                                                        id="inputEmail"
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        className="form-control"
                                                        id="inputPassword"
                                                        type="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="inputPassword">Password</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <a className="small" href="/resetpassword">Forgot Password?</a>
                                                    <button className="btn btn-primary" type="submit" disabled={submitting}>
                                                        {submitting ? "Logging in..." : "Login"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default LoginPage;