document.addEventListener("DOMContentLoaded", function() {
   var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };

   // get canvas element and create context
   var canvas  = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;

   // set canvas to full browser width/height
   canvas.width = width;
   canvas.height = height;

   // register mouse event handlers
   canvas.onselectstart = function () { return false; } // ie
   canvas.onmousedown = function(e){ mouse.click = true; };
   canvas.onmouseup = function(e){ 
      mouse.click = false; 
   };

   canvas.onmousemove = function(e) {
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
   };

	function draw(line) {
      context.font="105px Calibri";
      context.textAlign="center"
      context.textBaseline="center"
      context.strokeStyle="#ccccff";

      context.strokeText("Thanks For Clicking",line[0].x * width, line[0].y * height);
   }

   // main loop, running every ms
   function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
         draw([mouse.pos, mouse.pos_prev])
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 1);
   }
   mainLoop();
});