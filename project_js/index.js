const country = document.getElementById('input');
const button = document.getElementById('search');
const year = document.getElementById('year');
const month = document.getElementById('month');

// Clear the information in the both forms.
function clearForm(){
    form1.reset();
    form2.reset();
    document.getElementById('holidaysTitle').innerHTML = "";
    document.getElementById('holidaysList').innerHTML = "";
    form1.input.focus();
}

// Clear the Date information.
function clearDate(){
    form2.reset();
    form2.year.focus();
}

// Activates when the search button for countries is pressed.
function searchInfo(){
    if(country.value == ""){
        alert("Please input a name of a country.");
        form1.input.focus();
    }
    else{
        const url = "https://restcountries.com/v3.1/name" + country.value + "?fullText=true";
        sendHttpRequestCountry('GET', url);
    }
}

// function that uses XMLHttpRequest to get data provided by URL.
function sendHttpRequestCountry(method, url) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json'
    xhr.onload = () => {
      var data = xhr.response;
      jsonData = data[0];
      showCountryInfo(jsonData);
    };
    xhr.send();
}

// Activates when the search button for dates is pressed.
function searchHolidays(){
    if(year.value == ""){
        alert("Please input a year after 1989.")
        form2.year.focus();
    }
    else{
        //https://restcountries.eu/rest/v2/name/
        $.getJSON("https://restcountries.com/v3.1/name" + country.value + "?fullText=true", function(data){
            var countryCode = data[0].alpha;
            var url = "";
            if (month.value == 0){
                url = "https://calendarific.com/api/v2/holidays?&api_key=e9c5a4a0d893f4a09aed99d3541cd56c16bfca4a&country=" + countryCode + "&year=" + year.value;
            }
            else{
                url = "https://calendarific.com/api/v2/holidays?&api_key=e9c5a4a0d893f4a09aed99d3541cd56c16bfca4a&country=" + countryCode + "&year=" + year.value + "&month=" + month.value;
            }
            sendHttpRequestHolidays('GET', url);  
        });
    }
}

// function that uses XMLHttpRequest to get data provided by URL.
function sendHttpRequestHolidays(method, url) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json'
    xhr.onload = () => {
      var data = xhr.response;
      jsonData = data;
      showHolidaysInfo(jsonData);
    };
    xhr.send();
}

//Printing the information about the selected country.
function showCountryInfo(data){
    //console.log(data);
    document.getElementById("countryName").innerHTML = data.name;
    var countryCode = data.alpha;
    var flag = "https://restcountries.com/data/" + countryCode.toLowerCase() + ".svg";
    $('#flag').attr('src', flag);

    //Some countries may have multiple official languages
    var lang = "";
    for (var i =0; i<data.languages.length; i++){
        lang = lang + data.languages[i].name + " "
    }

    var info = document.getElementById("countryInfo");
    info.innerHTML = `  
    <p>
    <strong>Native name:</strong>
    ${data.nativeName}
    </p>
    <p>
    <strong>Region:</strong>
    ${data.region}
    </p>
    <p>
    <strong>Subregion:</strong>
    ${data.subregion}
    <p>
    <p>
    <strong>Capital:</strong>
    ${data.capital}
    </p>
    <p>
    <strong>Population:</strong>
    ${data.population}
    </p>
    <p>
    <strong>Languages:</strong>
    ${lang}
    </p>             
    <p>
    <strong>Currency:</strong>
    ${data.currencies[0].name}
    </p>
    <p>
    <strong>Country's code:</strong>
    ${countryCode}
    </p>
    `;
}

//Printing holidays for the selected country and date.
function showHolidaysInfo(data){
    holidays = data.response.holidays;
    //console.log(holidays);
    //console.log(holidays[0].country.name);
    document.getElementById("holidaysTitle").innerHTML = "Holidays in " + holidays[0].country.name + " for the " + year.value + " year:";
    var holidaysInfo = document.getElementById("holidaysList");
    holidaysInfo.innerHTML = '';
       
    for(var i=0; i<holidays.length; i++){
        var holiday = document.createElement('div');
        holiday.innerHTML = `
        <p>
        <strong>Date:</strong>
        ${holidays[i].date.iso}
        </p>
        <p>
        <strong>Name:</strong>
        ${holidays[i].name}
        </p>
        <p>
        <strong>Description:</strong>
        ${holidays[i].description}
        <p>
        <p>
        <strong>Type:</strong>
        ${holidays[i].type}
        </p><br>
        `;
        holidaysInfo.appendChild(holiday);
    }
}
