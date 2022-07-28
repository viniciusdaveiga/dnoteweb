const body = document.querySelector('body'),
      // Sidebar
      sidebar = body.querySelector('#sidebar'),
      closeToggle = body.querySelector(".close-sidebar"),
      noteList = body.querySelector(".note-list"),
      // Top Bar
      openToggle = body.querySelector(".open-sidebar"),
      colorAndTitle = body.querySelector(".color-e-title"),
      // Toolbar
      toggleToolbar = body.querySelector('.toggle-toolbar'),
      toolbar = body.querySelector('.top-toolbar'),
      btnScrollR = body.querySelector('#scroll-right');
      btnScrollL = body.querySelector('#scroll-left');
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

// ==================== DROPDOWNS ====================
function alignDropdown (target, dropdown) {
    const targetRect = target.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();
    // const left = targetRect.left + targetRect.width / 2 - dropdownRect.width / 2;
    const top = targetRect.top + targetRect.height;
    const left = targetRect.left + targetRect.width - dropdownRect.width;
    dropdown.style.top = `${top + 5}px`;
    dropdown.style.left = `${left}px`;
}

function openDnotewebMenu() {
    const target = document.querySelector(".sidebar-top");
    const contentDropdown = document.querySelector("#dropdown-dnoteweb");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}

function colorFilterSidebar() {
    const target = document.querySelector("#color-filter-sidebar");
    const contentDropdown = document.querySelector("#dropdown-colorFilterSidebar");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}

function filterSettings(){
    const target = document.querySelector(".filter-settings");
    const contentDropdown = document.querySelector("#dropdown-filterSettings");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}

const wrapper = document.querySelector('.note-list');
wrapper.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains("icon-noteItemMore");
    if (!isButton) {
    return;
    }

    moreNoteItem(event.target.id)
    console.log(event.target.id);
})
function moreNoteItem(a) {
    const target = document.querySelector(`#${a}`);
    console.log(target)
    const contentDropdown = document.querySelector(".dropdown-moreNoteItem");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}
function colorFilterTopbar() {
    const target = document.querySelector("#color-filter-topbar");
    const contentDropdown = document.querySelector("#dropdown-colorFilterTopbar");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}
function openMoreTopbar() {
    const target = document.querySelector(".more");
    const contentDropdown = document.querySelector("#dropdown-moreTopbar");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}
function chooseFontName() {
    const target = document.querySelector("#fontName");
    const contentDropdown = document.querySelector("#content-dd-fontName");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}
function chooseFontSize() {
    const target = document.querySelector("#fontSize");
    const contentDropdown = document.querySelector("#content-dd-fontSize");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}
function chooseTextAlignment() {
    const target = document.querySelector(".alignText");
    const contentDropdown = document.querySelector("#dropdown-alignText");
    contentDropdown.classList.toggle("show-dropdown");
    alignDropdown(target,contentDropdown);
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.sidebar-top, .logo-text, .logo-text .icon')) {
        const myDropdown = document.querySelector("#dropdown-dnoteweb");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
    if (!e.target.matches('#color-filter-sidebar .icon, #color-filter-sidebar .circle')) {
        const myDropdown = document.querySelector("#dropdown-colorFilterSidebar");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
    if (!e.target.matches('.filter-settings .btn, #icon-filter-settings')) {
        const myDropdown = document.querySelector("#dropdown-filterSettings");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
    if (!e.target.matches('.btnMoreNoteItem .icon-noteItemMore, .dropdown-moreNoteItem')) {
        const myDropdown = document.querySelector(".dropdown-moreNoteItem");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
    if (!e.target.matches('#color-filter-topbar .icon, #color-filter-topbar .circle')) {
        const myDropdown = document.querySelector("#dropdown-colorFilterTopbar");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
    if (!e.target.matches('.more .icon, .more')) {
        const myDropdown = document.querySelector("#dropdown-moreTopbar");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
    if (!e.target.matches('#fontName, #icon-fontNDropdown, #spanFontName')) {
        const myDropdown = document.querySelector("#content-dd-fontName");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
    if (!e.target.matches('#fontSize, #icon-fontSDropdown, #spanFontSize')) {
        const myDropdown = document.querySelector("#content-dd-fontSize");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
    if (!e.target.matches('.alignText')) {
        const myDropdown = document.querySelector("#dropdown-alignText");
        if (myDropdown.classList.contains('show-dropdown')) {
            myDropdown.classList.remove('show-dropdown');
        }
    }
}

// Close the dropdown if the user scroll the noteList
noteList.onscroll = function(e) {
    const dnotewebMenu = document.querySelector("#dropdown-dnoteweb");
    if (dnotewebMenu.classList.contains('show-dropdown')) {
        dnotewebMenu.classList.remove('show-dropdown');
    }
    const colorFilterSidebar = document.querySelector("#dropdown-colorFilterSidebar");
    if (colorFilterSidebar.classList.contains('show-dropdown')) {
        colorFilterSidebar.classList.remove('show-dropdown');
    }
    const filterSettings = document.querySelector("#dropdown-filterSettings");
    if (filterSettings.classList.contains('show-dropdown')) {
        filterSettings.classList.remove('show-dropdown');
    }
    const moreNoteItem = document.querySelector(".dropdown-moreNoteItem");
    if (moreNoteItem.classList.contains('show-dropdown')) {
        moreNoteItem.classList.remove('show-dropdown');
    }
}

function toggleFullScreen(){
    const fullscreen = document.querySelector(".more-fullscreen");
    if (document.fullscreenElement===null) {
        document.documentElement.requestFullscreen()
        fullscreen.style.background = "url(/img/more/fullscreen-exit.svg) center no-repeat"
    } else {
        document.exitFullscreen();
        fullscreen.style.background = "url(/img/more/fullscreen.svg) center no-repeat"
    }
}

function toggleDarkMode(){
    const body = document.querySelector("body");
    const textModeColor = document.querySelector('.text-color-mode');
    let icon = document.querySelector(".more-mode");
    if (body.classList.contains("dark")) {
        icon.style.background = "url(/img/dark-mode.svg) center no-repeat"
        icon.style.backgroundSize = 'contain'
        body.classList.remove("dark")
        textModeColor.innerHTML = "Dark Mode"
    } else {
        icon.style.background = "url(/img/light-mode.svg) center no-repeat"
        icon.style.backgroundSize = 'contain'
        body.classList.add("dark")
        textModeColor.innerHTML = "Light Mode"
    }
}