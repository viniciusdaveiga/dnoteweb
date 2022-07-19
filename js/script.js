const body = document.querySelector('body'),
      // Sidebar
      sidebar = body.querySelector('#sidebar'),
      closeToggle = body.querySelector(".close-sidebar"),
      openToggle = body.querySelector(".open-sidebar"),
      // Top Bar
      colorAndTitle = body.querySelector(".color-e-title"),
      // Toolbar
      toggleToolbar = body.querySelector('.toggle-toolbar'),
      toolbar = body.querySelector('.top-toolbar'),
      btnScrollR = document.querySelector('#scroll-right');
      btnScrollL = document.querySelector('#scroll-left');
      toolbarGroup = body.querySelector('.toolbar-group'),
      // Note Area
      noteArea = body.querySelector('.note-area');


function scrollDetector() {
    let hs = toolbar.scrollWidth > toolbar.clientWidth;
    if (hs == true){
        btnScrollR.style.display = 'block';
        btnScrollL.style.display = 'block';
    } else {
        btnScrollR.style.display = 'none';
        btnScrollL.style.display = 'none';
    }
};
scrollDetector()
new ResizeObserver(scrollDetector).observe(toolbar)

btnScrollR.onclick = function () {
    sideScroll(toolbar,'right',20,20,2);
};
btnScrollL.onclick = function () {
    sideScroll(toolbar,'left',20,20,2);
};
function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

function alignDropdown (target, dropdown) {
    const targetRect = target.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();

    // const left = targetRect.left + targetRect.width / 2 - dropdownRect.width / 2;
    const left = targetRect.left + targetRect.width - dropdownRect.width;

    dropdown.style.left = `${left}px`;
}

closeToggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("sidebar-closed");
    btnScrollL.style.left = "0";
    setTimeout(() => {
        scrollDetector()
    }, 130);

    if (!noteArea.classList.contains("left")){
        colorAndTitle.classList.add("right");
        noteArea.classList.add("left");
        toolbarGroup.classList.add("right");
    } 
    
})

openToggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("sidebar-closed");
    setTimeout(() => {
        scrollDetector()
    }, 130);
    if (window.matchMedia("(min-width: 600px)").matches) {
        if (noteArea.classList.contains("left")){
            colorAndTitle.classList.remove("right");
            noteArea.classList.remove("left");
            toolbarGroup.classList.remove("right");
            setTimeout(() => {
                btnScrollL.style.left = "312px";
            }, 130);
        } 
    }
})

toggleToolbar.addEventListener("click" , () =>{
    const icon = body.querySelector('.icon-toggle-toolbar');
    if (toolbar.classList.contains("toolbar-closed")){
        toolbar.classList.remove('displayNone');
        setTimeout(() => {
            toolbar.classList.remove("toolbar-closed");
            noteArea.style.height = 'calc(-85px + 100vh)';
            icon.style.transform = 'rotate(0deg)';
        }, 10);
    } else {
        toolbar.classList.add("toolbar-closed");
        noteArea.style.height = 'calc(-45px + 100vh)';
        setTimeout(() => {
            toolbar.classList.add("displayNone");
            icon.style.transform = 'rotate(180deg)';
        }, 80);
    }
})

function colorFilterSidebar() {
    document.querySelector(".content-dropdown-colorFilter--sidebar").classList.toggle("show-dropdown-colorFilter");
}

function chooseFontSize() {
    const fontSize = document.querySelector("#fontSize");
    const contentDropdownFontSize = document.querySelector(".content-dropdown-fontSize");
    contentDropdownFontSize.classList.toggle("show-dropdown-fontSize");
    alignDropdown(fontSize,contentDropdownFontSize);
}

function openMoreTopbar() {
    const moreTopbar = document.querySelector(".more");
    const contentDropdownMoreTopbar = document.querySelector(".content-dropdown-moreTopbar");
    contentDropdownMoreTopbar.classList.toggle("show-dropdown-moreTopbar");
    alignDropdown(moreTopbar,contentDropdownMoreTopbar);
}

function chooseTextAlignment() {
    const alignText = document.querySelector(".alignText");
    const contentDropdownAlignText = document.querySelector(".content-dropdown-alignText");
    contentDropdownAlignText.classList.toggle("show-dropdown-alignText");
    alignDropdown(alignText,contentDropdownAlignText);
}

function chooseFontName() {
    const fontName = document.querySelector("#fontName");
    const contentDropdownFontName = document.querySelector(".content-dropdown-fontName");
    contentDropdownFontName.classList.toggle("show-dropdown-fontName");
    alignDropdown(fontName,contentDropdownFontName);
}

function colorFilterTopbar() {
    document.querySelector(".content-dropdown-colorFilter--top-bar").classList.toggle("show-dropdown-colorFilter");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('#fontSize')) {
        const myDropdown = document.querySelector(".content-dropdown-fontSize");
        if (myDropdown.classList.contains('show-dropdown-fontSize')) {
            myDropdown.classList.remove('show-dropdown-fontSize');
        }
    }
    if (!e.target.matches('#fontName')) {
        const myDropdown = document.querySelector(".content-dropdown-fontName");
        if (myDropdown.classList.contains('show-dropdown-fontName')) {
            myDropdown.classList.remove('show-dropdown-fontName');
        }
    }
    if (!e.target.matches('.alignText')) {
        const myDropdown = document.querySelector(".content-dropdown-alignText");
        if (myDropdown.classList.contains('show-dropdown-alignText')) {
            myDropdown.classList.remove('show-dropdown-alignText');
        }
    }
    if (!e.target.matches('.more .icon, .more')) {
        const myDropdown = document.querySelector(".content-dropdown-moreTopbar");
        if (myDropdown.classList.contains('show-dropdown-moreTopbar')) {
            myDropdown.classList.remove('show-dropdown-moreTopbar');
        }
    }
    if (!e.target.matches('#color-filter-sidebar .icon, #color-filter-sidebar .circle')) {
        const myDropdown = document.querySelector(".content-dropdown-colorFilter--sidebar");
        if (myDropdown.classList.contains('show-dropdown-colorFilter')) {
            myDropdown.classList.remove('show-dropdown-colorFilter');
        }
    }
    if (!e.target.matches('#color-filter-topbar .icon, #color-filter-topbar .circle')) {
        const myDropdown = document.querySelector(".content-dropdown-colorFilter--top-bar");
        if (myDropdown.classList.contains('show-dropdown-colorFilter')) {
            myDropdown.classList.remove('show-dropdown-colorFilter');
        }
    }
}