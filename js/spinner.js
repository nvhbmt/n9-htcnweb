function showSpinner(){
    let spinner = document.getElementById("spinner");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
    }, 2500);
}

window.onload = function(){
    setTimeout(() => {
        document.getElementById("spinner-page").style.display="none";
    }, 2000);
};