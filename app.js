window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start");
const end_button = document.getElementById("end");

let p = document.createElement("p");
transcript_element.appendChild(p);


recognition.addEventListener("result", (e) =>{
    const transcript = Array.from(e.results)
    .map(result => result [0])
    .map(result => result.transcript)
    .join("");
    p.textContent = transcript;
    if(e.results[0].isFinal){
        p = document.createElement("p")
        p.textContent = transcript;
        transcript_element.appendChild(p);
        p.textContent = "";

        if(transcript.includes("open")){
            let website_name=transcript.replace("open ")
           // website_name=website_name.replace("undefined");
            my_speech_creation('opening '+website_name.substring(9)+'  kindly wait for a moment.')
            website_name=website_name.toLocaleLowerCase();
            //website_name=website_name.replace("undefined");
            //console.log("https://www."+website_name.substring(9)+".com");
           
            //console.log(website_name);
            
            window.open("https://www."+website_name.substring(9)+".com")
        }

        else if(transcript.includes("hello")){
            my_speech_creation("Hello , How may I help you?");
        }

        else if(transcript.includes("how are you")){
            my_speech_creation("I am fine ,what about you");
        }
        else if(transcript.includes("who are you")){
            my_speech_creation("I am TIMTIM ,I am here to assist you");
        }
        else if(transcript.includes("what")){
            if(transcript.includes("you")){
                my_speech_creation("I am TIMTIM ,i am here to assist you");
            }
           // else {
                //wikipedia section

            //}
        }

        else if(transcript.includes("pet")){
            window.open('../ainak/index.html')
        }

        else if(transcript.includes("date")){
            var d = new Date();
            var n=d.getDate();
              n = n.toString();
            //n=n+m;
            const month = new Array(12);
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            

            let mn = month[d.getMonth()];
            let yr=d.getFullYear();

            n=n+'of'+mn+yr
            console.log(mn);

            my_speech_creation(n);
        }

        else if(transcript.includes("day") || transcript.includes("de")){
            var d=new Date();

            const week = new Array(7);
            week[1] = "Monday";
            week[2] = "Tuesday";
            week[3] = "Wednesday";
            week[4] = "Thursday";
            week[5] = "Friday";
            week[6] = "Saturday";
            week[0] = "Sunday";

            let day=week[d.getDay()];

            my_speech_creation(day);
            

        }

        else if(transcript.includes("read")){
            window.open("../ainak/imagetotext.html");
        }

        else{
            my_speech_creation("Could not understand please try again.")
        }

        }

});

function greeting(){
    alert("Have A Good Day !")
}



function my_speech_creation(myspeech){
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";
    //voices=speech.getVoices();

    //console.log(voices);

    //speech.voice=voices[2];
    speech.rate=1.4;

  // Set the text property with the value of the textarea
  speech.text = myspeech;
  speech.pitch=0.3;

  // Start Speaking
  
  window.speechSynthesis.speak(speech);
  //recognition.stop();
//recognition.start();

}


recognition.addEventListener("end", ()=>{
    end_button.disabled = false;
    talk_button.disabled = true;
});
talk_button.addEventListener("click", () =>{
    end_button.disabled = false;
    talk_button.disabled = true;
    recognition.start();
});
end_button.addEventListener("click", () => {
    end_button.disabled = true;
    talk_button.disabled = false;
    recognition.stop();
});
