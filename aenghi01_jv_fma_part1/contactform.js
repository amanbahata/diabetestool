/*
function to initialize the functions displayhints(,switchToolTip() and checkForm()
@param none
@return none
*/
function init() {
    displayHints();
    switchToolTip();
    checkForm();
}

/*
Function to validate the inputs of the contact form
@param none
@return boolean
*/

function checkForm() {
    document.getElementById("contactform").onsubmit = function() {
        var allowsubmit = true;

        //fetch all the input values from the form and store in variables

        var firstName = document.getElementById("fname").value;
        var lastName = document.getElementById("lname").value;
        var title = getValue("title");
        var healthAuth = document.getElementById("HAN").value;
        var email = document.getElementById("email").value;
        var telNumber = document.getElementById("tnumber").value;

        var errorContainer = []; //array to contain the various error messages that may arise

        //prepare regular expressions to be used in validation
        var firstNameRegEx = /^[A-Za-z]{2,}$/;
        var lastNameRegEx = /^[-A-Za-z]{2,}$/;
        var healthAuthRegEx = /ZHA\d{6}$/;
        var emailRegEx = /^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/;
        var telNumberRegEx = /020\d{8}$| /;

        //validate user input      
        if (firstName === "" || firstName === "e.g. John" || !firstNameRegEx.test(firstName)) {
            errorContainer.push("fnameErr");
            allowsubmit = false;
        } else {
            document.getElementById("fnameErr").style.display = "none";
        }
        if (lastName === "" || lastName === "e.g. Doe" || !lastNameRegEx.test(lastName)) {
            errorContainer.push("lnameErr");
            allowsubmit = false;
        } else {
            document.getElementById("lnameErr").style.display = "none";
        }
        if (healthAuth === "" || healthAuth === "e.g. ZHA346783" || !healthAuthRegEx.test(healthAuth)) {
            errorContainer.push("HANErr");
            allowsubmit = false;
        } else {
            document.getElementById("HANErr").style.display = "none";
        }
        if (email === "" || email === "e.g. johndoe@email.com" || !emailRegEx.test(email)) {
            errorContainer.push("emailErr");
            allowsubmit = false;
        } else {
            document.getElementById("emailErr").style.display = "none";
        }

        if (telNumber === "" || telNumber === "Optional") {
            document.getElementById("tnumberErr").style.display = "none";
        } else {
            if (!telNumberRegEx.test(telNumber)) {
                errorContainer.push("tnumberErr");
                allowsubmit = false;
            }
        }

        if (allowsubmit) {
            alert("Thank you for submitting your details. A member of HAD Team will be in contact with you.");
        } else {
            for (var i = 0; i < errorContainer.length; i++) {
                displayError(errorContainer[i]);
            }
        }
        return allowsubmit;
    };
}

/*
Function to show and hide information about the ZHA number when the mouse is placed on the question mark image
@param none
@return none
*/


function switchToolTip() {
    //show information box when the mouse is placed on top of the question mark image
    document.getElementById('questionmark').onmouseover = function() {
        var toolTip = document.getElementById('tooltip');
        toolTip.style.display = 'block';
    };
    //hide information box when mouse is moved away from question mark image
    document.getElementById('questionmark').onmouseout = function() {
        var toolTip = document.getElementById('tooltip');
        toolTip.style.display = 'none';
    };
}

/*
Function to retrieve the value of the user selection when form is submitted
@param id of the radio button
@return value of the selected button
*/

function getValue(selected) {
    var opt = document.getElementById(selected);
    var userOpt = opt.options[opt.selectedIndex].value;
    return userOpt;
}

/*
Function to display error messages
@param element id
@return none
*/

function displayError(elementId) {
    document.getElementById(elementId).style.display = "inline";
}

/*
Function to display hint messages in the user input moxes
@param none
@return none
*/

function displayHints() {

    var id = ["fname", "lname", "HAN", "email", "tnumber"];
    var text = ["e.g. John", "e.g. Doe", "e.g. ZHA346783", "e.g. johndoe@email.com", "Optional"];

    for (var i = 0; i < id.length; i++) {
        hint(id[i], text[i]);
    }
    document.getElementById("fname").focus();
}

/*
Function to turn off hints when input box is selected and on of not selected
@param element id, text to be displayed
@return none
*/

function hint(elId, text) {
    var defaultText = text;
    var txtElem = document.getElementById(elId);
    txtElem.value = defaultText;
    txtElem.style.color = "#A8A8A8";
    txtElem.style.fontStyle = "italic";
    txtElem.onfocus = function() {
        if (this.value === defaultText) {
            this.value = "";
            this.style.color = "#000";
            this.style.fontStyle = "normal";
        }
    };
    txtElem.onblur = function() {
        if (this.value === "") {
            this.value = defaultText;
            this.style.color = "#A8A8A8";
            this.style.fontStyle = "italic";
        }
    };
}

window.onload = init;