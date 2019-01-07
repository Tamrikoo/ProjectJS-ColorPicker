function createStartPage(){
    var butonStart=document.body.appendChild(document.createElement('button'))
    butonStart.innerHTML="Press to start ColorPicker"
    butonStart.id='start'

    butonStart.onclick=function(event){
        localStorage.clear()
        let elem = document.createElement ( 'color-picker' )
        document.body.appendChild ( elem )
        var el =document.getElementById('start')
        el.parentNode.removeChild(el)

    }

    return butonStart
}

createStartPage() 
