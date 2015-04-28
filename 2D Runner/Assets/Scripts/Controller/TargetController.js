#pragma strict

import System.Collections.Generic;

//list of target A sprites/texture
public var target_A_sp:Sprite[];
public var targeThreshold:int;

public var targets:GameObject[]; //targets array 
public var offsetX:float; // offset is value to place targets away from camera it would looks like it comes to player
private var timer:float; //timer which woutld manage random targerts at specific time

private var player:GameObject;
private var currentTargetobj:GameObject; // here var which contains current target on screen

private var targetList = new List.<GameObject>(); // created temp list of targets that would be load and unload 
private var maxClone:int = 3; // here max number of temp target gameobject clone from which one by one enable or come towards 
						//	player here I have set 3 means 3 pairs of clone target A & B

private var probArrA:float[];
private var probTargets:float[];

function Start () {
	probTargets = [80F, 20F];   			// probability 80 for target A and 20 for Target B
    probArrA = [20F, 20F, 20F, 20F, 20F];
 	//initTargets(); // initialize targets
 	player = GameObject.FindGameObjectWithTag("Player"); // get player object
}

function Update () {
	timer += Time.deltaTime; 
	//here timer at game start after 2 seconds it will display random target time can be changeable
	if(timer > targeThreshold){
		timer = 0; // timer reset to zero to
		if(currentTargetobj != null){
			Destroy (currentTargetobj);  //set gameobject to disable
		}
		updateTarget(); // method to select random target and position it
	}
}

//function initTargets(){
//	//loop to init max clone of targets and add to temp list targetList
//	for(var j:int = 0; j < maxClone; ++j){
//		for(var i:int = 0; i < targets.Length; ++i){
//			var obj:GameObject = Instantiate(targets[i], targets[i].transform.position, transform.rotation);
//			obj.transform.parent = transform; // assign the parent gameobj of clone object
//			
//			obj.SetActive(false); //set the target objects invisible
//			targetList.Add(obj);
//		}
//	}
//}

function updateTarget(){
	//var rand:int = Random.Range(0, targetList.Count);  // get random number
	var selectedTarget:int = Choose(probTargets);
	currentTargetobj = Instantiate(targets[selectedTarget], targets[selectedTarget].transform.position, transform.rotation);
	//currentTargetobj = targetList[selectedTarget].gameObject;// get random target object from list

	currentTargetobj.transform.parent = transform;
	updateImage(currentTargetobj);  // update image for Target A
	// Now set x-axis of target object which are coming
	currentTargetobj.transform.position = Vector3(player.transform.position.x + offsetX, currentTargetobj.transform.position.y, 
									currentTargetobj.transform.position.z);
									
	currentTargetobj.SetActive(true);  // set it enable 
}

function updateImage(obj:GameObject){
	if(obj.name.Contains("A")){
		var val = Choose(probArrA);
		obj.GetComponent(SpriteRenderer).sprite = target_A_sp[val];
	}
}

// function for probablility of 20% chance of each image of target A
function Choose(probs: float[]) {
    var total = 0.0F;
   
    for (elem in probs) {
        total += elem;
    }
    
    var randomPoint = Random.value * total;
     //Debug.Log("Choose = " + Random.value + " total = " +total + " rand " + randomPoint);
    for (var i:int = 0; i < probs.Length; i++) {
        if (randomPoint < probs[i])
            return i;
        else
            randomPoint -= probs[i];
    }
   
    return probs.Length - 1;
}

