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
                                    <h4 class="card-title">User Group Details</h4>
                                </div>
                                <div class="card-body">
                                    <table id="group-master-details" class="table cus-datatable table-striped dt-responsive nowrap w-100">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>GROUP NAME</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- end cardaa -->
                        </div> <!-- end col -->
                    </div> <!-- end row -->
                </div> <!-- container-fluid -->
            </div>
            <!-- End Page-content -->            
        </div>
        <!-- end main content-->
        
        <!--  Extra Large modal example -->
        <div id="new-group-details-modal" class="modal fade bs-example-modal-center" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myExtraLargeModalLabel">Add New User Group</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form class="modal-body" id="addNewUserGroup" method="POST" action="UserController">
                        <input type="hidden" name="created_by" value="<%= UserID %>">
                        <input type="hidden" name="REQ" value="addNewGroupPermission">
                        
                        <div class="row">
                            <div class="col-lg-12 mb-2">
                                <label class="form-label">GROUP NAME</label>
                                <input class="form-control" type="text" name="group_name" required>
                            </div>
                        </div>
                    </form>
                    <div class="modal-footer pt-4">
                        <div class="col-lg-12 text-right">
                            <button type="reset" class="btn btn-soft-danger w-lg waves-effect waves-light" data-bs-dismiss="modal" aria-label="Close"><i class="mdi mdi-close-box-outline"></i> Cancel</button>
                            <button type="submit" form="addNewUserGroup" class="btn btn-success w-lg waves-effect waves-light"><i class="mdi mdi-content-save-all"></i> SAVE DETAILS</button>
                        </div>                                        
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <!--  Extra Large modal example -->
        <div id="editUserGroupDetails" class="modal fade bs-example-modal-center" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myExtraLargeModalLabel">Add New User Group</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form class="modal-body" id="EditUserGroup" method="POST" action="UserController">
                        <input type="hidden" name="created_by" value="<%= UserID %>">
                        <input type="hidden" name="group_id" id="group_id" value="">
                        <input type="hidden" name="REQ" value="editGroupPermission">
                        <div class="row">
                            <div class="col-lg-12 mb-2">
                                <label class="form-label">GROUP NAME</label>
                                <input class="form-control" type="text" name="u_group_name" id="u_group_name" required>
                            </div>
                        </div>
                    </form>
                    <div class="modal-footer pt-4">
                        <div class="col-lg-12 text-right">
                            <button type="reset" class="btn btn-soft-danger w-lg waves-effect waves-light" data-bs-dismiss="modal" aria-label="Close"><i class="mdi mdi-close-box-outline"></i> Cancel</button>
                            <button type="submit" form="EditUserGroup" class="btn btn-warning w-lg waves-effect waves-light"><i class="mdi mdi-content-save-all"></i> UPDATE DETAILS</button>
                        </div>                                        
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
    </div>
    <!-- END layout-wrapper -->
    <!-- Footer page -->
    <%@include file="../../footer.jsp" %>
    <!-- Footer Libraries page -->
    <%@include file="../../footer_libs.jsp" %>
    </body>
</html>

<% } %>