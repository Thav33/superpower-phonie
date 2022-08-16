function startApp() {
  // Your entire app should not necessarily be coded inside this 
  // single function (though there's no penalty for that), 
  // so create and use/call additional functions from here

  // pls remove the below and make some magic in here!
  //   console.log('make magic in here!');

  //   const header = document.querySelector('h2');
  //   if (header) {
  //     header.textContent = 'make some magic here!!';
  //   }
  // };
  
  /**** Variable declarations */
let phoneInput = document.querySelector("#phonie");
let submitButton = document.querySelector("input[type='button']");
let displayImage = document.querySelector(".network-image img");
let smallIconDisplay = document.querySelector(".networkIcon");
let resultsHTML = document.getElementById("results");
let errorText = document.querySelector(".errorText");
let imagePath = "images/";
let result ="";
errorText.style.display = "";
/**** Variable declarations end*/

/**** List of networks defined as key of networks object */
let networks = {
    airtel: ["0907", "0708", "0802", "0902", "0812", "0808", "0701", "0901"],
    mtn: ["0803", "0816", "0903", "0810", "0806", "0703", "0706", "0813", "0814", "0906"],
    glo: ["0805", "0905", "0807", "0811", "0705", "0815"],
    etisalat: ["0909", "0908", "0818", "0809", "0817"],
}
/**** List of networks defined as key of networks object ends*/

/**** Combine all the numbers in each key of the network object */
    let data = [...networks.airtel, ...networks.mtn, ...networks.glo, ...networks.etisalat];
/**** Combine all the numbers in each key of the network object ends */

    /**** Autocomplete processing */
    phoneInput.oninput = function () {
        let results = [];
        const userInput = this.value;
        resultsHTML.innerHTML = "";
        if (userInput.length > 0) {
          results = getResults(userInput);
          resultsHTML.style.display = "block";
          for (let i = 0; i < results.length; i++) {
            resultsHTML.innerHTML += "<li>" + results[i] + "</li>";
          }
        }
      };
      function getResults(input) {
        const results = [];
        for (let i = 0; i < data.length; i++) {
          if (input === data[i].slice(0, input.length)) {
            results.push(data[i]);
          }
        }
        return results;
      }
      resultsHTML.onclick = function (event) {
        const setValue = event.target.innerText;
        phoneInput.value = setValue;
        this.innerHTML = "";
      };
/**** Autocomplete processing ends*/

/**** Validating number and displaying icon */
submitButton.addEventListener("click", (e)=>{
    errorText.innerHTML = " ";
    if(phoneInput.checkValidity() === false){
        let p = setInterval(()=>{
            errorText.innerHTML = "Please enter a valid airtel number";
            displayImage.style.display = "none";
            smallIconDisplay.style.setProperty("--icon-image", `none`);           
        }, 500);
        setTimeout(()=>{
            clearInterval(p)
            errorText.innerHTML = "";
        },4000)
        return false;
    }
    let inputValue = phoneInput.value;
    let networkArray = Object.keys(networks);

    for(let i=0; i < networkArray.length; i++){
        
        let check = networks[networkArray[i]];
        
        for (let j=0; j < check.length; j++){
            if(inputValue.startsWith(check[j])){
                errorText.innerHTML = "";
                displayImage.style.display = "inline-block";
                displayImage.setAttribute("src", `${imagePath}${networkArray[i]}.png`);
                smallIconDisplay.style.setProperty("--icon-image", `url(${imagePath}${networkArray[i]}-small.png)`);
                return result = "True";
            }
            else if("+234"+check[j].substring(1) || "234"+check[j].substring(1)){
                errorText.innerHTML = "";
                displayImage.style.display = "inline-block";
                displayImage.setAttribute("src", `${imagePath}${networkArray[i]}.png`);
                smallIconDisplay.style.setProperty("--icon-image", `url(${imagePath}${networkArray[i]}-small.png)`);
                return result = "True";
            }
        }
        //return result = "True";
    }
   if(result == "True"){
        displayImage.style.display = "none";
        smallIconDisplay.style.setProperty("--icon-image", `none`);
        errorText.innerHTML = "Invalid Phone Number";
   }
})
};
/**** Validating number and displaying icon ends*/




  // ======= DO NOT EDIT ============== //
  export default startApp;
  // ======= EEND DO NOT EDIT ========= //