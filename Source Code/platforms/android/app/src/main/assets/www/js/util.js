/*
    PROG3185 Final Project
    util.js

    Revision History
        Tonnicca Gelacio, 2019-04-04: Created
        Tonnicca Gelacio, 2019-04-07: Updated
        Tonnicca Gelacio, 2019-04-09: Updated
        Tonnicca Gelacio, 2019-04-10: Updated
        Tonnicca Gelacio, 2019-04-12: Updated
        Tonnicca Gelacio, 2019-04-13: Updated
*/

// Validate frmAddNewBuild form
function validateForm_frmAddNewBuild() {

    var form = $("#frmAddNewBuild");

    form.validate({
        rules: {
            txtAddBuildName: {
                required: true
            },
            cboAddItem1: {
                itemcheck: true
            }
        },
        messages: {
            txtAddBuildName: {
                required: "Please enter a name for the build."
            },
            cboAddItem1: {
                itemcheck: "At least one item is required."
            }
        }
    });
    return form.valid();
}

// Validate frmEditBuild form
function validateForm_frmEditBuild() {

    var form = $("#frmEditBuild");

    form.validate({
        rules: {
            txtEditBuildName: {
                required: true
            },
            cboEditItem1: {
                itemCheckEdit: true
            }
        },
        messages: {
            txtEditBuildName: {
                required: "Please enter a name for the build."
            },
            cboEditItem1: {
                itemCheckEdit: "At least one item is required."
            }
        }
    });
    return form.valid();
}

// Custom Rule to require at least 1 item - Add
jQuery.validator.addMethod("itemcheck",
    function(value, element){

        //Test
        console.info("item 1 value: " + $("#cboAddItem1").val());

        if (($("#cboAddItem1").val() === null) && ($("#cboAddItem2").val() === null) &&
            ($("#cboAddItem3").val() === null) && ($("#cboAddItem4").val() === null) &&
            ($("#cboAddItem5").val() === null) && ($("#cboAddItem6").val() === null))
        {
            return false;
        }

        return true;
    },
    "Custom item checker" );

// Custom Rule to require at least 1 item - Edit
jQuery.validator.addMethod("itemCheckEdit",
    function(value, element){

        //Test
        console.info("item 1 value: " + $("#cboEditItem1").val());

        if (($("#cboEditItem1").val() === null) && ($("#cboEditItem2").val() === null) &&
            ($("#cboEditItem3").val() === null) && ($("#cboEditItem4").val() === null) &&
            ($("#cboEditItem5").val() === null) && ($("#cboEditItem6").val() === null))
        {
            return false;
        }

        return true;
    },
    "Custom item checker" );
