"use strict";

function calculateSunset(year, month, day, lat, lng, localOffset, daylightSavings, sunRise) {

    const ZENITH = -0.83
    /*
    localOffset will be <0 for western hemisphere and >0 for eastern hemisphere
    daylightSavings should be 1 if it is in effect during the summer otherwise it should be 0
    */
    //1. first calculate the day of the year
    var N1 = Math.floor(275 * month / 9);
    var N2 = Math.floor((month + 9) / 12);
    var N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3));
    var N = N1 - (N2 * N3) + day - 30;

    //2. convert the longitude to hour value and calculate an approximate time
    var lngHour = lng / 15.0;
    if (sunRise === true) {
        var t = N + ((6 - lngHour) / 24);   // Rising time is desired:
    }     
    else {
        var t = N + ((18 - lngHour) / 24)   // Setting time
    }

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
    /*   
    if (cosH >  1) 
    the sun never rises on this location (on the specified date)
    if (cosH < -1)
    the sun never sets on this location (on the specified date)
    */

    //7b. finish calculating H and convert into hours
    // If rising time is desired.
    // var H = 360 - (180/PI)*acos(cosH);
    // if setting time is desired.
    var H = (180 / Math.PI) * Math.acos(cosH);
    H = H / 15;

    //8. calculate local mean time of rising/setting      
    var T = H + RA - (0.06571 * t) - 6.622;

    //9. adjust back to UTC
    var UT = (T - lngHour) % (24.0);

    //10. convert UT value to local time zone of latitude/longitude
    return UT + localOffset + daylightSavings;
}

function printSunrise() {
    // latitude =  40.712742
    // longitude = -74.013382
    var localT=(24 + calculateSunset(2024, 5, 16, 40.712742, -74.013382, -5, 1, false)) % (24.0); //in printSunrise function
    var hours;
    var minutes = (localT % hours) * 60;
    // printf("%.0f:%.0f\n",hours,minutes);
    console.log(hours + ":" + minutes)
}

console.log(printSunrise());