<%  
    String root = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="Apex Purchase manager">
        <meta name="author" content="Rifat Tanjir">
        <link rel="shortcut icon" href="assets/images/favicon.png">
        <title>Agro ERP System</title>
	
        <!-- DataTables -->
        <link href="assets/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
        <!-- Responsive datatable examples -->
        <link href="assets/css/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" /> 
	
        <!-- choices css -->
        <link href="assets/css/choices.min.css" rel="stylesheet" type="text/css" />
        <!--<link href="assets/css/bootstrap-select.min.css" rel="stylesheet" type="text/css" />-->
        <!-- datepicker css -->
        <link rel="stylesheet" href="assets/css/flatpickr.min.css">
        <!-- FullCalender Css -->
        <link href="assets/js/vendors/fullcalendar/core/main.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/js/vendors/fullcalendar/daygrid/main.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/js/vendors/fullcalendar/bootstrap/main.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/js/vendors/fullcalendar/timegrid/main.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/toastr.min.css" rel="stylesheet" type="text/css"> 
        <link href="assets/css/sweetalert2.min.css" rel="stylesheet" type="text/css"
        <!-- Bootstrap Css -->
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <!-- Select 2 Css -->
        <link href="assets/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/select2-bootstrap-5-theme.min.css" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
        <!-- Custom Css-->
        <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
    </head>
	
    <body data-sidebar-size="lg" data-topbar="dark">
        <div id="loader_holder">
            <img src="assets/images/loader_bar.gif" alt="Loading..." />
        </div>
        
    <!-- <body data-layout="horizontal"> -->
        <!-- Begin page -->
        <div id="layout-wrapper">
            <header id="page-topbar">
                <div class="navbar-header">
                    <div class="d-flex">
                        <div class="navbar-brand-box">
                            <a href="dashboard" class="logo logo-dark">
                                <span class="logo-sm">
                                    <img src="assets/images/logo-g-sm.png" alt="" height="24">
                                </span>
                                <span class="logo-lg">
                                    <img src="assets/images/logo-g-sm.png" alt="" height="24"> <span class="logo-txt">Agro ERP</span>
                                </span>
                            </a>

                            <a href="dashboard" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="assets/images/agro_logo.png" alt="" height="24">
                                </span>
                                <span class="logo-lg">
                                    <img src="assets/images/agro_logo.png" alt="" height="24"> <span class="logo-txt">AGRO-ERP</span>
                                </span>
                            </a>
                        </div>

                        <button type="button" class="btn btn-sm px-3 font-size-16 header-item" id="vertical-menu-btn">
                            <i class="mdi mdi-format-align-justify"></i>
                        </button>
                        
<!--                        <form id="RqnDetailsSearch" class="app-search d-none d-lg-block">
                            <div class="position-relative">
                                <input type="text" class="form-control" placeholder="RQN Search..." required>
                                <button class="btn btn-primary" type="submit" data-toggle="modal" data-target="#requisition-details-modal"><i class="mdi mdi-clipboard-text-search-outline"></i></button>
                            </div>
                        </form>-->
                    </div>

                    <div class="d-flex">
                        <div class="dropdown d-none d-sm-inline-block">
                            <button type="button" class="btn header-item" id="mode-setting-btn">
                                <i class="mdi mdi-lightbulb-on-outline"></i>
                            </button>
                        </div>

                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item noti-icon position-relative" id="page-header-notifications-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="mdi mdi-bell-outline"></i>
                                <span class="badge bg-danger rounded-pill">0</span>
                            </button>
                        </div>

<!--                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item right-bar-toggle me-2">
                                <i class="mdi mdi-cog-transfer-outline"></i>
                            </button>
                        </div>-->

                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item bg-soft-light border-start border-end" id="page-header-user-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img class="rounded-circle header-profile-user" src="assets/images/users/profile.jpeg"
                                    alt="Header Avatar">
                                <span class="d-none d-xl-inline-block ms-1 fw-medium">USER_NAME</span>
                                <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <a class="dropdown-item" href="javascript.void(0)" data-bs-toggle="modal" data-bs-target="#ChangePassword"><i class="mdi mdi-account-key-outline align-middle"></i> Change Password</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item"  onclick="document.getElementById('logOutForm').submit();" href="javascript:void()"><i class="mdi mdi-logout font-size-16 align-middle me-1"></i> Logout</a>
                                <form id="logOutForm" method="post" action="<%= root%>/UserController">
                                    <input type="hidden" name="REQ" value="LogoutUser" />
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <!-- ========== Left Sidebar Start ========== -->
            <div class="vertical-menu">
                <div data-simplebar class="h-100">
                    <!--- Sidemenu -->
                    <div id="sidebar-menu">
                        <!-- Left Menu Start -->
                        <ul class="metismenu list-unstyled" id="side-menu">
                            <li>
                                <a href="dashboard"><i class="mdi mdi-monitor-dashboard"></i><span data-key="t-dashboard">Dashboard</span></a>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-account-cowboy-hat-outline"></i><span data-key="t-pages">Farmer Profile</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="farmers_list" data-key="t-starter-page">Farmers List</a></li>
                                    <li><a href="farmer_enrollment" data-key="t-maintenance">Farmer Enrollment</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-map-outline"></i><span data-key="t-pages">Farmland Profile</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="farms_list" data-key="t-starter-page">Farmland List</a></li>
                                    <li><a href="farms_enrollment" data-key="t-maintenance">Farmland Enrollment</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-handshake-outline"></i><span data-key="t-pages">Contract Farming</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="contracts_list" data-key="t-starter-page">Contracts List</a></li>
                                    <li><a href="new_contract" data-key="t-maintenance">Create Contract</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-clipboard-list"></i><span data-key="t-pages">Planning</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-tractor"></i><span data-key="t-pages">Production</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-cart-plus"></i><span data-key="t-pages">Procurement</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-warehouse"></i><span data-key="t-pages">Warehouse</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-clipboard-search-outline"></i><span data-key="t-pages">Monitoring</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-certificate-outline"></i><span data-key="t-pages">Certifications</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-flask-plus-outline"></i><span data-key="t-pages">R&D & Biotech</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-file-multiple-outline"></i><span data-key="t-pages">MIS/Analytics</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-cog-outline"></i><span data-key="t-pages">Master Data</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="zones_list" data-key="t-starter-page">Zone  List</a></li>
                                    <li><a href="offices_list" data-key="t-maintenance">Office List</a></li>
                                    <li><a href="districts_list" data-key="t-maintenance">District List</a></li>
                                    <li><a href="upazillas_lists" data-key="t-maintenance">Upazilla List</a></li>
                                    <li><a href="unions_list" data-key="t-maintenance">Union List</a></li>
                                    <li><a href="seasons_list" data-key="t-maintenance">Season List</a></li>
                                    <li><a href="doses_list" data-key="t-maintenance">Dose List</a></li>
                                    <li><a href="dose_uses" data-key="t-maintenance">Dose Uses List</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-account-cog-outline"></i><span data-key="t-System Users">System Users</span></a>
                                <ul class="sub-menu mm-collapse" aria-expanded="false">
                                    <li><a href="applied_users" data-key="t-applied_users">Applied Users</a></li>
                                    <li><a href="users_list" data-key="t-users_list">Users List</a></li>
                                    <li><a href="user_groups" data-key="t-user_groups">User Groups</a></li>
                                    <li><a href="menu_list" data-key="t-menu_list">Menu List</a></li>
                                    <li><a href="menu_permission" data-key="t-menu_permission">Menu Permission</a></li>
                                    <li><a href="approval_permissions" data-key="t-approval_permissions">Approval Permission</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="has-arrow"><i class="mdi mdi-monitor-dashboard"></i><span data-key="t-multi-level">Extras</span>
                                </a>
                                <ul class="sub-menu" aria-expanded="true">
                                    <li><a href="calender" data-key="t-level-1-1">Calender</a></li>
                                    <li><a href="mdi" data-key="t-level-1-1">Icons</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Left Sidebar End -->