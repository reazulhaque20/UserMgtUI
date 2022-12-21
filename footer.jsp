        <!-- Static Backdrop Modal -->
        <div class="modal fade" id="ChangePassword" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Update Your Password</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="updateUserPassword" class="modal-body" method="POST" action="UserController">
                        <input type="hidden" name="REQ" value="setUserNewPassword">
                        <input type="hidden" name="user_id" id="user_id" value="">
                        
                        <div class="mb-1">
                            <label class="form-label label-sm">Current Password</label>
                            <input class="form-control" type="password" name="c_password" id="c_password" value="" required>
                        </div>
                        <div class="mb-1">
                            <label class="form-label label-sm">New Password</label>
                            <input class="form-control" type="password" name="n_password" id="n_password" value="" required>
                        </div>
                        <div class="mb-1">
                            <label class="form-label label-sm">Confirm Password</label>
                            <input class="form-control" type="password" name="r_password" id="r_password" value="" required>
                        </div>                        
                    </form>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-soft-danger" data-bs-dismiss="modal"><i class="mdi mdi-close"></i> Close</button>
                        <button type="submit" id="subUpBtn" form="updateUserPassword" class="btn btn-success"><i class="mdi mdi-check-decagram-outline"></i> UPDATE PASSWORD</button>
                    </div>
                </div>
            </div>
        </div>      