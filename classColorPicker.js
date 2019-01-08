class ColorPicker extends HTMLElement {
    constructor() {
        super ()

        let thumb = document.createElement ( 'div' )
        thumb.className = "thumb"
        thumb.id = "thumb"

        this.bgview=document.createElement ( 'div' )
        this.bgview.id="bgview"
        thumb.appendChild ( this.bgview )
        var bgview=this.bgview

        let selector=document.createElement ( 'input' )
        selector.type= 'file'
        selector.id='selector'
        selector.onchange = this.handleFiles.bind(this)
        selector.style.display = 'none'
        let label=document.createElement ( 'label' )
        label.htmlFor = 'selector'
        label.innerText = 'Select images'

        let colorVal = document.createElement ( 'div' )
        colorVal.id = "colorVal"
        colorVal.innerHTML=` <span>HEX: #22142b</span>
                            <span>RGB: rgb(34,20,43)</span>`

        let canvas = document.createElement ( 'canvas' )
        canvas.id = "canv"

        this.picture = document.createElement ( 'img' )
        this.picture.id="pict"
        this.defaultPicture ( 'https://ic.pics.livejournal.com/fotografersha/13042289/4262274/4262274_original.jpg')

        thumb.appendChild ( this.picture )
        let x=""
        let y=""
        this.picture.self = this
        this.picture.rgbToHex=this.rgbToHex

        this.picture.addEventListener('click', function(event){
         x = event.offsetX;
         y = event.offsetY;
          this.self.grabCanvas(canvas,this,function(){
            // image data
            var $ = canvas.getContext('2d')
            .getImageData(x, y, 1, 1).data;
            // show info
            colorVal.innerHTML = '<span>HEX: '+this.rgbToHex($[0],$[1],$[2])+'</span>'+
            '<span>RGB: rgb('+
              $[0]+','+
              $[1]+','+
              $[2]+')</span>';
            // place chosen color as body background
            document.body.style.background =`linear-gradient( to top, ${this.rgbToHex($[0],$[1],$[2])},#faf7f7`;
            label.style.background=btn2.style.background=btn.style.background=`linear-gradient(to top, #C0C0C0, ${this.rgbToHex($[0],$[1],$[2])}`
            localStorage.setItem("selectedColor", `${this.rgbToHex($[0],$[1],$[2])}` )
          }.bind(this));
        },false)

       this.picture.addEventListener('mousemove', function(event){
          x = event.offsetX;
          y = event.offsetY;
          this.self.grabCanvas(canvas,this,function(){
            var $ = canvas.getContext('2d')
            .getImageData(x, y, 1, 1).data;
            // preview color
            bgview.style.background = this.rgbToHex($[0],$[1],$[2]);
          }.bind(this));
        },false)

       let btn=  document.createElement ( 'button' )
       btn.innerText="Go back to start"
       btn.className="goingBack"
       let btn2=  document.createElement ( 'button' )
       btn2.innerText="Go to Figure Painter"
       btn2.className="figurePainter"

       btn.onclick=function(event){
         localStorage.clear()
         var collection=document.getElementsByTagName('color-picker')
            for (var el of collection){
              el.parentNode.removeChild(el)
            }
          createStartPage()
       }
       btn2.onclick=function(event){
         var collection=document.getElementsByTagName('color-picker')
            for (var el of collection){
              el.parentNode.removeChild(el)
            }
          let elem2 = document.createElement ( 'figure-painter')
          document.body.appendChild ( elem2 )

       }

        let style = document.createElement ( 'style' )
        style.textContent = `
            .thumb{
              position:relative;
              display: block;
              width: 90%;
              max-height: 600px;
              max-width: 800px;
              overflow:hidden;
              margin: 0 auto;
              margin-top: 5%;
            }
            .thumb img {
              display: block;
              width: 99%;
              cursor: crosshair;
              border: 4px solid #fff;
              margin: 0 auto;
            }
            #bgview{
              position:absolute;
              top:2px;
              right:2px;
              display:block;
              margin:0;
              padding:0;
              width:50px;
              height:50px;
              border: 4px solid #FFF;
              border-right: none;
              border-top: none;
            }
            #colorVal{
              position: fixed;
              top: 0;
              left: 0;
              background: rgba(0, 0, 0, 0.2);
              color: #fff;
              margin: 0;
              padding:1em;
              display: block;
              box-shadow:1px 1px 1px 1px rgba(0,0,0,0.2);
              -webkit-box-shadow:1px 1px 1px 1px rgba(0,0,0,0.2);
              -moz-box-shadow:1px 1px 1px 1px rgba(0,0,0,0.2);
              z-index:-1;
            }
            #colorVal span {
              display: block;
              font-size: 1.2em;
              line-height:1.2em;
              width:12em;
              height:auto;
              text-align:left;
            }
            label{
              position: absolute;
              bottom: 100px;
              left: 1%;
              color: #fff;
              font-size: 15px;
              padding: 5px;
            }

            .goingBack{
              position: absolute;
              bottom: 20px;
              margin: 5px;
              left: 5px;
            }
            .figurePainter{
              position: absolute;
              bottom: 20px;
              margin: 5px;
              right: 5px;
            }

            button, label {
              font-size: 24px;
              background: #b5bdc8;
              background: linear-gradient(to top, #b5bdc8 0%, #828c95 36%, #28343b 100%);
              padding: 10px 20px;
              color: #fff;
              border: 1px solid #333;
              border-radius: 40px;
              text-align: center;
            }
            button:hover, label:hover {
              border-top-color: #4e4569;
              background: linear-gradient(to top, #b5bdc8 0%, #828c95 36%, #191970 100%);
              color: #87CEEB;
              }
            #canv{
              display:none;
            }
            @media (min-width:300px){
              .thumb{
                margin-top: 30%;
              }
              button, label{
                font-size: 12px;
              }
            }
            @media (min-width:400px){
              .thumb{
                margin-top: 25%;
              }
              button, label{
                font-size: 12px;
              }

            }
             @media (min-width:1024px){
              .thumb{
                margin-top: 70px;
              }
              .figurePainter, .goingBack{
                font-size:24px;
              }
               label{
                font-size:24px;
                bottom: 100px;
              }
            }
        `
        this.shadow = this.attachShadow ( { mode: 'closed' } )
        this.shadow.appendChild ( style )
        this.shadow.appendChild ( thumb )
        this.shadow.appendChild ( colorVal)
        this.shadow.appendChild ( canvas)
        this.shadow.appendChild ( btn)
        this.shadow.appendChild ( btn2)
        this.shadow.appendChild ( selector)
        this.shadow.appendChild ( label)
    }


    defaultPicture(url){
        fetch ( url )
            .then ( response => {
                response.blob().then ( response => {
                    var urlObject
                    urlObject = URL.createObjectURL(response)
                    this.picture.src = urlObject
            })
         })
    }

    handleFiles( event ) {
            var fileReader = new FileReader ()
            fileReader.readAsDataURL ( event.target.files [0] )
            fileReader.onload = function ( event ) {
                this.picture.src = event.target.result
            }.bind(this)
         }

    // canvas function
    grabCanvas(el,image,callback){
      el.width = image.width; // element / img width
      el.height = image.height; // element /img height
      // draw image in canvas tag
      el.getContext('2d')
      .drawImage(image, 0, 0, image.width, image.height);
      return callback()
    }

    /* convert rgba to hex  */
    rgbToHex (r,g,b){
          function componentToHex(c) {
              var hex = c.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
          }
      return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
    }

}

customElements.define ( 'color-picker', ColorPicker )
