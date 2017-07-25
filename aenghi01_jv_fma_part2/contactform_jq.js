$(document).ready(function() {
    addPlaceholder(); //place input hit text
    $('#fname').focus(); //set focus on the first name field
    switchToolTip(); //activate tool tip icon
    $('#contactform').validate({ //start contact form validation
        rules: {
            //set the required fields 
            fname: {
                required: true,
                nameChar: true
            },
            lname: {
                required: true,
                lnameChar: true
            },
            HAN: {
                required: true,
                hanNumber: true
            },
            email: {
                required: true,
                email: true
            },
            tnumber: {
                telNumber: true
            }
        },
        messages: {
            //error messages to be displayed
            fname: {
                required: "* Please enter a first name.",
                minlength: "* Your first name must consist of at least two characters."
            },
            lname: {
                required: "* Please enter a last name.",
                minlength: "* Your last name must consist of at least two characters."
            },
            HAN: {
                required: "* Please enter a HAN number.",
            },
            email: {
                required: "* Please enter an email address.",
                email: "* Your email address must be valid."
            }
        }

    });
});

/*
Creation of custom method for the validation of a ZHA number
*param input from user
@return boolean
*/

jQuery.validator.addMethod("hanNumber", function(value) {
    return (/ZHA\d{6}$/.test(value));
}, "* The HAN number starts with ZHA followed by six digits.");

/*
Creation of custom method for the validation of first name input
*param input from user
@return boolean
*/

jQuery.validator.addMethod("fnameChar", function(value) {
    return (/^[A-Za-z]{2,}$/.test(value));
}, "* This field can not contain numbers or other characters.");


/*
Creation of custom method for the validation of last name input
*param input from user
@return boolean
*/

jQuery.validator.addMethod("lnameChar", function(value) {
    return (/^[-A-Za-z]{2,}$/.test(value));
}, "* This field can not contain numbers or other characters.");


/*
Creation of custom method for the validation of a generic UK land-line telephone number
*param input from user
@return boolean
*/

jQuery.validator.addMethod("telNumber", function(value, element) {
    return this.optional(element) || /020\d{8}$| /.test(value);
}, "* A UK telephone number starts with 020.");


/*
Function to display the tool tip next to the Health Authority field
@param none
@return none
*/

function switchToolTip() {
    $('#questionmark').mouseover(function() {
        $('#tooltip').show();
    }).mouseout(function() {
        $('#tooltip').hide();
    });
}

/*
Function to display related hint text in the input fields
@param none
@return none
*/

function addPlaceholder() {
    var ids = ["#fname", "#lname", "#HAN", "#email", "#tnumber"]; //array containing the HTML id identifiers
    var hints = ["e.g John", "e.g Doe", "e.g. ZHA346783", "e.g. johndoe@email.com", "Optional"]; //array containing the text hint to be displayed

    for (var i = 0; i < ids.length; i++) {
        createPlaceholder(ids[i], hints[i]);
    }
}

/*
Function create a placeholder attribute to the input fields
@param input id
@param hint text 
@return none
*/

function createPlaceholder(id, content) {
    $(id).focusin(function() {
        $(this).attr("placeholder", " "); //set the placeholder attribute to empty string
    }).focusout(function() {
        $(this).attr("placeholder", content); //set the placeholder attribute to text hint
    }).focusout();

}