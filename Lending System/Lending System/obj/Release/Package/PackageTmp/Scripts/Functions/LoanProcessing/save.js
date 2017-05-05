var Create = function () {
    
    var loan_no = $('#txtloan_no').val();
    loan_no = yyyy + "-" + $('#txtloantype_id').val() + "-" + loan_no
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
        "reviewed_by_name": $('#txtreviewed_by_name').val(),
        "approved_by_id": $('#txtapproved_by_id').val(),
        "approved_by_name": $('#txtapproved_by_name').val()
    };
    var myObj1 = {

        "date_trans": loan_date,
        "trans_type": "Beginning Balance",
        "reference_no": loan_no,
        "loan_id": $('#txtloan_no').val(),
        "loan_type_name": $('#txtloan_name').val(),
        "customer_id": $('#txtcustomer_id').val(),
        "customer_name": $('#txtcustomer_name').val(),
        "interest_type": interesttype,
        "interest_rate": $('#txtloan_interest_rate').val(),
        "transaction_type": "Beginning Balance",
        "interest": 0,
        "debit": 0,
        "credit": 0,
        "balance": $('#txttotal_receivable').val(),
        "date_created": loan_date,
        "created_by": $('#txtprepaired_by_name').find('option:selected').text()
    };
    $.ajax({
        url: RootUrl + "LoanProcessing/Create",
        type: "POST",
        data: JSON.stringify(myObj),
        contentType: 'application/json',
        success: function (response, status, xhr) {
            if (response != "Success") {
                toastr.success('Record was not successfully save.', 'Save');
            }
            else {
                toastr.success('Record was successfully save.', 'Save');
            }
        },
        error: ""
    });
    $.ajax({
        url: RootUrl + "LoanProcessing/CreateLedger",
        type: "POST",
        data: JSON.stringify(myObj1),
        contentType: 'application/json',
        success: function (response, status, xhr) {
            if (response != "Success") {
                toastr.success('Record was not successfully save.', 'Save');
            }
            else {
                toastr.success('Record was successfully save.', 'Save');
            }
        },
        error: ""
    });
    window.location.href = RootUrl + "LoanProcessing/Index"
}
