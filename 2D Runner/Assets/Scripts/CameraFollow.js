#pragma strict

private var thisTransform:Transform;	// for Camera transform
private var target:Transform;			// for player transform

public var playerOffsetX:float; // used to set the position of camera to how much forward from player on x-axis

function Start () {
	thisTransform = transform;  //assign transform of camera to variable
	target = GameObject.FindGameObjectWithTag("Player").transform;  //get player trasnform by tag assign transform of player to variable
}

function Update () {
// move camera relative to character 
   thisTransform.position = Vector3 (target.position.x + playerOffsetX, thisTransform.position.y, 
   								 thisTransform.position.z);
}