/**************************************
 * This JS get the paragraph containing
 * the full text and splits it after a
 * certain number of characters.
 *
 * It then creates new paragraphs for
 * every split line and appends it to
 * the primary textbox.
 *
 * Finally, it will hide the full text
 * element. The text will be used later
 * which is why it's not being removed
 *
 **************************************/

// We get full text and trim any extra spaces
const textElement = document.getElementById('full-text');
const text = textElement.innerHTML.replace(/\s+/g,' ').trim();

// Target to which we will append the new paragraphs
let targetDiv = document.getElementById('primary-textbox');

// We split the full text every X characters which returns an array
let splitTextArr = text.match(/(\S+\s*){1,33}/g);

splitTextArr.forEach(line => {
  let newParagraph = document.createElement('p');
  let newText = document.createTextNode(line);

  // Add class 'text' to new paragraph and append new text line
  newParagraph.className = 'text';
  newParagraph.appendChild(newText);

  targetDiv.appendChild(newParagraph);

});

//document.getElementById("item").style.zIndex = "7";

// Hide the full-text after we add the new paragraphs
textElement.style.display = 'none';

// reverse the z-index of paragraphs so they appear in order
let paragraphArr = document.getElementsByClassName('text');
let nParagraphs = paragraphArr.length;

for (let i = 0; i <= nParagraphs - 1; i++) {
  paragraphArr[i].style.zIndex = (nParagraphs - i);
}
