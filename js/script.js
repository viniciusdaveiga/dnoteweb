const body = document.querySelector('body'),
      sidebar = body.querySelector('#sidebar'),
      closeToggle = body.querySelector(".close-sidebar"),
      openToggle = body.querySelector(".open-sidebar")


      

closeToggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("sidebar-closed");
    teste.classList.toggle("right");
})

openToggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("sidebar-closed");
    teste.classList.toggle("right");
})