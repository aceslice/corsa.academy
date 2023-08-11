function openCity(evt, cityName) {
  console.log(evt.currentTarget);
  // Declare all variables
  let i, tablinks;


  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // document.getElementById("defaultOpen").click();
  // Show the current tab, and add an "active" class to the button that opened the tab
  evt.currentTarget.className += " active";
}

