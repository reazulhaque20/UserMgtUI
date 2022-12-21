    <!-- Header page -->
    <%@include file="../header.jsp" %>
        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">        
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">User Permission Details</h4>
                                </div>
                                <div id="setUserPermissionDetails" class="card-body menu-permissions">
                                    <div class="alert alert-secondary fade show" role="alert">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <select class="form-select form-control GlobalSelect" id="UsersList">
                                                </select>
                                            </div>
                                            <div class="col-lg-2">
                                                <select class="form-select form-control GlobalSelect" name="module_name" id="module_name" required>
                                                    <option value="null">Select Module Name</option>
                                                </select>
                                            </div>
                                            <div class="col-lg-3">
                                                <select class="form-select form-control GlobalSelect" name="group_name" id="group_name" onchange="getGroupWisePermissionDetails(this);" required>
                                                    <option value="">Select Permission Group</option>
                                                </select>
                                            </div>

                                            <div class="col-lg-4 text-right no-padding">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="mdi mdi mdi-database-plus-outline"></i> ADD PERMISSION<i class="mdi mdi-chevron-down"></i></button>
                                                    <div class="dropdown-menu dropdownmenu-primary">
                                                        <a class="dropdown-item" href="#" onclick="addNewUserPermissions()">User Permission</a>
                                                        <a class="dropdown-item" href="#" onclick="addNewGroupPermissions()">Group Permission</a>
                                                    </div>
                                                </div>
                                                <button class="btn btn-sm btn-success" onclick="copySelectedPermissions()"><i class="mdi mdi-content-copy"></i> COPY</button>
                                                <button class="btn btn-sm btn-danger" onclick="deleteSelectedPermissions()"><i class="mdi mdi-trash-can-outline"></i> DELETE</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <table id="menu-list-details" class="table cus-datatable table-striped dt-responsive nowrap w-100">
                                        <thead>
                                            <tr>
                                                <th width="2%">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="SelectAllList" onclick="SelectAllItemsList()">
                                                    </div>
                                                </th>
                                                <th>Module Name</th>
                                                <th>Page Name</th>
                                                <th>Page Link</th>
                                                <th>Page Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                      
        </div>
                                                

        <!-- Add New Permissions Modal -->
        <div id="addNewUserPermission" class="modal fade bs-example-modal-xl" data-bs-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel">Add New Permission to User</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="AddNewUserPermissions"  Method="POST" action="UserController">
                            <input type="hidden" name="REQ" value="addNewUserPermissions">
                            <div class="row">
                                <div class="col-md-8">
                                    <select name="User_ID" id="User_ID" class="form-control GlobalSelect" style="width: 100%;" required>
                                        <option value="">Please Select a User</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" name="" id="menuFilter" class="form-control menuFilters" placeholder="Search here">
                                </div>
                            </div>
                            <br>

                            <table id="AddMenuListTbl" class="table table-responsive-sm table-bordered" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th width="2%">
                                            <label class="custom-control custom-checkbox margin-r0 margin-b0">
                                                <input type="checkbox" id="SelectAllNewItem" class="custom-control-input" onclick="SelectAllNewItems()">
                                              <span class="custom-control-indicator"></span>
                                              <span class="custom-control-description"><b></b></span>
                                            </label>
                                        </th>
                                        <th>SN</th>
                                        <th>Module Name</th>
                                        <th>Parent Menu</th>
                                        <th>Page Name</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                </tbody>
                                </tbody>
                            </table>    
                        </form>
                    </div>
                    <div class="modal-footer">     
                        <button type="submit" form="AddNewUserPermissions" class="btn btn-success" ><i class="fa fa-plus-square"></i> Save Permissions</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i> Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ./Add New Permissions Modal -->                           

        <!-- Add New Permissions Modal -->
        <div id="addNewGroupPermission" class="modal fade bs-example-modal-xl" data-bs-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel">Add New Permission to Group</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="AddNewGroupPermissions"  Method="POST" action="UserController">
                            <input type="hidden" name="REQ" value="addNewGroupPermissions">
                            <div class="row">
                                <div class="col-md-8">
                                    <select class="form-select form-control GlobalSelect" name="groupName" id="groupName" required>
                                        <option value="">Select Permission Group</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" name="" id="menuFilter" class="form-control menuFilters" placeholder="Search here">
                                </div>
                            </div>
                            <br>

                            <table id="AddMenuListTbl" class="table table-responsive-sm table-bordered" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th width="2%">
                                            <label class="custom-control custom-checkbox margin-r0 margin-b0">
                                                <input type="checkbox" id="SelectAllNewItem" class="custom-control-input" onclick="SelectAllNewItems()">
                                              <span class="custom-control-indicator"></span>
                                              <span class="custom-control-description"><b></b></span>
                                            </label>
                                        </th>
                                        <th>SN</th>
                                        <th>Module Name</th>
                                        <th>Parent Menu</th>
                                        <th>Page Name</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                </tbody>
                                </tbody>
                            </table>    
                        </form>
                    </div>
                    <div class="modal-footer">     
                        <button type="submit" form="AddNewGroupPermissions" class="btn btn-success" ><i class="fa fa-plus-square"></i> Save Permissions</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i> Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ./Add New Permissions Modal -->                                      
                                                
    </div>
    <!-- END layout-wrapper -->
    <!-- Footer page -->
    <%@include file="../../footer.jsp" %>
    <!-- Footer Libraries page -->
    <%@include file="../../footer_libs.jsp" %>
    
    </body>
</html>