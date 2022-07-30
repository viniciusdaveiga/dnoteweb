const editor = document.querySelector('.editable-box');

function actionCommand(command) {
  document.execCommand(command, false, null);
}
function actionComArg(command, arg) {
  document.execCommand(command, false, arg);      
}

function changeFontName(fontNameId){
  const fontNameArea = document.getElementById("spanFontName")

  let fontN = document.getElementById(fontNameId).innerHTML
  fontNameArea.innerHTML = fontN
  if (fontNameArea.classList !== null){
    fontNameArea.removeAttribute('class')
    fontNameArea.classList.add(fontNameId)
  } else {
    fontNameArea.classList.add(fontNameId)
  }
 
  actionComArg('fontName', fontN, null);
}

function changeFontSize(fontSizeValue) {
  let fontS = fontSizeValue.innerHTML
  const fontSLabel = document.getElementById("spanFontSize")
  fontSLabel.innerHTML = fontS
  document.execCommand("fontSize", false, "7");
  const fontElements = document.getElementsByTagName("font");
  for (let i = 0, len = fontElements.length; i < len; ++i) {
    if (fontElements[i].size == "7") {
      fontElements[i].removeAttribute("size");
      fontElements[i].style.fontSize = `${fontS}px`;
    }
  }
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

let showingSourceCode = false;
function toggleCode(identifier) {
  const btn = document.querySelector(".code")
  if (identifier) {
    buttonClicked(identifier);
  }
  if (showingSourceCode == true) {
    editor.innerHTML = editor.textContent;
    showingSourceCode = false;
    editor.style.fontFamily = "";
    btn.classList.remove('active');
  } else {
    editor.textContent = editor.innerHTML;
    showingSourceCode = true;
    editor.style.fontFamily = "monospace";
    btn.classList.add('active');
  }
}

function addLink(){
  const btn = document.querySelector(".link")
  if (btn.classList.contains("active")){
    actionComArg('unlink', null)
  } else {
    actionComArg('createLink', prompt('Enter a URL', 'http://'))
  }
}

function chooseColor(command, value, identifier){
  if (identifier == "inputColorText") {
    document.getElementById("recColorText").style.backgroundColor = value;
  } else {
    document.getElementById("recColorFill").style.backgroundColor = value;
  }
  actionComArg(command, value)
}

document.onselectionchange = () => {
  const btnBold = document.querySelector('.bold'),
        btnItalic = document.querySelector('.italic'),
        btnUnder = document.querySelector('.underline'),
        btnStrike = document.querySelector('.strikethrough'),
        btnSup = document.querySelector('.superscript'),
        btnSub = document.querySelector('.subscript'),
        btnUList = document.querySelector('.unorderedList'),
        btnOList = document.querySelector('.orderedList'),
        btnLink = document.querySelector('.link');

  const testAll = [btnBold, btnItalic, btnUnder, btnStrike, btnSup, btnSub, btnUList, btnOList, btnLink]
  const tags = ['B', 'I', 'U', 'STRIKE', 'SUP', 'SUB', 'UL', 'OL', 'A']
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

    if (isSelectionInTag('FONT')){
      let fontSelection = window.getSelection().focusNode;
      let fontElements = fontSelection.parentNode

      let spanFName = document.getElementById("spanFontName")
  
      let fontS = fontElements.style.fontSize
      let fontN = fontElements.getAttribute("face")

      
      while (fontSelection.className !== 'editable-box'){
        if (fontS !== ''){
          console.log("1S",fontS)
          if (fontN !== null){
            console.log("1N",fontN)
          } else {
            while (fontElements.getAttribute("face") == null){
              fontElements = fontElements.parentNode;
            }
            fontN = fontElements.getAttribute("face")
            console.log('2N',fontN)
          }
          return true;
        } else if (fontN !== null) {
          console.log("3N",fontN)
          if (fontS !== ''){
            console.log('2S',fontS)
          } else {
            while (fontElements.style.fontSize == null){
              fontElements = fontElements.parentNode;
            }
            fontS = fontElements.style.fontSize
            console.log('3S',fontS)
          }
          return true;
        } else {
          while (fontElements.style.fontSize == ''){
            fontElements = fontElements.parentNode;
          }
          while (fontElements.getAttribute("face") == null){
            fontElements = fontElements.parentNode;
          }
          fontS = fontElements.style.fontSize
          fontN = fontElements.getAttribute("face")
          console.log('FINAL',fontS)
          console.log('FINAL',fontN)
          console.log("Error")
          return false;
        }
      }
      
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