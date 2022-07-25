const editor = document.querySelector('.editable-box');

function actionCommand(command) {
  document.execCommand(command, false, null);
}
function actionComArg(command, arg) {
  document.execCommand(command, false, arg);
}

const inputFile = document.getElementById('imageUpload');
inputFile.onchange = function () {
  let url = null;
  let fileObj = document.getElementById("imageUpload").files[0];
  if (window.createObjcectURL != undefined) {
    url = window.createOjcectURL(fileObj);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(fileObj);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(fileObj);
  }
  console.log(url)
  actionComArg('insertImage',url)
}
var showingSouceCode = false;
function toggleCode(buttonId) {
  if (buttonId) {
    buttonClicked(buttonId);
  }
  if (showingSouceCode) {
    editor.innerHTML = editor.textContent;
    showingSouceCode = false;
  } else {
    editor.textContent = editor.innerHTML;
    showingSouceCode = true;
  }
}

function blockquote() {
  const element = document.createElement("blockquote");
  action(element)
}
function action(element) {
  let userSelectionArea = window.getSelection().anchorNode.parentElement.className
  const userSelection = window.getSelection();
  const selectedTextRange = userSelection.getRangeAt(0);

  if (userSelectionArea == "editable-box"){
    selectedTextRange.surroundContents(element);
  }
}

document.onselectionchange = () => {
  const btnBold = document.querySelector('.bold');
  const btnItalic = document.querySelector('.italic');
  const btnUnder = document.querySelector('.underline');
  const btnStrike = document.querySelector('.strikethrough');
  const btnSup = document.querySelector('.superscript');
  const btnSub = document.querySelector('.subscript');

  const btnQuote = document.querySelector('.quote');

  const testAll = [btnBold, btnItalic, btnUnder, btnStrike, btnSup, btnSub, btnQuote]
  const tags = ['B', 'I', 'U', 'STRIKE', 'SUP', 'SUB', 'BLOCKQUOTE']
	if (editor === document.activeElement){
    let i = 0
    let n = 0
    while (testAll[i]){
      if (isSelectionInTag(tags[n])){
        testAll[i].classList.add('active');
      } else {
        testAll[i].classList.remove('active');
      }
      i++;
      n++;
    }
	}
}

function isSelectionInTag(tag) {
	let currentNode = window.getSelection().focusNode;
	while (currentNode.className !== 'editable-box'){
		if (currentNode.tagName === tag) return true;
		currentNode = currentNode.parentNode;		
	}
	return false;
}
