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
                                    <h4 class="card-title">Menu List</h4>
                                </div>
                                <div class="card-body">
                                    <table id="menu-list-details" class="table cus-datatable table-striped dt-responsive nowrap w-100">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>Module Name</th>
                                                <th>Parent Menu</th>
                                                <th>Page Name</th>
                                                <th>Page Link</th>
                                                <th>Menu Icon</th>
                                                <th>Remarks</th>
                                                <th>Action</th>
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
            <!-- End Page-content -->            
        </div>
        <!-- end main content-->
        

        <!-- Add Master Menu List Modal -->
        <div class="modal fade bs-example-modal-center" id="addNewMasterMenu" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add New Master Menu</h4>
              </div>
              <div class="modal-body">
                <form id="AddNewMasterMenuList" Method="POST" action="UserController">
                    <input type="hidden" name="created_by" value="<%= UserID %>">
                    <input type="hidden" name="REQ" value="setNewMasterMenuList">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Project Name <sup>*</sup></label>
                                <select name="project_name" id="project_name" class="form-control" required="">
                                    <option value="105">Purchase Manager</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Menu Serial No <sup>*</sup></label>
                                <input type="text" class="form-control form-control-sm" name="m_menu_serial" id="m_menu_serial" value="<%=code%>" readonly>
                            </div>
                            <div class="form-group">
                                <label>Menu Name <sup>*</sup></label>
                                <input type="text" class="form-control form-control-sm" name="m_menu_name" id="m_menu_name" maxlength="60">
                            </div>
                            <div class="form-group">
                                <label>Menu Title <sup>*</sup></label>
                                <input type="text" class="form-control form-control-sm" name="m_menu_title" id="m_menu_title" maxlength="60">
                            </div>
                            <div class="form-group">
                                <label>Menu Icon <sup>*</sup></label>
                                <input type="text" class="form-control form-control-sm" name="m_menu_icon" id="m_menu_icon" maxlength="60">
                            </div>
                            <div class="form-group">
                                <label>Remarks <sup>*</sup></label>
                                <input type="text" class="form-control form-control-sm" name="m_menu_reamrks" id="m_menu_reamrks" maxlength="60">
                            </div>
                        </div>
                    </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="reset" class="btn btn-danger" data-bs-dismiss="modal"><i class="fa fa-close"></i> Close</button>
                <button type="submit" form="AddNewMasterMenuList" class="btn btn-success"><i class="fa fa-save"></i> SAVE DETAILS</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.Add Master Menu modal -->


        <!-- Add menu List Modal -->
        <div class="modal fade bs-example-modal-center" id="addNewMenu" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add New Page Menu</h4>
              </div>
              <div class="modal-body">
                <form id="AddNewPageMenuList" Method="POST" action="UserController">
                    <input type="hidden" name="created_by" value="<%= UserID %>">
                    <input type="hidden" name="REQ" value="setMasterMenuList">

                    <table id="addNewPageMenu" class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" width="20%">Module Name</th>
                          <th scope="col" width="15%">Menu Title</th>
                          <th scope="col" width="15%">Menu Link</th>
                          <th scope="col" width="15%">Menu Icon</th>
                          <th scope="col" width="15%">Remarks</th>
                          <th scope="col" width="6%"><a href="javascript:void()" class="btn btn-soft-success btn-sm" onclick="addRow('addNewPageMenu')" title="Add New Page Menu"><i class="mdi mdi-plus"></i></a></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                              <select name="pm_module_name" class="form-control form-select" required>
                              </select>
                          </td>
                          <td><input type="text" class="form-control" name="pm_menu_title" required></td>
                          <td><input type="text" class="form-control" name="pm_menu_link" required></td>
                          <td><input type="text" class="form-control" name="pm_menu_icon" value="icon-options" required></td>
                          <td><input type="text" class="form-control" name="pm_reamrks" required></td>
                          <td><a href="javascript:void()" class="btn btn-soft-danger btn-sm" onclick="delRow(this,'addNewPageMenu')" title="Delete Page Menu" ><i class="mdi mdi-trash-can-outline"></i></a></td>
                        </tr>
                      </tbody>
                    </table>
                </form>
              </div>
              <div class="modal-footer">
                <button type="reset" class="btn btn-danger" data-bs-dismiss="modal" onclick="clearFormData('#AddNewPageMenuList')"><i class="fa fa-close"></i> Close</button>
                <button type="submit" form="AddNewPageMenuList" class="btn btn-success"><i class="fa fa-save"></i> SAVE DETAILS</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.Add modal -->


        <!-- Edit User Modal -->
        <div class="modal fade bs-example-modal-center" id="editPageDataDetails" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-md modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit Page Details</h4>
              </div>
              <div class="modal-body">
                <form id="upPageDetails" class="row" Method="POST" action="UserController">
                    <input type="hidden" name="menu_serial" id="menu_serial" value="">
                    <input type="hidden" name="REQ" value="upPageDetails">

                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Menu Parent</label>
                        </div>
                        <div class="form-group">
                            <label>Page Name</label>
                            <input type="text" class="form-control" name="page_name" id="page_name" required>
                        </div>    
                        <div class="form-group">
                            <label>Page Link</label>
                            <input type="text" class="form-control" name="page_link" id="page_link" required>
                        </div>
                        <div class="form-group">
                            <label>Page Icon</label>
                            <input type="text" class="form-control" name="page_icon" id="page_icon" required>
                        </div>
                        <div class="form-group">
                            <label>Page Remarks</label>
                            <input type="text" class="form-control" name="page_remarks" id="page_remarks" required>
                        </div>                        
                    </div> 
                </form>
              </div>
              <div class="modal-footer">
                <button type="reset" class="btn btn-danger" data-bs-dismiss="modal" onclick="clearFormData('#upPageDetails')"><i class="fa fa-close"></i> Close</button>
                <button type="submit" form="upPageDetails" class="btn btn-success"><i class="fa fa-refresh"></i> UPDATE DETAILS</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.Edit User modal -->
        
        
        
    </div>
    <!-- END layout-wrapper -->
    <!-- Footer page -->
    <%@include file="../../footer.jsp" %>
    <!-- Footer Libraries page -->
    <%@include file="../../footer_libs.jsp" %>
    
    </body>
</html>