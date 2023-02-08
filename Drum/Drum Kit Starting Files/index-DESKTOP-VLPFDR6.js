var numberOfButton = document.querySelectorAll(".drum").length;
for (let i = 0; i < numberOfButton; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click",function handleClick() {
        alert("Click");
    }); 
        
}
