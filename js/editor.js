const editor = document.querySelector('.editable-box');

function actionCommand(command) {
  document.execCommand(command, false, null);
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
    testAll.forEach((itemBtn, indexBtn)=>{
      if (isSelectionInTag(tags[indexBtn])){
        itemBtn.classList.add('active');
      } else {
        itemBtn.classList.remove('active');
      }
    })
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
