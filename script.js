const fieldCount = document.getElementById("field-count")
const ground = document.getElementById('ground');

document.body.onload = setGroundSize

window.addEventListener("resize", function(e){
    setGroundSize()
})

function setGroundSize(){
    if(this.innerHeight < this.innerWidth){
        ground.style.width = "90vh"
        ground.style.height = "90vh"
    }else{
        ground.style.width =  "100vw"
        ground.style.height = "100vw"
    }
}


fieldCount.addEventListener("click", ()=>{
    const fielder = document.createElement("span")
    fielder.setAttribute("class", "fielder")

    ground.appendChild(fielder)

    const offsetX = fielder.getBoundingClientRect().x
    fielder.id = offsetX
})

let fielderSelect = null;
ground.addEventListener("mousedown", function(e){
    if(e.target.className == "fielder")
    fielderSelect = e.target
})

ground.addEventListener("mouseup", function(e){
    fielderSelect = null;
})

const groundOffset = ground.getBoundingClientRect()
ground.addEventListener("mousemove", function(e){
        let posX = e.clientX
        let posY = e.clientY
        moveFielder(posX, posY)
})

// touch devoces

ground.addEventListener("touchstart", function(e){
    if(e.target.className == "fielder")
    fielderSelect = e.target
})

ground.addEventListener("touchend", function(e){
    fielderSelect = null;
})

ground.addEventListener("touchmove", function(e){
    let posX = e.changedTouches[0].clientX
    let posY = e.changedTouches[0].clientY
    moveFielder(posX, posY)
})

// click
let clickFielder = null;
ground.addEventListener("click", function(e){
    const select = e.target
    if(select.className.includes("fielder") ){
        if(clickFielder == select ) {
            clickFielder.classList.remove("clicked")
            clickFielder = null 
            return
        }
        select.classList.add("clicked")
        clickFielder = select
    }
    else if(clickFielder !== null){
        const offset = clickFielder.getBoundingClientRect()
        clickFielder.style.transform = `translate(
            ${e.clientX - clickFielder.id - offset.width/2}px,
            ${e.clientY - groundOffset.y - offset.height/2}px
        )`
    }
    else
        clickFielder = null
})

// ********************** /
function moveFielder(posX , posY){
    if(fielderSelect !== null){
        const offset = fielderSelect.getBoundingClientRect()
        fielderSelect.style.transform = `translate(
            ${posX - fielderSelect.id - offset.width/2}px 
            , ${posY-groundOffset.y - offset.height/2}px )`
    }
}

