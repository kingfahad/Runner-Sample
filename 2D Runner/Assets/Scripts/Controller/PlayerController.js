#pragma strict

public var speed:float; // speed of player can be changable
public var speedBoostAtTime:float; // you can set time in seconds so that speed will increase gradually at specific 
								  //  second.
public var speedBoostVal:float;
private var timeCounter:float;

private var anim:Animator; // here animator var which is used to increase the fps of animation along with the player speed
public var animIncreamentor:float = 0.1F; // value of animation to increase changable
private var isGameOver:boolean = false;

function Start () {
	NotificationCenter.DefaultCenter.AddObserver(this, "onGameOver");
	anim = GetComponent(Animator);
}

function Update () {
	if(!isGameOver){
		// here one for moving to right direction and -1 for left
		var moveDirection:int = 1;
		//here get rigidbody component
	    rigidbody2D.velocity = Vector2(speed * moveDirection, rigidbody2D.velocity.y);
	    
	    timeCounter += Time.deltaTime; //here increase speed at specific time 
	    if(timeCounter > speedBoostAtTime){  // condition to check whether the specific time reach to increase speed
	    	timeCounter = 0;    //reset the timer to 0
	    	speed = speed + speedBoostVal;  // increase speed by speedBoostVal
	    	anim.speed +=  animIncreamentor;
	    }
    }
}

function onGameOver(){
   isGameOver = true;
   anim.speed = 0;
}
