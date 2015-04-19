//Objetos Abstractos
function Sprite()
{

  this.Index=Array();
  this.Draw= function(subimg,X,Y,Width,Height,PartX,PartY,PartW,PartH)
             {             

		 PartX= PartX || 0;
		 PartY= PartY || 0;
		 PartW= PartW || 0;
		 PartH= PartH || 0;
		 
		 if(PartX + PartY +  PartW + PartH ==0)
		       GAME.drawImage(this.Index[subimg],X,Y,Width,Height);
		       
		 else 
                     GAME.drawImage(this.Index[subimg],PartX,PartY,PartW,PartH,X,Y,Width,Height);  
		 
             };
    this.Draw_ext=function (subimg,X,Y,Width,Height,PartX,PartY,PartW,PartH,Rotation)
                   {

		    GAME.save();
		       GAME.translate(X,Y);
		       GAME.rotate(Rotation*Math.PI/180);
		       if(PartX==false && PartY==false && PartW==false && PartH==false)
			   this.Draw(subimg,0,0,Width,Height);
		       else
   			   this.Draw(subimg,0,0,Width,Height,PartX,PartY,PartW,PartH);

		    GAME.restore();   
		   }
       
}

function Objeto(Width,Height,X,Y)
{
  this.X=X || 0;
  this.Y=Y || 0;
  this.Width=Width || 0;
  this.Height=Height || 0;
/*colision entre objetos (Tienen que tener la misma estructura)
o pertenecer al mismo padre o clase
*/
  this.Collision= function (other,npoints)
                  {
		    npoints=npoints || 4; //puntos de colision  
		      
		    colision=false;//sin colision por defecto
		    with(other)
		    {
			//puntos de colision
			Points=Array();
			Points.push(Array(X,Y));
			Points.push(Array(X+Width,Y+Height));
			
			
			for(var i=0;i<1;i++)
			    for(var ii=0;ii<1;i++)
			    {
		      
		 if(Points[i][0]>this.X && Points[i][0]<this.X+this.Width && Points[ii][1]>this.Y && Points[ii][1]<this.Y+this.Height)	
		     colision=true;
		     
		     //si se ha leido todos los puntos
			     npoints--;
			     if(!npoints)
				{ i=2;
				  break;}
			    }
		    }	
		      /*
		       Retorna true si existe una colision entre instancias y false si no existe.
		       */
		      return colision;
		      
		  }
}
//Propiedades de la Room
Room={
      "Index":0,
      "Background": new Sprite(),
      "BackCoordY":Array(),
      "Velocity":0,
      "GameOver":false,
      "MoveBackground":function()
      				{

      					for(var i=0;i<2;i++)
      					{
							this.Background.Draw(this.Index,0,this.BackCoordY[i],CANVAS.width,CANVAS.height+20);
							if(GO && !this.GameOver)							
							{
								this.BackCoordY[i]+=Velocity;
								if(this.BackCoordY[2]>this.BackCoordY[3])
									this.BackCoordY[2]+=(Velocity/2);
							}
							
								for(var ii=0;ii<18;ii++)
									this.Background.Draw(1,ii*100,this.BackCoordY[2],140,180);
								
							
							this.BackCoordY[i]=(this.BackCoordY[i]>CANVAS.height?-CANVAS.height:this.BackCoordY[i]);
						}

      				},	
      "Init": function()
              {
   		  this.Background.Index.push(new Image());
		  this.Background.Index[0].src="sprites/back1.jpg";
		  this.Background.Index.push(new Image());
		  this.Background.Index[1].src="sprites/back2.png";
		  this.BackCoordY.push(0);
		  this.BackCoordY.push(CANVAS.height);		
		  this.BackCoordY.push(CANVAS.height-180);
		  this.BackCoordY.push(CANVAS.height-360);
		  Velocity=15;
	       },
      "Output1":function() 
                {
		    //this.Background.Draw(this.Index,0,0,CANVAS.width,CANVAS.height);
		    this.MoveBackground();
		}
     };
//Objeto Principal
Rocket={
        "Parts":Array(),
        "Go":function()
        	{
        		
        		GO=true;
        		for(var i=0 in this.Parts)	
	        			if(i<=3)
							this.Parts[i].Fire=5;

        		if(this.Status=="Verde" && Btns.CheckActive()) 
        		{       
        				
	        		for(var i=0 in this.Parts)	
	        			if(i<=3)
							this.Parts[i].Fire=5;


				}
				else
				{

					this.SelfDestruction();
				}
        	},
        "IndDrop":0,
        "DropPart":function()
	        {	
	        	ToDrop=0;
	        	for(var i=0 in this.Parts)
	        		if(!this.Parts[i].Fire)
	        			ToDrop++;

	        	if(ToDrop)
	        	{
	        		switch(this.IndDrop)
	        		{
	        		case 0:
	        			this.Parts[1].Fall=true;
		        	 	this.Parts[2].Fall=true;		        		
	        	 	break;
	        	 	case 1:
	        	 		this.Parts[0].Fall=true;
		        	 	
	        	 	break;
	        	 	default:
	        	 		this.Parts[this.IndDrop].Fall=true;
		        	 	this.Parts[this.IndDrop+1].Fire=5;
	        	    }
	        	    /*
	        	    this.Parts[this.IndDrop].Fall=true;
		        	 	this.Parts[this.IndDrop+1].Fire=5;
	        		if(this.IndDrop==1)	
	        			this.Parts[this.IndDrop+1].Fall=true;
	        		*/
	        		
	        	}
	        	else
	        	{

	        		alert("Mision Completada!!");
	        	}
	        	this.IndDrop++;
	        	if(this.IndDrop>=this.Parts.length)
	        		Room.GameOver=true;

	        	
	        },
        "Status":"Amarillo",//Verde:listo para despegar,Rojo:en peligo,Amarillo:Preparativos para el despegue		
        "Turn":function()
              {
		  GAME.save();
		  //GAME.translate(this.Parts[0].Body.X*2,-1*this.Parts[0].Body.Y*5);
		  //  (H,K)
		  GAME.translate(0,0);
		 // GAME.translate(-1*this.H,-1*this.K);
		  // Angulo
		  /*
		    A la derecha
		  GAME.translate(270,-240);
		  GAME.rotate(25*Math.PI/180);*/
		  /*
		    A la izquierda
		  GAME.translate(-150,330);
		  GAME.rotate(-25*Math.PI/180);
		  */
		  for(var i=0 in Parts)
		      this.Parts[i].Output();	      
		  GAME.restore();

	      },

	    "ConsumeFuel":function() 
	    	{
	    		Medidor=document.getElementById("Med");
	    		Medidor.value--;
	    	},
	    "ChangeStatus":function()  
	    	{
	    	Medidor=document.getElementById("Med");
	    		if(!(H!=0 || M!=0 || S!=0))
	    			this.Status="Verde";
	    		
	    		if(Medidor.value<=0)
	    		{
	    			
	    			this.Status="Rojo";	
				}	
	    		
	    	},
	    "SelfDestruction": function()  
		    {
		    	GO=false;
		    	for(var i in this.Parts)
		    	{	
		    		 this.Parts[i].Fire=10;
					 //this.Parts[i].Fire=5;
				}	
					alert("Mision Fallida");	
					this.Status="Rojo";	
		    },
        "Init":function()
                {
		    Parts=this.Parts;
//		    W=Array(800,200,200,800,800,800);
//		    H=Array(1100,1000,1000,400,400,400);
		    W=Array(300,75,75,300,300,300);
		    H=Array(440,475,475,150,150,150);
		    /*Partes del cuerpo*/
		    for(var i=0;i<6;i++)
		    {	
			Parts.push({
		            "Body":new Objeto(),
			    "Sprite":new Sprite(),
			    "Fire":0,	
			    "Fall":false,
			    "Output": function()
			    {
			    	if(Room.GameOver)
			    		this.Body.Y-=3;

					this.Sprite.Draw(0,this.Body.X,this.Body.Y,this.Body.Width,this.Body.Height);
					if(this.Fire && !Room.GameOver)	
						ParticleFire(this.Body.X+(this.Body.Width/2),this.Body.Y+this.Body.Height,this.Fire);
			    },
			    "Output2":function()
			    {
			    	this.Sprite.Draw_ext(0,this.Body.X,this.Body.Y,this.Body.Width,this.Body.Height,0,0,0,0,45);
			    },
			    "Falling":function()	
			    {
			    	if(this.Fall)
			    	this.Body.Y+=3;
			    }	
		        });
			
			Parts[i].Body.Height=H[i];
			Parts[i].Body.Width=W[i];
			Parts[i].Body.Y=(CANVAS.height-(Parts[i].Body.Height)*(i>2?i-2:1)-30);
			Parts[i].Body.X=(CANVAS.width-Parts[i].Body.Width)/2+(i==1?-(W[0]/2):(i==2?(W[0]/2):0));
			Parts[i].Sprite.Index.push(new Image());
			Parts[i].Sprite.Index[0].src="sprites/img"+(i+1)+".png";
			
		    }
		},
        "Output": function()
                 {
				     for(var i=0 in Parts)
				     {
				     	
					     this.Parts[i].Output();
					     this.Parts[i].Falling();
					 }
					 
					 //Cambio de luces
					 this.ChangeStatus();
					 		
					 switch(this.Status)
					 {
					 	case "Verde":
					 		LEDY=document.getElementById("LEDY");
					 		LEDV=document.getElementById("LEDV");
					 		LEDR=document.getElementById("LEDR");
							LEDR.style.background="#darkred";
					 		LEDY.style.background="#936C00";
					 		LEDV.style.background="lightgreen";

					 	break;
					 	case "Rojo":
					 		LEDR=document.getElementById("LEDR");
					 		LEDV=document.getElementById("LEDV");
					 		LEDY=document.getElementById("LEDY");
							LEDY.style.background="#936C00";
					 		LEDR.style.background="#FF503D";
					 		LEDV.style.background="darkgreen";
					 		GoRocket=document.getElementById("GO");
					 		Autodestruccion=document.getElementById("AutoDestruction");
							Autodestruccion.disabled=false;
							GoRocket.disabled=true;
							this.SelfDestruction();
					 	break;
					 	case "Amarillo":
					 		/*LEDR=document.getElementById("LEDR");
					 		LEDV=document.getElementById("LEDV");
					 		LEDR.style.background="red";
					 		LEDV.style.background="darkgreen";*/
					 	break;

					 }
				 }
       };

//Controles
Btns={
	 "AllActive":false,
	 "ChangeBtnStatus":function(btn)
	 	{
	 		btn.style.background="green";//"gradient(linear, left top, left bottom, color-stop(0%,#bfd255), color-stop(50%,#8eb92a), color-stop(51%,#72aa00), color-stop(100%,#9ecb2d))";
	 		btn.active=true;
	 	},	
	 "CheckActive": function()
	 	{	

	 		Btns=document.getElementsByClassName("Btn");	 		

	 		for(var i=0 in Btns)
		 		if(!isNaN(i) && !Btns[i].active)
		 			return false;
		 		
			return true;
	 	}
};
