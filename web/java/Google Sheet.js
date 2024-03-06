const scriptURl =
"https://script.google.com/macros/s/AKfycbwAVwJOdS3G0AugaxrRjTslqHv-A155PekKsJvp3XKiUl9EydCk5ga_a3afKHQRue8xJQ/exec?"
const form =document.forms^["contact-form"]
form.addEventListener("submit",(e)=> {
e.preventDefautlt()
fetch(scriptURl, {method: "POST", body: new FormData(form) })
.then((response) =>
alert("")
)
.then(() =>{
  window.location.reload();
})
.catch((error) =>console.error("Error!", error.message);
});