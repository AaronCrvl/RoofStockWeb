export const dateDiffForProductExpireDate = (dateA : Date, dateB : Date) : Number => {
    // same year logic
    if(dateA.getFullYear() == dateB.getFullYear()) {
        var daysBetweenMonths = 0;
        const monthDiff = dateA.getMonth() - dateB.getMonth();      

        // diffferent months
        if(monthDiff > 0) { 
            daysBetweenMonths = 30 * monthDiff;
            return dateA.getDay() - dateB.getDay() + daysBetweenMonths;
        }
        // same month
        else return dateA.getDay() - dateB.getDay();
    }    
    // different year logic
    else {
        var yearsDiff = dateA.getFullYear() - dateB.getFullYear();
        // for more then one year send approximate date
        if(yearsDiff > 1)  return 365 * yearsDiff;  
        // one year difference      
        else {
            // months diff betwwen dateA and the rest of the year
            var finalOfYearA = new Date("December 31, ".concat(dateB.getFullYear().toString(), " 00:00:00"));                        
            var monthDiffA = dateA.getMonth() - finalOfYearA.getMonth(); 

            // months diff betwwen start of the year and dateB
            var finalOfYearB = new Date("January 1, ".concat(dateA.getFullYear().toString(), " 00:00:00"));            
            var monthDiffB = finalOfYearB.getMonth() - dateA.getMonth();

            var daysBetweenMonths = 0;
            daysBetweenMonths = (30 * monthDiffA) + (30 * monthDiffB);   
            return dateA.getDay() - dateB.getDay() + daysBetweenMonths;
        } 
    }
}

export const formatdateToInput = (date : string) => {
    if(date){
        return new Date(date)
        .getFullYear()
        .toString()
        .concat(
          "-",
          String(new Date().getMonth() + 1).padStart(2, "0"),
          "-",
          String(new Date().getDate()).padStart(2, "0")
        );    
    }
    
    return new Date()
    .getFullYear()
    .toString()
    .concat(
      "-",
      String(new Date().getMonth() + 1).padStart(2, "0"),
      "-",
      String(new Date().getDate()).padStart(2, "0")
    );
};