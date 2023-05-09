import './App.css';
import { useEffect, useRef } from 'react';
import { Typography, Button, Grid, Container, Card, CardMedia } from '@mui/material';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, NavLink, Outlet } from 'react-router-dom'


const Canvas = ({width, height}) => {

  const canvasRef = useRef(null);

  useEffect(() => {


    const canv = document.querySelector('canvas');

    canv.width = window.innerWidth;
    canv.height = window.innerHeight;

    let canvas = canvasRef.current;
    if(!canvas){
      return;
    }
    var c = canvas.getContext("2d");
    if(!c) {
      return;
    }

    let mouse = {
      x: undefined,
      y: undefined

    }

    window.addEventListener('mousemove', 
          function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
          })

    let colorArray = [

      '#011140',
      '#011526',
      '#9BD1F2',
      '#025E73',
      '#037F8C',
    ];

    window.addEventListener('resize', function(){

      canv.width = document.body.clientWidth;
      canv.height = document.body.clientHeight;

      init();
    })
    

    class Circle {
      constructor(x, y, dx, dy, radius) {
        
        this.x = x ;
        this.y = y ;
        this.dx = dx;
        this.dy = dy ; 
        this.radius =radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
        
      }

      draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = 'blue'; 
        c.fillStyle = this.color;
        c.fill();
      }

      move() {
        if (this.x + this.radius > document.body.clientWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
  
        if (this.y + this.radius > document.body.clientHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
  
        this.x += this.dx;
        this.y += this.dy;
  
        //interction

        if (mouse.x -this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {

          if(this.radius < 40){
            this.radius += 1;
          } 
        }else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }
      }
    }

    
    let circleArray = [];

    function init() {

      circleArray = [];

      for (let i = 0 ; i<800 ; i++) {
        
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (document.body.clientWidth - radius * 2) + radius;
        let y = Math.random() * (document.body.clientHeight - radius * 2) + radius;
        let dx = (Math.random() -0.5) ;
        let dy = (Math.random() -0.5) ;
        circleArray.push(new Circle( x, y, dx, dy, radius));
        
      }
    }

    function animate () {

      requestAnimationFrame(animate);
      c.clearRect( 0, 0, document.body.clientWidth, document.body.clientHeight);

      for (let i = 0; i < circleArray.length; i++) {

       circleArray[i].draw(c);
       circleArray[i].move();

      }
      
    }

    init();
    animate(); 
    
  }, []);

  return(
      <canvas 
      width={width} 
      height={height}
      ref={ canvasRef } />
  );
}

function Rootlayout() {
  return (
    <div className='root-layout'>
      <header>
        <nav>
        <Grid display='flex' container spacing={2} >
                <Grid item>
                    <Button variant='outline' color='primary' href="/"> 
                    Home
                    <RoofingOutlinedIcon></RoofingOutlinedIcon>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='outlined' color='primary' href='about'> 
                    bubbles
                    <BubbleChartOutlinedIcon></BubbleChartOutlinedIcon>
                    </Button>

                </Grid>
          </Grid>
          <NavLink to="/"></NavLink>
          <NavLink to="about"></NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}


let router = createBrowserRouter(
  createRoutesFromElements(
        <Route path='/' element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<Canvas width="100%" height="100%"></Canvas>} />
        </Route>
  )
)


function App() {
   
  return (
       <RouterProvider router={router} />
  )
  
}

function Home() {

  return(
    <>
            <div>
                <data />
                <Container maxWidth="sm" style={{marginTop: '100px',}}>
                    <Typography variant='h3' align='center' color="textPrimary" gutterBottom>
                        Bubble Population
                    </Typography>
                    <Typography variant='h6' align='center' color="textPrimary" gutterBottom>
                        This little web-app shows the amazing simulation of bubbles out of hat, they become goodly and big and return back to normal whenever taped.. And the snap is just wonderful  
                    </Typography>
                    <Card style={{
                      height:"100%",
                      display: 'flex',
                      flexDirection: 'column'}}>
                      <CardMedia image='https://source.unsplash.com/featured' style={{paddingTop: '56.25%'}} title="Image" />
                    </Card>
                    
                </Container>
                <footer >
                  <Typography variant='h6' align='center' gutterBottom>FOOTER</Typography>
                  <Typography variant='subtitle1' align='center' color="textSecondary">
                    Animation by Tshekega/mish
                  </Typography>
                </footer>
            </div>
        </>
  )
}

export default App;
