#pragma strict

public var threshold:float;// this is for progress to reduce after every specific seconds editable
public var reduction:float;  // reduction to reduce progress by specific value it should be less than 1

private var slider:UISlider;  //slider to update progressbar on GUI
private var progressTime:float;  // here progress time to check on each update

public var increamentOnTargetA:float = 0.10F; //increase progress on Target A here value in percent 0.10 mean 10% increase you can change
												// but it should be less than 1 and in percentage
private var isTargerA:boolean;								 				
												
function Start () {
	isTargerA = false;
	slider = GetComponent(UISlider);  //get component of UISlider to update progress
	
	// here register notification to onTargetA method it would be called when target A would be pressed
	NotificationCenter.DefaultCenter.AddObserver(this, "onTargetA");
}

function Update () {
	progressTime += Time.deltaTime; // delta time would increase on each update since start of script  
	
	if(slider.value > 0){
		if(progressTime > threshold){
			progressTime = 0; // reset time for next reduction
			slider.value = slider.value - reduction; // reduces the value
		}
		
		if(isTargerA){ // here check whether target A is pressed if then increase progress and set value false
			slider.value = slider.value + increamentOnTargetA;
			isTargerA = false; 
		}
	}
	else{
		NotificationCenter.DefaultCenter.PostNotification(this, "onGameOver");	
	}
}

//this method called on click target A
function onTargetA(){
    isTargerA = true;
}