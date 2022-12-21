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
                                    <h4 class="card-title">Approval Permission Details List</h4>
                                </div>
                                <div class="card-body">
                                    <table id="permission-master-details" class="table cus-datatable table-striped dt-responsive nowrap w-100">
                                        <thead>
                                            <tr>
                                                <th>PERMISSION ID</th>
                                                <th>CATEGORY NAME</th>
                                                <th>COMPANY NAME</th>
                                                <th>LOCATION</th>
                                                <th>USER NAME</th>
                                                <th>ACTION</th>
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
        <!-- end main content-->
        
        <!--  Extra Large modal example -->
        <div id="new-permission-details-modal" class="modal fade bs-example-modal-center" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Approval Permission Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form class="modal-body" id="AddNewApprovalPermissionDetails" method="POST" action="PdmController">
                        <input type="hidden" name="REQ" value="setNewApprovalPermissionDetails" >
                        
                        <div class="row">
                            <div class="col-lg-12 mb-2">
                                <label class="form-label">CATEGORY NAME</label>
                                <select class="form-select form-control GlobalSelect" name="category_name" required>
                                </select>
                            </div>
                            <div class="col-lg-12 mb-2">
                                <label class="form-label">COMPANY NAME</label>
                                <select class="form-select form-control GlobalSelect" name="company_name" required>
                                </select>
                            </div>
                            <div class="col-lg-12 mb-2">
                                <label class="form-label">LOCATION</label>
                                <select class="form-select form-control GlobalSelect" name="location_name" >
                                </select>
                            </div>
                            <div class="col-lg-12 mb-2">
                                <label class="form-label">USER NAME</label>
                                <select class="form-select form-control GlobalSelect" name="person_id" id="UserId" >
                                </select>
                            </div>
                        </div>
                    </form>
                    <div class="modal-footer pt-4">
                        <div class="col-lg-12 text-right">
                            <button type="reset" class="btn btn-soft-danger w-md waves-effect waves-light" data-bs-dismiss="modal" aria-label="Close"><i class="mdi mdi-close-box-outline"></i> Cancel</button>
                            <button type="submit" form="AddNewApprovalPermissionDetails" class="btn btn-success w-lg waves-effect waves-light"><i class="mdi mdi-content-save-all"></i> SAVE DETAILS</button>
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