/**
 * Description:
 * Simple program to convert 24hour format time to text.
 * Input:
 * One - expects time in the format 00:00 - 23:59 (validates the input)
 * To execute, just open the ClockInWords html file in browser
 * Examples:
 * Input    Output
 * 00:00    00:00 is midnight
 * 16:25    16:25 is nearly half past four
 * 10:01    10:01 is one past ten
 * 11:58    11:58 is two to noon
 * @Author  Deepak Uppal
 */

(function ($) {
    var timeArr, minsInput, hoursInput;
    var minsMap = {
         0:"",
         1:"one",
         2:"two",
         3:"three",
         4:"four",
         5:"five",
         6:"six",
         7:"seven",
         8:"eight",
         9:"nine",
         10:"ten",
         11:"eleven",
         12:"twelve",
         13:"thirteen",
         14:"fourteen",
         15:"quarter",
         16:"sixteen",
         17:"seventeen",
         18:"eighteen",
         19:"nineteen",
         20:"twenty",
         30:"half"
    };

    var hoursMap = {
         0:"midnight",
         1:"one",
         2:"two",
         3:"three",
         4:"four",
         5:"five",
         6:"six",
         7:"seven",
         8:"eight",
         9:"nine",
         10:"ten",
         11:"eleven",
         12:"noon",
         13:"one",
         14:"two",
         15:"three",
         16:"four",
         17:"five",
         18:"six",
         19:"seven",
         20:"eight",
         21:"nine",
         22:"ten",
         23:"eleven",
         24:"midnight"
     };

    function proximityMins(minutes) {
        //get nearly or just after proximity text
         if (minutes>20 && minutes<30) {
             return " nearly ";
         } else if(minutes>30 && minutes<40) {
             return " just after ";
         } else {
             return "";
         }
     }

    function getMinsRep(mins) {
        var finalString;
        var evalMins;

        finalString = "";
        evalMins=mins;
        if (evalMins > 30) {
            evalMins = 30 - (evalMins - 30);
        }
        if (mins>20 && mins<40) {
            //print proximity mins "nearly" or "just after" if the minutes input are +/-10 minutes of 30
            finalString = finalString + proximityMins(mins) + " "  + minsMap["30"] + " " + getToOrPast(mins);
        }  else {
            finalString = minsMap[evalMins] + " " + getToOrPast(mins);
        }
        return finalString;
      }

      function getToOrPast(minutes) {
        //function to get "past" or "to" in the final output
        var result;
        result="";
        if (minutes >= 1 && minutes <= 39) {
            result = "past ";
        } else if (minutes >= 40 && minutes <=59) {
            result = "to ";
        }
        return result;
      }

      function getHourRep(hours,minutes) {
        //get the hour representation of the input integer hour
        hours = (minutes >= 40) ? ++hours : hours;
        return hoursMap[hours];
      }

      function validateTime(timeString) {
        return (/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).test(timeString);
      }

      $.fn.clockInWords = function (timeString) {
        var out;
        var time;

        if (validateTime(timeString)) {
            timeArr = timeString.split(":");
            hoursInput = parseInt(timeArr[0], 10);
            minsInput = parseInt(timeArr[1], 10);

            out = timeString + " is " + getMinsRep(minsInput) + getHourRep(hoursInput,minsInput);
        } else {
            out = "Invalid Time - must be format 00:00-23:59";
        }

        this.html(out);
      };

 })(jQuery);