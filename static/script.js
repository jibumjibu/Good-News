let count = 0;

function typewriterEffect(strings, speed) {
  let container = document.querySelector('.chat-messages');
  if (!container) return;

  let index = 0;
  let charIndex = 0;
  function typeNext() {
      if (index < strings.length) {
          if (charIndex < strings[index].length) {
              container.innerHTML += strings[index].charAt(charIndex);
              charIndex++;
              setTimeout(typeNext, speed);
          } else {
              container.innerHTML += "<br>"; // Move to the next line
              charIndex = 0;
              index++;
              setTimeout(typeNext, speed * 2);
              if(index == strings.length){
                switch(strings){
                  case strings1: createButtons("Yes, I think so", "I'm not sure", strings); break;
                  case strings2a: createButtons("No, i'm good", "Yes", strings); break;
                  case strings2b: createButtons("Becasue I'm a good person", "Because I'm born again", strings); break;
                  case strings3: receiver(strings4, speed); break;
                  case strings4: receiver(strings5, speed); break;
                  case strings5: createButtons("Count myself in as saved", null, strings); break;
                  case strings6: createButtons("Count myself in as saved", null, strings); break;
                }
              }
          }
      }
  }
  typeNext();
}


function createButtons(buttonText1, buttonText2, strings) {

  const container = document.querySelector('.chat-input');
  // Create the first button
  let button1 = document.createElement('button');
  button1.textContent = buttonText1;
  container.appendChild(button1);

  // Create the second button
  let button2 = document.createElement('button');
  button2.textContent = buttonText2;
  container.appendChild(button2);

  switch(strings){
    case strings1: button2.addEventListener('click', ()=>{
      receiver(strings2a, speed); 
    }); 
    button1.addEventListener('click', ()=>{receiver(strings2b, speed);});
    break;
    case strings2a: button2.addEventListener('click', ()=>{
      receiver(strings3, speed);
    }); 
    button1.addEventListener('click', ()=>{
      receiver(strings7, speed);
    })
    break;
    case strings2b: button1.addEventListener('click', ()=>{
      receiver(strings2a, speed);
    });
    button2.addEventListener('click', ()=>{
      receiver(strings6, speed);
    }); break;
    case strings5: container.removeChild(button2); button1.id = 'clickButton'; button1.addEventListener('click', ()=>{
      buttonClicked();
    }); break;
    case strings6: container.removeChild(button2); button1.id = 'clickButton'; button1.addEventListener('click', ()=>{
      buttonClicked();
    }); break;
  }
}

// Example usage:
const strings1 = ["        Hello", "How are you?", "Will you go to heaven?   "];
const strings2a = ["can I pray for you?     "];
const strings2b = ["but why say that?     "];
const strings3 = ["In Jesus name, heal       "];
const strings4 = ["Say this prayer with me", "Jesus", "I receive the forgiveness"];
const strings5 = ["Never turn back.", "Count yourself in"];
const strings6 = ["click to count yourself in"];
const strings7 = ["It was nice talking to you"];
const speed = 100; // Speed in milliseconds

// Actual script
/* const strings1 = ["     Hello",
  "Hi, I've just got to tell you 2 things real quick, that God loves you and has an awesome plan for you.",
  "I've got to ask you a real quick question: If you were to die today, do you know for sure, without a shadow of a doubt, that you would go straight to heaven?   ",
];

let strings2a = ["Great! Let me tell you 3 things the Bible says real quick:",
  "It says, for all have sinned and fall short of the Glory of God.",
  "It says, the wages of sin is death, but the free gift of God is eternal life through Jesus Christ...",
  "And it also says whosoever calls upon the Lord will be saved and you're a \"whosoever\"...we all are.",
  "So can I say a quick prayer for you?   ",];

let strings2b = ["Great, why would you say yes?"];

let strings3 = ["May Lord bless you with long and healthy life. May Lord make Himself so real to you and if you have never received Jesus Christ as Lord and Savior, I pray that you would do so right now. If you would like to receive this free gift, Jesus Christ as your Lord and Savior", "just say this with me..      "];

let strings4 = [
  "Jesus..      ",
  "come into my heart..      ",
  "Forgive me of my sins..      ",
  "Wash me..      ",
  "Change me..",
  "And set me free..      ",
  "Let me never be the same again..      ",
  "Jesus..      ",
  "I believe You died for me..      ",
  "Help me to live for You..      ",
  "And fulfill everything You have called me to do..      ",
  "I thank you that I'm now forgiven..      ",
  "And on my way to Heaven..      ",
  "In Jesus' Name..      ",
  "AMEN!    ",];

let strings5 = ["I have the best news anyone will ever tell you. If you confessed with you mouth that Jesus is Lord and believe in your heart that God raised him from dead, all your sins are forgiven and you are saved and you can know for sure that you're on your way to Heaven. Remember, when you make a mistake, don't run from God, run to Him, because He loved you and He does have an awesome plan for your life!", "May the Lord bless you and keep you. May His face shine upon you and give you peace."];

let strings6 = ["Prase God to know that you are saved through Jesus Christ our Lord. For with the heart one believes and is justified, and with the mouth one confesses and is saved.(Romans 10:10)"];

let strings7 = ["Thank you so much for your time."]; */


typewriterEffect(strings1, speed);

function receiver(array, speed){
  document.querySelector('.chat-input').innerHTML = "";
  document.querySelector('.chat-messages').innerHTML = "";
  typewriterEffect(array, speed);
}

function buttonClicked() {
  count++;
  //document.getElementById("clickButton").style.display = "none";
  document.querySelector('.chat-messages').innerHTML = "Button clicked " + count + " times.";
  //document.getElementById("countDisplay").innerText = "Button clicked " + count + " times.";
  saveCount(count);
}

async function saveCount(count) {
  const response = await fetch('/save_count', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count: count })
  });

  if (response.ok) {
      console.log("Count saved successfully!");
  } else {
      console.error("Error saving count");
  }
}