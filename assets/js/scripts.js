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
// TODO: change this to split on complete word that is less than X characters
let splitTextArr = text.match(/.{1,183}/g);

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
