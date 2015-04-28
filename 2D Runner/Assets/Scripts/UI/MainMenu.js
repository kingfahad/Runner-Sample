#pragma strict

private var renderer_:SpriteRenderer;

function Start () {
	renderer_ = GetComponent(SpriteRenderer);
	Utils.adjustScreen(renderer_, transform);
}

function Update () {
}

// to the user clicking on the object
function OnMouseDown () {
	Application.LoadLevel ("Runner");// here to load the Runner scene 
}
