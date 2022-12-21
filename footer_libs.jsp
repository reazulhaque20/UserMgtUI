
        <!-- JAVASCRIPT -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/jquery.form.js"></script>
        <script src="assets/js/bootstrap.bundle.min.js"></script>
        <script src="assets/js/metisMenu.min.js"></script>
        <script src="assets/js/simplebar.min.js"></script>
        <script src="assets/js/waves.min.js"></script>
        <script src="assets/js/angular.min.js"></script>
        <!-- choices js -->
        <script src="assets/js/choices.min.js"></script>
        <script src="assets/js/select2.min.js"></script>
        <!-- Required datatable js -->
        <script src="assets/js/jquery.dataTables.min.js"></script>
        <script src="assets/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/js/dataTables.responsive.min.js"></script>
        <script src="assets/js/responsive.bootstrap4.min.js"></script>
        <script src="assets/js/dataTables.buttons.min.js"></script>
        <script src="assets/js/dataTables.select.min.js"></script>
        <script src="assets/js/jszip.min.js"></script>
        <script src="assets/js/buttons.html5.min.js"></script>
        <script src="assets/js/buttons.colVis.min.js"></script>
        <!-- Buttons examples -->
        <script src="assets/js/buttons.bootstrap4.min.js"></script>
        <script src="assets/js/buttons.print.min.js"></script>
        <!-- datepicker js -->
        <script src="assets/js/flatpickr.min.js"></script>
        <!-- Select 2 js -->
        <script src="assets/js/toastr.min.js"></script>
        <script src="assets/js/sweetalert2.min.js"></script>
        <!-- Datatable init js -->
        <script src="assets/js/dummy/datatables.init.js"></script>
        <script src="assets/js/app.js"></script>
        
        <script>
            $(document).ready(function(){
                $("#loader_holder").hide();
                
                $(".GlobalSelect").each(function() {
                    $(this).select2({
                        theme: "bootstrap-5",
                        dropdownParent: $(this).parent()
                    });
                });
                
                $(".datepicker").each(function (i) {
                  flatpickr("#" + this.id, {
                    allowInput: true,
                    enableTime: false,
                    dateFormat: "d-m-Y",
                    defaultDate: "today"
                  });
                });
                
                // Updating Password
                $('#r_password').on('keyup', function () {
                    $('#n_password, #r_password').on('keyup', function () {
                        if ($('#n_password').val() === $('#r_password').val()) {
                            $('#subUpBtn').removeAttr('disabled');
                            $('#r_password').addClass("is-valid").removeClass("is-invalid");
                        } 
                        else {
                            $('#r_password').addClass("is-invalid").removeClass("is-valid");
                            $("#subUpBtn").attr('disabled','disabled');
                        }	
                    });
                });
            });
        </script>