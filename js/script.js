const body = document.querySelector('body'),
      sidebar = body.querySelector('#sidebar'),
      closeToggle = body.querySelector(".close-sidebar"),
      openToggle = body.querySelector(".open-sidebar"),
      teste = body.querySelector(".color-e-title"),
      teste2 = body.querySelector('.note-area');


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

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.querySelector(".content-dropdown-fontSize").classList.toggle("show-dropdown-fontSize");
}

function myFunction2() {
    document.getElementById("dropdown-alignText").classList.toggle("show-dropdown-alignText");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.alignText')) {
        var myDropdown = document.getElementById("dropdown-alignText");
        if (myDropdown.classList.contains('show-dropdown-alignText')) {
            myDropdown.classList.remove('show-dropdown-alignText');
        }
    }
    if (!e.target.matches('#fontSize')) {
        var myDropdown = document.querySelector(".content-dropdown-fontSize");
        if (myDropdown.classList.contains('show-dropdown-fontSize')) {
            myDropdown.classList.remove('show-dropdown-fontSize');
        }
    }
}