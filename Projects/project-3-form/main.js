"use strict";

function calculateSunrise(year, month, day, lat, lng, localOffset, daylightSavings, sunrise) {

    const ZENITH = -0.83

    //1. first calculate the day of the year
    var N1 = Math.floor(275 * month / 9);
    var N2 = Math.floor((month + 9) / 12);
    var N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3));
    var N = N1 - (N2 * N3) + day - 30;

    //2. convert the longitude to hour value and calculate an approximate time
    var lngHour = lng / 15.0;
    var t = N + ((6 - lngHour) / 24);

    //3. calculate the Sun's mean anomaly   
    var M = (0.9856 * t) - 3.289;

    //4. calculate the Sun's true longitude
    var L = (M + (1.916 * Math.sin((Math.PI / 180) * M)) + (0.020 * Math.sin(2 * (Math.PI / 180) * M)) + 282.634) % (360.0);

    //5a. calculate the Sun's right ascension      
    var RA = (180 / Math.PI * Math.atan(0.91764 * Math.tan((Math.PI / 180) * L))) % (360.0);

    //5b. right ascension value needs to be in the same quadrant as L   
    var Lquadrant  = Math.floor(L / 90) * 90;
    var RAquadrant = Math.floor(RA / 90) * 90;
    RA = RA + (Lquadrant - RAquadrant);

    //5c. right ascension value needs to be converted into hours   
    RA = RA / 15;

    //6. calculate the Sun's declination
    var sinDec = 0.39782 * Math.sin((Math.PI / 180) * L);
    var cosDec = Math.cos(Math.asin(sinDec));

    //7a. calculate the Sun's local hour angle
    var cosH = (Math.sin((Math.PI / 180) * ZENITH) - (sinDec * Math.sin((Math.PI / 180) * lat))) / (cosDec * Math.cos((Math.PI / 180) * lat));

    //7b. finish calculating H and convert into hours
    // Rising time.
    if (sunrise === true) {
        var H = 360 - (180 / Math.PI) * Math.acos(cosH);
    }
    // Setting time.
    else {
        var H = (180 / Math.PI) * Math.acos(cosH);
    }

    H = H / 15;

    //8. calculate local mean time of rising/setting      
    var T = H + RA - (0.06571 * t) - 6.622;

    //9. adjust back to UTC
    var UT = (T - lngHour) % (24.0);

    //10. convert UT value to local time zone of latitude/longitude
    var localT = (24 + (UT + localOffset + daylightSavings)) % (24.0);

    var hours = Math.floor(localT)
    var minutes = Math.round((localT % 1) * 60);
    
    if (hours < 10) {
        var hourRes = "0" + hours.toString();
    }
    else {
        var hourRes = hours.toString();
    }

    if (minutes < 10) {
        var minRes = "0" + minutes.toString();
    }
    else {
        var minRes = minutes.toString();
    }

    return hourRes + ":" + minRes;
}

function calc() {
    var dateInput = document.getElementById("date").value;
    var date = new Date(dateInput);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (document.getElementById('sunset').checked) {
        var sunrise = false;
    }
    else {
        var sunrise = true;
    }

    if (document.getElementById("dst").checked) {
        var dst = 1;
    }
    else {
        var dst = 0;
    }

    var utcOffset = parseInt(document.getElementById("utcOffset").value);
    var lat = parseFloat(document.getElementById("lat").value);
    var lon = parseFloat(document.getElementById("lon").value);
    var result = calculateSunrise(year, month, day, lat, lon, utcOffset, dst, sunrise);

    //alert(result);
    document.getElementById("result").value = result;
}

document.addEventListener("DOMContentLoaded", (Event) => {
    const saveFormData = () => {
        var dateInput = document.getElementById("date").value;
        var date = new Date(dateInput);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (document.getElementById('sunset').checked) {
            var sunrise = false;
        }
        else {
            var sunrise = true;
        }

        if (document.getElementById("dst").checked) {
            var dst = 1;
        }
        else {
            var dst = 0;
        }

        var utcOffset = parseInt(document.getElementById("utcOffset").value);
        var lat = parseFloat(document.getElementById("lat").value);
        var lon = parseFloat(document.getElementById("lon").value);
        var result = calculateSunrise(year, month, day, lat, lon, utcOffset, dst, sunrise);
        var dateString = date.toISOString().substring(0,10);
        localStorage.setItem("formData", JSON.stringify({dateString, sunrise, dst, utcOffset, lat, lon, result}));
    };

    const loadFormData = () => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const {dateString, sunrise, dst, utcOffset, lat, lon, result} = JSON.parse(savedData);

            document.getElementById("date").value = dateString;
            if (sunrise) {
                document.getElementById("sunrise").checked = true;
            }
            else {
                document.getElementById("sunset").checked = true;    
            }
            
            if (dst === 1) {
                document.getElementById("dst").checked = true;
            }
            else {
                document.getElementById("dst").checked = false;
            }
            
            document.getElementById('utcOffset').value = utcOffset || '';
            document.getElementById("lat").value = lat || '';
            document.getElementById("lon").value = lon || '';
            document.getElementById("result").value = result || '';
        }
    };

    loadFormData();

    document.getElementById('date').addEventListener('input', saveFormData);
    document.getElementById('sunset').addEventListener('input', saveFormData);
    document.getElementById('sunrise').addEventListener('input', saveFormData);
    document.getElementById('dst').addEventListener('input', saveFormData);
    document.getElementById('utcOffset').addEventListener('input', saveFormData);
    document.getElementById('lat').addEventListener('input', saveFormData);
    document.getElementById('lon').addEventListener('input', saveFormData);
    document.getElementById('result').addEventListener('input', saveFormData);

    document.getElementById('rst').addEventListener('click', () => {
        localStorage.removeItem('formData');
    });
})