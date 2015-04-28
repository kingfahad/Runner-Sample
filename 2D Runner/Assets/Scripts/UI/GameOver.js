#pragma strict

public var count_1:GameObject;
public var count_2:GameObject;

function Start () {
	count_1.GetComponent(UILabel).text = PlayerPrefs.GetInt("count_1", 0).ToString(); //geting count 1 value assigned to label
	count_2.GetComponent(UILabel).text = PlayerPrefs.GetInt("count_2", 0).ToString(); //geting count 2 value assigned to label
}

function Update () {

}

function OnClick(){
	Application.LoadLevel("Runner");
}