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

      let fontSizeElements = fontSelection.parentNode
      let fontNameElements = fontSelection.parentNode

      let spanFName = document.getElementById("spanFontName")
      let spanFSize = document.getElementById("spanFontSize")
      
      findFontSpec();

      function findFontSpec() {
        let fontS = fontSizeElements.style.fontSize
        while (fontSizeElements.className !== 'editable-box'){
          if (fontSizeElements.style.toString() !== ''){
            if (fontSizeElements.style.fontSize.toString() !== ''){
              fontS = fontSizeElements.style.fontSize
              spanFSize.innerHTML = fontS.slice(0, -2)
              while (fontNameElements.className !== 'editable-box'){
                if (fontNameElements.getAttribute('face') !== null){
                  if (fontNameElements.getAttribute('face').toString() !== ''){
                    let fontN = fontNameElements.getAttribute('face')
                    spanFName.innerHTML = fontN
                    spanFName.className = '';
                    let fontNew = fontN.split(" ")[0].toLowerCase();
                    spanFName.className = `font-${fontNew}`
                    return true
                  }
                } else if (fontNameElements.style.fontFamily.toString() !== ''){
                  let fontN = fontNameElements.style.fontFamily
                  spanFName.innerHTML = fontN.replace(/['"]+/g, '')
                  spanFName.className = '';
                  let fontNew = fontN.split(" ")[0].toLowerCase();
                  spanFName.className = `font-${fontNew.replace(/['"]+/g, '')}`
                  return true
                }
                fontNameElements = fontNameElements.parentNode;
              }
            }
          }
          fontSizeElements = fontSizeElements.parentNode;
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