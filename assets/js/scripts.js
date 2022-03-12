/*******************************************************************************
 * This JS get the paragraph containing the full text and splits it after a
 * certain number of characters.
 *
 * It then creates new paragraphs for every split line and appends it to the
 * primary textbox.
 *
 * Finally, it will hide the full text element. The text will be used later
 * which is why it's not being removed
 *
 ******************************************************************************/

// Get full text
const textElement = document.getElementById('full-text');

// Get computed font size
let fontSizeString = window.getComputedStyle(textElement).getPropertyValue('font-size');
let fontSize = parseFloat(fontSizeString);

// Default split is 33 words
// if font size is larger than 33px, split text at 16 words
let numberOfWordsToSplitOn = 33;

if (fontSize > 33) {
  numberOfWordsToSplitOn = 13;
}

if (fontSize > 27) {
  numberOfWordsToSplitOn = 28;
}

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)


if (vw > 767 && fontSize > 31) {
  numberOfWordsToSplitOn = 55;
}

if (vw > 1079 && fontSize > 39) {
  numberOfWordsToSplitOn = 65;
}

// trim extra spaces in full text
const text = textElement.innerHTML.replace(/\s+/g,' ').trim();

// Target to which we will append the new paragraphs
let targetDiv = document.getElementById('primary-textbox');

// Split the full text every X words
let regex = new RegExp('(\\S+\\s*){1,' + numberOfWordsToSplitOn + '}', 'g' );
let splitTextArr = text.match(regex);

splitTextArr.forEach(line => {
  let newParagraph = document.createElement('p');
  let newText = document.createTextNode(line);

  // Add class 'text' to new paragraph and append new text line
  newParagraph.className = 'text';
  newParagraph.appendChild(newText);

  targetDiv.appendChild(newParagraph);

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

//textArr.forEach((el, index) => { console.log(index, el);})

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
