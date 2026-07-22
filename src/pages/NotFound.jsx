import { useAuth } from "../providers/AuthProvider";

function NotFound() {
    return (
        <>
            <div id="layoutError">
                <div id="layoutError_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="text-center mt-4">
                                        <img className="mb-4 img-error" src="assets/img/error-404-monochrome.svg" />
                                        <p className="lead">This requested URL was not found on this server.</p>
                                        <a href="/">
                                            <i className="fas fa-arrow-left me-1"></i>
                                            Return to Dashboard
                                        </a>
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

export default NotFound;