/*******************************************************************************
 * This JS gets the paragraph containing the full text and splits it into new
 * paragraphs after a certain number of characters. It then creates new
 * paragraphs for every split line and appends it to the primary textbox.
 *
 * It also hides the full text element which will be used in later development.
 *
 ******************************************************************************/

// Get full text
const textElement = document.getElementById('full-text');

// Get computed font size
let fontSizeString = window.getComputedStyle(textElement).getPropertyValue('font-size');
let fontSize = parseFloat(fontSizeString);

// Default split
let numberOfWordsToSplitOn = 42;
let textbox = document.getElementById('primary-textbox');
let area = textbox.offsetHeight * textbox.offsetWidth;

if (area > 100000) {
  numberOfWordsToSplitOn = 50;
}

if (area > 120000) {
  numberOfWordsToSplitOn = 70;
}

if (area > 150000) {
  numberOfWordsToSplitOn = 85;
}

if (area > 250000) {
  numberOfWordsToSplitOn = 110;
}

if (area > 500000) {
  numberOfWordsToSplitOn = 120;
}

if (area > 600000) {
  numberOfWordsToSplitOn = 145;
}

if (area > 700000) {
  numberOfWordsToSplitOn = 160;
}

// trim extra spaces in full text
const text = textElement.innerHTML.replace(/\s+/g,' ').trim();

// Split the full text every X words
let regex = new RegExp('(\\S+\\s*){1,' + numberOfWordsToSplitOn + '}', 'g' );
let splitTextArr = text.match(regex);

splitTextArr.forEach(line => {
  let newParagraph = document.createElement('p');
  let newText = document.createTextNode(line);

  // Add class 'text' to new paragraph and append new text line
  newParagraph.className = 'text';
  newParagraph.appendChild(newText);

  // Target to which we will append the new paragraphs
  textbox.appendChild(newParagraph);
});

// Hide the full-text after we add the new paragraphs
textElement.style.display = 'none';

// reverse the z-index of paragraphs so they appear in order
let paragraphHtmlCollection = document.getElementsByClassName('text');
let nParagraphs = paragraphHtmlCollection.length;

for (let i = 0; i <= nParagraphs - 1; i++) {
  paragraphHtmlCollection[i].style.zIndex = (nParagraphs - i);
}

const textArr = Array.from(paragraphHtmlCollection);
const firstElement = textArr.shift(); //rm first element from array

// Set button and position z-index so they are greater than all .text elements
const btnContainer = document.getElementsByClassName('btn-container');
const positionContainer = document.getElementById('position-container');

btnContainer[0].style.zIndex = (nParagraphs + 1);
positionContainer.style.zIndex = (nParagraphs + 2);

const btns = document.getElementById('btns-container');
const min = 0;
const max = nParagraphs - 1;
let position = 0;

btns.addEventListener('click', (event) => {
  // boolean
  const isButton = event.target.nodeName === 'BUTTON';

  if (isButton) {
    if (position < max && event.target.classList.contains('js-forward')) {
      textArr[position].style.opacity = 0;
      position += 1;
    } else if (position > min && event.target.classList.contains('js-back')) {
      textArr[position - 1].style.opacity = 1;
      position -= 1;
    }
  }

  // Update numerator
  const numerator = document.getElementById('numerator');
  numerator.innerHTML = position + 1;
})

const denominator = document.getElementById('denominator');
denominator.innerHTML = nParagraphs;
