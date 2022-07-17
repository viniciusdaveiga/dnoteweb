const body = document.querySelector('body'),
      sidebar = body.querySelector('#sidebar'),
      closeToggle = body.querySelector(".close-sidebar"),
      openToggle = body.querySelector(".open-sidebar"),
      teste = body.querySelector(".color-e-title"),
      teste2 = body.querySelector('.note-area'),
      teste3 = body.querySelector('.toggle-toolbar'),
      toolbar = body.querySelector('.top-toolbar');


closeToggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("sidebar-closed");
    teste.classList.toggle("right");
    teste2.classList.toggle("left");
})

openToggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("sidebar-closed");
    teste.classList.toggle("right");
    teste2.classList.toggle("left");
})

teste3.addEventListener("click" , () =>{
    toolbar.classList.toggle("toolbar-closed");
})

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.querySelector(".content-dropdown-fontSize").classList.toggle("show-dropdown-fontSize");
}

function myFunction2() {
    document.querySelector(".content-dropdown-alignText").classList.toggle("show-dropdown-alignText");
}

function myFunction3() {
    document.querySelector(".content-dropdown-colorFilter--sidebar").classList.toggle("show-dropdown-colorFilter");
}

function myFunction4() {
    document.querySelector(".content-dropdown-colorFilter--top-bar").classList.toggle("show-dropdown-colorFilter");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('#fontSize')) {
        var myDropdown = document.querySelector(".content-dropdown-fontSize");
        if (myDropdown.classList.contains('show-dropdown-fontSize')) {
            myDropdown.classList.remove('show-dropdown-fontSize');
        }
    }
    if (!e.target.matches('.alignText')) {
        var myDropdown = document.querySelector(".content-dropdown-alignText");
        if (myDropdown.classList.contains('show-dropdown-alignText')) {
            myDropdown.classList.remove('show-dropdown-alignText');
        }
    }
    if (!e.target.matches('#color-filter-sidebar .icon, #color-filter-sidebar .circle')) {
        var myDropdown = document.querySelector(".content-dropdown-colorFilter--sidebar");
        if (myDropdown.classList.contains('show-dropdown-colorFilter')) {
            myDropdown.classList.remove('show-dropdown-colorFilter');
        }
    }
    if (!e.target.matches('#color-filter-topbar .icon, #color-filter-topbar .circle')) {
        var myDropdown = document.querySelector(".content-dropdown-colorFilter--top-bar");
        if (myDropdown.classList.contains('show-dropdown-colorFilter')) {
            myDropdown.classList.remove('show-dropdown-colorFilter');
        }
    }
}