generate.addEventListner('click',()=>{
    if (checkCount==0) 
    return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handSlider();
    }
    //  starting to generate newpassword
    console.log("starting the journy");
    password="";
    let funArr=[];
    if(uppercasecheck.checked)
    funArr.push(generateuppercase);

    if(lowercasecheck.checked)
    funArr.push(generatelowercase);

    if(numberscheck.checked)
    funArr.push(generateRandomNumber);

    if(symbolscheck.checked)
    funArr.push(generateSymbol);

    //complulsory addition
    for (let i = 0; i < funArrarr.length; i++) {
        password+= array[i]();
        
    }
    console.log("compulsory addition done")
    //remaining addition
    for (let i = 0; i <password-lengthfunArr.length; i++) {
        let randIndex=getRndInteger(0,funArr.length);
        console.log("randIndex"+randIndex);

        password+= funarr[randIndex]();
        
    }
    console.log('remaining addition done');
    //shuffle password
    password=shufflepassword(Array.from(password));
    console.log('shuffling done');
    //show in ui
    passwordDisplay.value=password;
    console.log("ui addition done");
    //calcstrength
    calStrength();
});