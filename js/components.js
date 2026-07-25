class SidebarImpl extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            <a class="nav-link" href="https://nikunjdoke.in/">
                                <div class="sb-nav-link-icon"><i class="fas fa-house"></i></div>
                                Back to Site
                            </a>
                            <a class="nav-link" href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            <a class="nav-link" href="userslist.html">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-user-tie"></i></div>
                                Manage Users
                            </a>
                            
                            <div class="sb-sidenav-menu-heading">Upload</div>
                            <a class="nav-link" href="uploadpoem.html">
                                <div class="sb-nav-link-icon"><i class="fa-regular fa-note-sticky"></i></div>
                                Upload Poem
                            </a>
                            <div class="sb-sidenav-menu-heading">Edit</div>
                            <a class="nav-link" href="poemslist.html">
                                <div class="sb-nav-link-icon"><i class="fa-regular fa-note-sticky"></i></div>
                                Modify Poems
                            </a>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        <div id="usernamefooter"></div>
                    </div>
                </nav>
            </div>
        `;
    }
}
customElements.define('sb-impl', SidebarImpl);

class NavbarImpl extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <!-- Navbar Brand-->
                <a class="navbar-brand ps-3" href="index.html">Nidofy Admin</a>
                <!-- Sidebar Toggle-->
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>

                <div class="ms-auto me-0 me-md-3 my-2 my-md-0"></div>

                <!-- Navbar-->
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">Settings</a></li>
                            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#!">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        `;
    }
}
customElements.define('nb-impl', NavbarImpl);

class FooterImpl extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Nikunj Doke 2026</div>
                    </div>
                </div>
            </footer>
        `;
    }
}
customElements.define('footer-impl', FooterImpl);
