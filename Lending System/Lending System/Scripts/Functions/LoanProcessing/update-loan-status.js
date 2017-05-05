
$(document).ready(function () {
    AmortizationTable.InitializeEvents();
    CreateSchedule();
});

var interesttype = "";
var chargetype = "";
var totalinterest = "";
var loandays = "";

var AmortizationTable =
        {
            InitializeEvents: function () {
                var table = $('#Amortization-table').DataTable({
                    "bPaginate": false,
                    "bLengthChange": false,
                    "bFilter": false,
                    "bInfo": false,
                    "columns": [
                            { "data": "due_date", "className": "dt-left" },
                            { "data": "loan_granted", "autoWidth": "dt-right" },
                            { "data": "interest", "className": "dt-right" },
                            { "data": "net_proceeds", "className": "dt-right" },
                            { "data": "balance", "className": "dt-right" }
                    ]
                });
            }
        }

function CreateSchedule() {
    var id = $('#txtloantype').val()
    $.ajax({
        url: RootUrl + "LoanProcessing/LoadLoanTypeInterestType?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) { ComputeTotalReceivables(response), interesttype = response },
        error: ""
    });

    totalinterest = parseInt($('#txtloan_granted').val() * ($('#txtloan_interest_rate').val() / 100))

    if (parseInt($('#txtinstallment_no').val()) != "") {
        totalinterest = totalinterest * parseInt($('#txtinstallment_no').val())
    }

    if (interesttype == 1) {
        if ($('#txtloan_granted').val() != 0) {
            CreateAmortizationSchedule(
                                        $('#txtdue_date').val(),
                                        $('#txtloan_granted').val(),
                                        totalinterest,
                                        $('#txttotal_receivable').val(),
                                        $('#txttotal_receivable').val(),
                                        $('#txtinstallment_no').val(),
                                        $('#txtpayment_scheme').find('option:selected').text())
        }
    }
    else {
        if ($('#txtloan_granted').val() != 0) {
            CreateAmortizationSchedule(
                                        $('#txtdue_date').val(),
                                        $('#txtloan_granted').val(),
                                        0,
                                        $('#txttotal_receivable').val(),
                                        $('#txttotal_receivable').val(),
                                        $('#txtinstallment_no').val(),
                                        $('#txtpayment_scheme').find('option:selected').text())
        }
    }
}

function CreateAmortizationSchedule(due_date, loan_granted, interest, total_receivable, balance, installment, payment_scheme) {
    $('#Amortization-table tbody > tr').empty()
    var table = $('#Amortization-table').DataTable();
    var line_no = table.rows().clear()
    line_no = table.rows().eq(0).length + 1;


    if (line_no == 1) {
        table.row.add({
            "due_date": "",
            "loan_granted": "",
            "interest": "",
            "net_proceeds": "",
            "balance": total_receivable,
        }).draw(true);
    }

    var tbl_principal_balance = total_receivable;
    var tbl_principal = (tbl_principal_balance - interest) / installment;
    var tbl_due_date = new Date(due_date);
    var tbldd = tbl_due_date.getDate();
    var tblmm = tbl_due_date.getMonth() + 1; //January is 0!
    var tblyyyy = tbl_due_date.getFullYear();
    var tbl_due_date_display = tblmm + "/" + tbldd + "/" + tblyyyy

    var interest = interest / installment;;
    var amount = tbl_principal + interest;

    for (i = 0; i < installment; i++) {
        line_no = table.rows().eq(0).length + 1;

        tbl_principal_balance = tbl_principal_balance - amount
        if (line_no >= 2) {
            table.row.add({
                "due_date": tbl_due_date_display,
                "loan_granted": tbl_principal,
                "interest": interest,
                "net_proceeds": amount,
                "balance": tbl_principal_balance,
            }).draw(true);
        }

        if (payment_scheme == "Daily") {
            tbl_due_date.setDate(tbl_due_date.getDate() + 1)
            tbldd = tbl_due_date.getDate()
            tblmm = tbl_due_date.getMonth() + 1
            tblyyyy = tbl_due_date.getFullYear()
            tbl_due_date_display = tblmm + "/" + tbldd + "/" + tblyyyy
        }
        else if (payment_scheme == "Weekly") {
            tbl_due_date.setDate(tbl_due_date.getDate() + 7)
            tbldd = tbl_due_date.getDate()
            tblmm = tbl_due_date.getMonth() + 1
            tblyyyy = tbl_due_date.getFullYear()
            tbl_due_date_display = tblmm + "/" + tbldd + "/" + tblyyyy
        }
        else if (payment_scheme == "Semi-Monthly") {
            tbl_due_date.setDate(tbl_due_date.getDate() + 15)
            tbldd = tbl_due_date.getDate()
            tblmm = tbl_due_date.getMonth() + 1
            tblyyyy = tbl_due_date.getFullYear()
            tbl_due_date_display = tblmm + "/" + tbldd + "/" + tblyyyy
        }
        else if (payment_scheme == "Monthly") {
            tbl_due_date.setDate(tbl_due_date.getDate() + 30)
            tbldd = tbl_due_date.getDate()
            tblmm = tbl_due_date.getMonth() + 1
            tblyyyy = tbl_due_date.getFullYear()
            tbl_due_date_display = tblmm + "/" + tbldd + "/" + tblyyyy
        }
    }
};
var Review = function () {
    debugger
    var loan_no = $('#txtloan_no').val();

    var due_date = $("#txtdue_date").val();
    var loan_date = $("#txtloan_date").val();

    var myObj = {

        "customer_id": $('#txtcustomer_id').val(),
        "customer_name": $('#txtcustomer_name').val(),
        "loan_no": loan_no,
        "loantype_id": $('#txtloantype_id').val(),
        "loan_name": $('#txtloan_name').val(),
        "loan_granted": $('#txtloan_granted').val(),
        "loan_interest_rate": $('#txtloan_interest_rate').val(),
        "payment_scheme": $('#txtpayment_scheme').find('option:selected').text(),
        "due_date": due_date,
        "loan_date": loan_date,
        "installment_no": $('#txtinstallment_no').val(),
        "total_receivable": $('#txttotal_receivable').val(),
        "net_proceeds": $('#txtnet_proceeds').val(),
        "amortization_id": $('#txtamortization_id').val(),
        "finance_charge_id": $('#txtfinance_charge_id').val(),
        "status": $('#txtstatus').val(),
        "prepaired_by_id": $('#txtprepaired_by_id').val(),
        "prepaired_by_name": $('#txtprepaired_by_name').find('option:selected').text(),
        "reviewed_by_id": $('#txtreviewed_by_id').val(),
        "reviewed_by_name": $('#txtreviewed_by_name').find('option:selected').text(),
        "approved_by_id": $('#txtapproved_by_id').val(),
        "approved_by_name": $('#txtapproved_by_name').find('option:selected').text()
    };

    $.ajax({
        url: RootUrl + "LoanProcessing/Edit?id=" + $('#txtautonum').val(),
        type: "POST",
        data: JSON.stringify(myObj),
        contentType: 'application/json',
        success: function (response, status, xhr) {
            debugger
            if (response == "Success") {
                toastr.success('Successfully approved.');
                window.location.href = RootUrl + "LoanProcessing/Index"
            }
            else {
                toastr.error('failed to review.');
            }
        },
        error: function (response, status, xhr) {
            toastr.error('failed to review.');
        }
    });
}
