var  CANVAS,GAME;
	
/*Cargar el simulador*/
onload=function()
       {
	   
	   CANVAS= document.getElementById("IntfRocket");
	   
	   GAME = CANVAS.getContext("2d");
	   GAME.fillStyle ='white';
	   GAME.globalCompositeOperation="xor";
	   GAME.globalCompositeOperation="lighter";
	   CANVAS.width  = window.innerWidth;
	   CANVAS.height = window.innerHeight;

	   /*Cargar Sprites*/
	//   alert("holi");
	   Room.Init();
	   Rocket.Init();
		S=0;M=4;H=0;

       };

/*El Simulador*/
      /*Main*/

      setInterval(function()
		  {

		      GAME.clearRect(0,0,CANVAS.width,CANVAS.height);
		      //Primer output de la Room
		      Room.Output1();
		      Rocket.Output();

                  },100);
      /*Timer*/
      S=0;M=0;H=0;
      setInterval(function()
      			{
      			 if(H!=0 || M!=0 || S!=0)
      			 {	
	      			Timer=document.getElementById("Timer");
			  		S--;
			  		if(S<0)
			  		{		
			  			M--;		
			  			S=59;
			  		}

			  		if(M<0)
			  		{		
			  			H--;		
			  			M=59;
			  		}

			  	}
			  	else
			  	{
			  		go=document.getElementById("GO");
					Medidor=document.getElementById("Med");
					Medidor.disabled=true;
					if(!Btns.CheckActive())
					{
						go.disabled=true;
						alert("Mision Cancelada");
					}
			  	}	
			  		Timer.innerHTML=" "+(H>=10?H:"0"+H)+":"+(M>=10?M:"0"+M)+":"+(S>=10?S:"0"+S);

      			},
      			20
      			);
	setInterval(function()
      			{
      					if(GO)
     					Rocket.ConsumeFuel();

     			},1100);//800 se acaba a la justa

	setInterval(function()
      			{
      				if(GO)
      					Rocket.DropPart();
     					//Rocket.ConsumeFuel();
     					
     			},18000);