/*
Function to process user selection 
@param none
@return none
*/

function checkForm() {

    document.getElementById("assessment").onsubmit = function() {
        if (document.getElementById("submit").value === "Calculate") {
            var age = getValue(document.getElementsByName("age"));
            var bmi = getValue(document.getElementsByName("bmi"));
            var familyHistory = getValue(document.getElementsByName("familyHistory"));
            var diet = getValue(document.getElementsByName("diet"));

            var details = [age, bmi, familyHistory, diet];

            var score = calculateScore(details);
            var risk = riskFactor(score);

            message(risk, details);
        }
        return false;
    };

}

/*
Function to find the questions with an answer equal or greater than ten
@param array variable containing the selected element values
@return string
*/

function findGreater(details) {
    var cont1 = ["age", "BMI", "family history", "diet"];
    var cont2 = [];
    for (var i = 0; i < details.length; i++) {
        if (details[i] >= 10) {
            cont2.push(cont1[i]);
        }
    }
    if (cont2.length > 0) {
        if (cont2.length > 1) {
            var lastEl = cont2.pop();
            return "Your main risk factors are your " + cont2.toString() + " and your " + lastEl;
        } else
            return "Your main risk factor is your " + cont2.toString();
    }
    return cont2.toString();

}

/*
Function to display a message based on the level of risk
@param riskLevel, details
@return none
*/

function message(riskLevel, details) {
    // select the id that will display the message
    var x = document.getElementById("message");
    while (x.hasChildNodes()) {
        x.removeChild(x.firstChild);
    }
    x.style.display = "block";
    var finalMessage = "";
    createTitle(x, "h3", "Your Result");

    if (riskLevel === "lowRisk") {
        finalMessage = 'Your results show that you currently have low risk of developing diabetes. However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.';
        createTitle(x, "p", finalMessage);
    } else if (riskLevel === "mediumRisk") {
        finalMessage = "Your results show that you currently have a medium risk of developing diabetes. For more information on you risk factors,and what to do about them, please visit our diabetes advice website at ";
        createTitle(x, "p", finalMessage);
    } else if (riskLevel === "highRisk") {
        finalMessage = "Your results show that you currently have a HIGH risk of developing diabetes." + findGreater(details) + ". We advise that you contact the Health Authority to discuss your risk factors as soon as you can. Please fill in our ";
        createTitle(x, "p", finalMessage);
    }

    if (riskLevel === "mediumRisk") {
        createLink("http://www.zha.org.zd", "#");
    }
    if (riskLevel === "highRisk") {
        createLink("contact form", "contactform.html");
        createTitle(x.children[1], "p", " and a member of the Health Authority Diabetes Team will be in contact with you.");
        x.children[1].children[1].style.display = "inline";
    }
}

/*
Function to create element containing the message to display
@param element id, type of element to create, text message to show
@return none
*/

function createTitle(idElement, elementToCreate, text) {
    var resultTitle = document.createElement(elementToCreate);
    var resultText = document.createTextNode(text);
    resultTitle.appendChild(resultText);
    idElement.appendChild(resultTitle);

}

/*
Function to create a link 
@param url, redirection
@return none
*/

function createLink(url, redirect) {
    var link = document.createElement("a");
    link.href = redirect;
    link.innerHTML = url;
    var x = document.getElementById("message").children[1];
    x.appendChild(link);
}

/*
Function to extract the value of the selected radio button
@param possible answers
@return checked answer
*/

function getValue(selected) {
    for (var i = 0; i < selected.length; i++) {
        if (selected[i].checked) {
            return parseInt(selected[i].value, 10);
        }
    }
}

/*
Function to calculate the total
@param array containing all the value of the checked radion buttons
@return total 
*/

function calculateScore(details) {
    var total = 0;
    for (var i = 0; i < details.length; i++) {
        total += details[i];
    }
    return total;
}

/*
Function to calculate the risk factor
@param total score
@return risk factor
*/

function riskFactor(score) {
    var levels = ["lowRisk", "mediumRisk", "highRisk"];
    var message;
    if (score <= 15) {
        message = levels[0];
    } else if (score > 15 && score <= 25) {
        message = levels[1];
    } else
        message = levels[2];

    return message;
}

window.onload = checkForm;