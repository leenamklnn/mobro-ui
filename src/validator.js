class Validator {

  validateInputs(inputData) {
    let errorMsg = "";
    if(!inputData.name) {
      errorMsg +="Please enter name of the movie.\n"
    }
    if(inputData.year.toString().match(/[^0-9]/g)) {
      errorMsg +="Year must be a number.\n"
    }
    if(!inputData.genres) {
      errorMsg +="Please enter genre(s).\n"
    }
    if(inputData.ageLimit.toString().match(/[^0-9]/g)) {
      errorMsg +="Age limit must be a number.\n"
    }
    if(inputData.rating.toString().match(/[^0-9]/g)) {
      errorMsg +="Rating must be a number.\n"
    }
    if(!inputData.director) {
      errorMsg +="Please enter name of the director.\n"
    }
    if(!inputData.synopsis) {
      errorMsg +="Please enter synopsis.\n"
    }
    if(errorMsg.length === 0){
      return true;
    } else {
      alert(errorMsg);
      return false;
    }
  }
}

export default Validator;
