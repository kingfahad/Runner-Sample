#pragma strict

public var count_1:GameObject;
public var count_2:GameObject;
public var heart:GameObject;
public var count_1_sp:GameObject;
public var count_2_sp:GameObject;
public var progress:GameObject;

private var sprite:UI2DSprite;

function Awake(){
    Utils.count_A = 0;
     Utils.count_B = 0;
    PlayerPrefs.DeleteAll();
}

function Start () {
  NotificationCenter.DefaultCenter.AddObserver(this, "onGameOver");
}

function Update () {
  
}
//this would be called when progress goes to 0%
function onGameOver(){
   Application.LoadLevel("GameOver");
}