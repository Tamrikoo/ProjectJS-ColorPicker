class FigurePainter extends HTMLElement {
    constructor () {
        super ()
        let wrapper = document.createElement ( 'div' )
        wrapper.className = "wrapper"
        this.canvas = document.createElement ( 'canvas' )
        wrapper.appendChild ( this.canvas )

        this.resizeCanvas ()
        this.area = this.canvas.getContext ( "2d" )
        let buttons=[
            {
              text: "Create Circle",
              callback: this.drawCircle,
              className: "circle"
            },
            {
              text: "Create Rectangle",
              callback: this.drawRectangle,
              className: "rectangle"
            },
            {
              text: "Go back to Start",
              callback: this.clearAll,
              className: "Start"
            }
        ]

        for (var x of buttons) {
            var btn = document.createElement('button');
            btn.innerHTML = x.text;
            wrapper.appendChild(btn);
            btn.onclick = x.callback.bind(this)
        }

        this.shadow = this.attachShadow ( { mode: 'open' } )
        let style = document.createElement ( 'style' )
        style.textContent = `
            canvas {
                border: dotted 1px #555;
                margin: 0 auto;
            }
            .square{
              position: absolute;
              bottom: 0;
              background: #b5bdc8;
              min-height: 50px;
              min-width: 120px;
              padding: 10px;
              text-align: center;
            }
            button {
              background: #b5bdc8;
              background: linear-gradient(to top, #b5bdc8 0%, #828c95 36%, #28343b 100%);
              padding: 10px 20px;
              color: #fff;
              border: 1px solid #333;
              border-radius: 40px;
              text-align: center;
            }
            button:hover{
              border-top-color: #4e4569;
              background: linear-gradient(to top, #b5bdc8 0%, #828c95 36%, #191970 100%);
              color: #87CEEB;
              }
              @media (min-width:780px){
                  body{
                    height: 100%
                  }
              }
        `
        this.shadow.appendChild ( style )
        this.shadow.appendChild ( wrapper )
    }
    resizeCanvas ( event ) {
        this.canvas.width = window.innerWidth - 30
        this.canvas.height = window.innerHeight - 150
    }
    drawRectangle ( ) {
          this.area.clearRect(0, 0, this.canvas.width, this.canvas.height)
          var width = prompt ("Enter width in centimeter ")
          var height = prompt ("Enter height in centimeter")
          this.area.fillStyle = localStorage.getItem ( "selectedColor" )||"orange"         
          this.area.fillRect(10,10, width*38, height*38)
          alert(`Площадь четырехугольника при ширине ${width}
            см и высоте ${height} см составляет ${width*height} см`)
    }
    drawCircle ( ) {
          this.area.clearRect(0, 0, this.canvas.width, this.canvas.height)
          var radius = prompt ("Enter radius in centimeter")
          this.area.fillStyle = localStorage.getItem ( "selectedColor" ) ||"orange"
          radius?this.area.arc(radius*38,radius*38, radius*38, 0,
            Math.PI*2, true): alert ("Радиус не указан")
          this.area.fill()
          alert (`Площадь круга при радиусе ${radius}cm :
            ${Math.round(Math.pow(radius, 2)*Math.PI*100)/100} см `)
    }
    clearAll() {
      var collection=document.getElementsByTagName('figure-painter')
      localStorage.clear()
          for (var el of collection){
              el.parentNode.removeChild(el)
            }
          createStartPage()
    }
}

customElements.define (
    'figure-painter',
    FigurePainter
)
