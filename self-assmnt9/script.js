const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const storyText =  "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day."
const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"]
const insertY = ["the soup kitchen","Disneyland","the White House"]
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "spontaneously combusted"]

randomize.addEventListener('click', select);

function updateName(newStory) {
  const name = document.getElementById('customname').value;

  if (name !== '') {
    newStory = newStory.replace('Bob', name);
  }

  return newStory;
}

function updateWeight(newStory) {
  const value = (Math.round(300/14))+' stone'
  newStory = newStory.replace('300 pounds', value);

  return newStory;
}

function updateTemperature(newStory) {
  const value = Math.round(((94-32)*(5/9)))+' centigrade'
  newStory = newStory.replace('94 fahrenheit', value);

  return newStory;
}

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

function select() {
  let newStory = updateName(storyText);

  if(document.getElementById('us').checked) {
    newStory = updateWeight(newStory);
  } else {
    newStory = updateTemperature(newStory);
  }

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);
  newStory = newStory.replace(/:insertx:/g, xItem);
  newStory = newStory.replace(":inserty:", yItem);
  newStory = newStory.replace(":insertz:", zItem);

  story.textContent = newStory ;
  story.style.visibility = 'visible';
}