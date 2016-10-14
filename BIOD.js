// Data Input and Output ( DIO )

includes = function(string) {
	if (this.split(string).join("")==string) {
		return false;
	} else {
		return true;
	}
}
function getBaseURL() {
    var url = window.location.href;
    return url.replace("?", "") !== url ? url.substring(0, url.indexOf("?")) : url;
}
//Submit form data to the URL (GET method)
function submitForm(form) {
    var URL = getBaseURL() + "?";
    for (var key in form) {
        URL += key + "=" + form[key] + "&";
    }
    URL = encodeURIComponent(URL.substring(0, URL.length - 1));
    window.open(URL, "_self");
}
function getFormValues(ids) { //returns an object of form elements with the IDs as property names.
    ids = ids.split(",");
    var response = {};
    for (var i = 0; i < ids.length; i++) {
        response[ids[i]] = document.getElementById(ids[i]).value;
    }
    return response;
}
function getWholeForm(form) { //returns an object of form elements with names (or IDs) as property names and the values of the elements as the values of the properties.
        var response = {};
        var elements = document.getElementById(form).elements;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].tagName == "INPUT" || elements[i].tagName == "SELECT" || elements[i].tagName == "TEXTAREA") {
                var backup = elements[i].tagName + Math.floor(Math.random() * 500);
                var title = elements[i].name != "" ? elements[i].name : (elements[i].id != "" ? elements[i].id : backup);
                response[title] = elements[i].value;
            }
        }
        return response;
    }
    //Example: validateForm(getWholeForm("myform"),["password==passwordConfirm","email.includes('@')"]);
function validateForm(Form, expressions) { // the expressions parameter is an array of expressions as strings. In order to grab values from the form use the folowwing syntax: Form.PROPERTY
    var valid;
    if (Form !== null && Form !== undefined) {
        for (var i = 0; i < expressions.length; i++) {
            if (eval(expressions[i])) {
                valid = true;
                continue;
            } else {
                valid = false;
                break;
            }
        }
        return valid;
    }
}
//Retreive form data from the URL
//Simbol should either be ? or #
var GET = function(simbol) {
    var w = window;
    var G = {};
    var href = w.location.href;
    if (href.split(simbol).join("") != href) {
        var data = href.substring(href.indexOf(simbol) + 1, href.length);
        data = decodeURIComponent(data);
        data = data.split("&");
        for (var i = 0; i < data.length; i++) {
            var variable = data[i].split("=")[0];
            var value = data[i].split("=")[1];
            G[variable] = value;
        }
    }
    return G;
};

//element: dataType=DOMElement description "The element that you want to push the data to"
//data: dataType=Array (an array of objects) description "The data you want to cycle through"
//markup: dataType=String description "The markup you want to repeatedly paste into the elmement.
// In the string use [-property-] anywhere in the markup to output that property for the current
// object into the markup"
var pushData = function(element, data, markup) {
    if (markup=="auto") markup = element.innerHTML;
    if (typeof element == 'array') {
        for (var i = 0; i < element.length; i++) {
        for (var x = 0; x < data.length; x++) {
            var temp = markup;
            for (var prop in data[x]) {
                var obj = data[w];
                temp = temp.split("[-"+prop+"-]").join(obj[prop]);
            }
            element[i].innerHTML += temp;
        }
        }
    } else {
        for (var x = 0; x < data.length; x++) {
        var temp = markup;
        for (var prop in data[x]) {
            var obj = data[x];
            temp = temp.split("[-"+prop+"-]").join(obj[prop]);
        }
        element.innerHTML += temp;
        }
    }
}

var overwriteWithData = function(element, data, markup) {
    if (markup=="auto") markup = element.innerHTML;
		element.innerHTML = "";
    if (typeof element == 'array') {
        for (var i = 0; i < element.length; i++) {
        for (var x = 0; x < data.length; x++) {
            var temp = markup;
            for (var prop in data[x]) {
                var obj = data[w];
                temp = temp.split("[-"+prop+"-]").join(obj[prop]);
            }
            element[i].innerHTML += temp;
        }
        }
    } else {
        for (var x = 0; x < data.length; x++) {
        var temp = markup;
        for (var prop in data[x]) {
            var obj = data[x];
            temp = temp.split("[-"+prop+"-]").join(obj[prop]);
        }
        element.innerHTML += temp;
        }
    }
}


//use obj to reference the current object in the evaluations
function curateData(data, evaluations) {
		var result = new Array(), check = null;
		for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				for (var x = 0; x < evaluations.length; x++) {
					if (eval(evaluations[x]) {
						check = true;
						continue;
					} else {
						check = false;
						break;
					}
				}
				if (check==true) {
					result.push(obj);
				}
		}
		if (result.length < 1) {
				return false;
		}
		return result;
}
