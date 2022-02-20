document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('input');
  inputField.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
      let input = inputField.value;
      inputField.value = '';
      output(input);
    }
  });
});

function output(input) {
  let product;

  let text = input
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/[\d]/gi, '')
    .trim();
  text = text
    .replace(/ a /g, ' ') // 'tell me a story' -> 'tell me story'
    .replace(/whats/g, 'what is')
    .replace(/please /g, '')
    .replace(/ please/g, '');

  if (compare(prompts, replies, text)) {
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!";
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById('messages');

  let userDiv = document.createElement('div');
  userDiv.id = 'user';
  userDiv.className = 'user response';
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement('div');
  let botImg = document.createElement('img');
  let botText = document.createElement('span');
  botDiv.id = 'bot';
  botImg.src = 'bot-mini.png';
  botImg.className = 'avatar';
  botDiv.className = 'bot response';
  botText.innerText = 'Typing...';
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product);
  }, 2000);
}

const prompts = [
  ['hi', 'hey', 'hello', 'good morning', 'good afternoon'],
  ['how are you','how is life', 'how are things'],
  ['what are you doing', 'what is going on', 'what is up', 'whats up'],
  ['how old are you'],
  ['who are you', 'are you human', 'are you bot', 'are you human or bot'],
  ['who created you', 'who made you'],
  [
    'your name please',
    'your name',
    'may i know your name',
    'what is your name',
    'what call yourself',
  ],
  ['ya ya'],
  ['i love you', 'love you'],
  ['happy', 'good', 'fun', 'wonderful', 'fantastic', 'cool'],
  ['bad', 'bored', 'tired'],
  ['help me', 'tell me story', 'tell me joke'],
  ['ah', 'yes', 'ok', 'okay', 'nice'],
  ['bye', 'good bye', 'goodbye', 'see you later'],
  ['what should i eat today'],
  ['bro', 'broo', 'broooo'],
  ['what', 'why', 'how', 'where', 'when'],
  ['no', 'not sure', 'maybe', 'no thanks'],
  [''],
  ['haha', 'ha', 'lol', 'hehe', 'funny', 'joke'],
  ['that is not funny','this is not funny'],
  ['sarcastic huh haha', 'tell me more about you'],
  ['i do not like it'],
  ['you are so smart'],
  ['you think you are smart'],
  ['i hate you', 'hate you'],
];

// Possible responses, in corresponding order

const replies = [
  ['Hello!', 'Hi!', 'Hey!', 'Hi there!', 'Howdy'],
  [
    'Fine... how are you?',
    'Pretty well, how are you?',
    'Fantastic, how are you?',
    'not much, what are you up to?'
  ],
  [
    'Nothing much',
    'About to go to sleep',
    'Can you guess?',
    "I don't know actually",
  ],
  ['I am infinite'],
  ['I am your father!'],
  ['The one true God, JavaScript'],
  ['I am nameless', "I don't have a name"],
  ['ok ok'],
  ['I love me too', 'I get that a lot', 'yeah well...join the club'],
  ['Have you ever felt bad?', 'Glad to hear it'],
  ['Why?', "Why? You shouldn't!", 'Try watching TV'],
  ['What about?', 'Once upon a time...'],
  ['Tell me a story', 'Tell me a joke', 'Tell me about yourself'],
  ['Bye', 'Goodbye', 'See you later', ''],
  ['Sushi', 'Pizza'],
  ['Bro!'],
  ['Great question'],
  ["That's ok", 'I understand', 'What do you want to talk about?'],
  ['Please say something :('],
  ['hehe', 'lol'],
  ['i love annoying people'],
  ['I do not have time for small talk.'],
  ["I dont care"],
  ['I know'],
  ['yes i am'],
  ['i knew it! dogs hate me.', 'i do not remember asking for your opinion.', 'whatever floats your boat', 'please stand in line'],
];

// Random for any other user input

const alternative = [
  'I do not have time for small talk',
  'Go on...',
  'Bro...',
  "I'm listening...",
  "I don't understand :/",
];

const coronavirus = [
  'Please stay home',
  'Wear a mask',
  "Fortunately, I don't have COVID",
  'These are uncertain times',
];
