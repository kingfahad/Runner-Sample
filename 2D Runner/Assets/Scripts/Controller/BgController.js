#pragma strict

public var bgPref:GameObject;  // assign bg pref and load it.
public var bgSp:Sprite[];
private var playerObj:GameObject;

private var lastBg:int; //to trace the last bg index
private var firstBg:int; //to trace the first bg index

function Start () {//start is called one time
	//default values
	lastBg = 1;
	firstBg = 0; 
	playerObj = GameObject.FindGameObjectWithTag("Player"); // get player object by tag
	initBg(); // therefore initbg would be created one time
}

function Update () { //update called on each frame
	// here is the condition to check whether camera's x-axis is greater than last bg on x-axis then move first bg
	// after the last one and then check again
	if(Camera.main.transform.position.x > transform.GetChild (lastBg).transform.position.x){
		updateBg();
	}
}

function initBg(){
	// here I would create only 2 background which would repeat it self more bg take more memory
	for(var i:int = 0; i < bgSp.Length; ++i){
		// here create clone prefab game object with the position of bgController
		var obj:GameObject = Instantiate(bgPref, transform.position, transform.rotation);
		obj.name = "bg_" + i;
		obj.transform.parent = transform; // assign the parent gameobj of clone object
		
		// first get sprite renderer of bg to check total width of texture on x-axis
		var renderer_:SpriteRenderer = obj.GetComponent(SpriteRenderer);
		renderer_.sprite = bgSp[i];//apply sprite
		
		// set the postion of created bg to one after the other
		obj.transform.position = Vector3(i * renderer_.sprite.bounds.size.x, obj.transform.position.y, 0);
	}
}

function updateBg(){
	// get child of this gameobject at 0 index
	var obj:GameObject = transform.GetChild (firstBg).gameObject;
	var renderer_:SpriteRenderer = obj.GetComponent(SpriteRenderer);// get SpriteRenderer component to check bounds
	
	// offset is basically sum of last bg's x pos + their texture's width
	var offset_x:float = transform.GetChild (lastBg).transform.position.x + renderer_.sprite.bounds.size.x;
	
	// Now set x-axis of first bg after the last one
	obj.transform.position = Vector3(offset_x, obj.transform.position.y, obj.transform.position.z);
	
	//update values
	if(lastBg == 0){
		lastBg = 1;
	}
	else{
		lastBg = 0;
	}
	
	if(firstBg == 0){
		firstBg = 1;
	}
	else{
		firstBg = 0;
	}
}
