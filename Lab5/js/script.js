document.getElementById('sendButton').addEventListener('click', userForm);

function userForm() {
    // Gather user information
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const membership = document.querySelector('input[name="membership"]:checked').value;

    // Output user information
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
        <p>Full Name: ${firstName} ${lastName}</p>
        <p>Email: ${email}</p>
        <p>Address: ${address}</p>
        <p>City: ${city}</p>
        <p>Province: ${province}</p>
        <p>Membership: ${membership}</p>
    `;
}



//? Listen if the user press "Enter" and run the function automatically
if (document.location.pathname.endsWith("/excel.html")) {
    document.getElementById("numbers").addEventListener("keydown", function (event) { if (event.key == "Enter") myExcelFuns() })
}

function myExcelFuns() {
    console.info("Submit - Excel")

    //? Check the input
    if (isValidNumberStr('numbers')) {
        resetErrorsExcel()

        let numbers = inputStringToArrayNumber('numbers')

        //? Run the selected function
        let result
        if (document.getElementById("sum").checked) {
            result = autoSum(numbers)
        } else if (document.getElementById("avg").checked) {
            result = average(numbers)
        } else if (document.getElementById("max").checked) {
            result = max(numbers)
        } else if (document.getElementById("min").checked) {
            result = min(numbers)
        } else {
            result = "Error"
        }

        //? Put the result in the #output
        document.getElementById("result").value = result
    } else {
        displayErrorsExcel()
    }
}

function isValidNumberStr(id) {
    //? Get the string of the input
    let inputStr = document.getElementById(id).value

    //? Split into an array
    let inputArr = inputStr.split("")

    //? Add a new regex of the correct input
    let regexArray = ['0','1','2','3','4','5','6','7','8','9',' ','.',',']

    //? Check every character of the string
    inputArr.forEach(character => {
        //? Match the character with the regex
        if (!matchInArray(character, regexArray)) {
            //? Not correct
            return false
        }
    })

    let numbers = inputStringToArrayNumber(id)
    if (numbers.length > 0) {
        return true
    } else {
        return false
    }
}

function isValidNumberStrDisplay(id) {
    if (isValidNumberStr(id)) {
        resetErrorsExcel()
    } else {
        displayErrorsExcel()
    }
}

function inputStringToArrayNumber(id) {
    //? Get the String value of the input
    let numberStr = document.getElementById(id).value

    //? Transform the String into an Array using the "Space" to cut elements
    let numberArr = numberStr.split(" ")

    //? Create an Array of Number with the old one
    let numbers = new Array()
    numberArr.forEach(element => {
        //? Verify if the element is not null
        if (element != null && element != "") {
            let number = Number(element)
            //? All String who are not a Number is transform to NaN
            if (!isNaN(number)) {
                //? Add all the real Number
                numbers.push(number)
            }
        }
    })

    return numbers;
}

function matchInArray(string, array) {
    //? Check if the string is inside the array
    for (let i = 0; i < array.length; i++) {
        if (string.match(array[i])) {
            return true
        }
    }
    return false
}

function displayErrorsExcel() {
    //? Display error
    document.getElementById("numbers").classList.add("error-input")
    document.getElementById("result").value = "Wrong input!"

}

function resetErrorsExcel() {
    //? Remove error
    document.getElementById("numbers").classList.remove("error-input")
}

function autoSum(array) {
    //? Sum all the elements inside the Array
    let sum = 0
    array.forEach(element => {
        sum += element
    });
    return sum
}

function average(array) {
    //? Calculate the average of the Array
    let sum = 0
    let length = 0
    array.forEach(element => {
        sum += element
        length++
    });
    return sum/length
}

function max(array) {
    //? Find the max of the Array
    return Math.max(...array)
}

function min(array) {
    //? Find the min of the Array
    return Math.min(...array)
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}