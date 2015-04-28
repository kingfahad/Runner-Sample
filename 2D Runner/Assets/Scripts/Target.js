#pragma strict
import NotificationCenter;

public var clip_A:AudioClip;  // here audio clip for to refer sound which you want to play
public var clip_B:AudioClip;  // here audio clip for to refer sound which you want to play
public var heartObj:GameObject; // assigin heart gameobject get affect
public var pawObj:GameObject; // assigin paw gameobject get affect
public var target_A:boolean;   // these are public variables to check whether the current target is A or B. 
public var target_B:boolean;   // because I am using this script on both targets

public var target_A_Default:Sprite;
public var target_B_Default:Sprite;

private var counter_1:GameObject;  // assign counter_1 gameobj 
private var counter_2:GameObject;  // assign counter_2 gameobj 

private var count_1_lbl:UILabel; // here UILabel for 1 var
private var count_2_lbl:UILabel; // here UILabel for 2 var

private var target_B2:Sprite;  //reference of target_B2 sp
private var sp_renderer:SpriteRenderer;  // sprite rendere ref
private var isClicked:boolean = false;

function Start () {
	counter_1 = GameObject.Find("Counter_1").transform.GetChild(0).gameObject; // find the game object's child which is label and assign 
	counter_2 = GameObject.Find("Counter_2").transform.GetChild(0).gameObject;
	
	count_1_lbl = counter_1.GetComponent(UILabel);// get component uilabel from counter_1 gameobj
	count_2_lbl = counter_2.GetComponent(UILabel);// get component uilabel from counter_1 gameobj
	
	if(target_B){
		target_B2 = Resources.Load("Assets/Data/target_B2", Sprite); // here I am getting target_B2.png as sprite to change 
																	   // at run time
		Debug.Log("target_B2 = " + target_B2);
	}
}

function Update () {
	if (Input.GetMouseButtonDown(0)) {
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if (Physics.Raycast(ray, hit)) {
			if (hit.collider != null){
				Debug.Log("Update..hit");
				updateUI();
				hit.collider.enabled = false;
			}
		}
	}
}

function updateUI(){     // here function would call when user click/touch on target
     if(target_A && !isClicked){
		isClicked = true;
		
		//audio source play sound at position of target
		//AudioSource.PlayClipAtPoint(clip_A, transform.position);
		Utils.count_A++; //increament of counter I am using static Count var so that its value would be retain also in other 
						 //gameobjects
		var val = (Utils.count_A + Utils.count_B);
		count_1_lbl.text = ""+ (Utils.count_A + Utils.count_B);	// set value to counter 1 label
		heartObj.SetActive(true); // enable heart to fade which is basically child of target A	
		
		PlayerPrefs.SetInt("count_1" , val); //here save count 1 val to display on gameover screen
		// here posting notification to progress bar when target A is clicked 
		NotificationCenter.DefaultCenter.PostNotification(this, "onTargetA");			 
	}
	else if(target_B && !isClicked){
		isClicked = true;
		// audio source play sound at position of target
		//AudioSource.PlayClipAtPoint(clip_B, transform.position);
	    Utils.count_B++; 
	    sp_renderer.sprite = target_B2; // here change texture on click target B
	    pawObj.SetActive(true); // enable paw to fade which is basically child of target A	
	    
	    PlayerPrefs.SetInt("count_2" ,  Utils.count_B); //here save count 2 val to display on gameover screen
	    count_1_lbl.text = ""+ (Utils.count_A + Utils.count_B);	// set value to counter 1 label	
		count_2_lbl.text = ""+ Utils.count_B;// set value to counter 2 label	
	}
} 

function OnEnable () {// here enable would called when gameobject enables here I want to make target to default state when it comes again
	print("script was enabled");
	sp_renderer = GetComponent(SpriteRenderer);  // get component of sprite renderer to assign changed sprite at run time
}

function OnDisable () {
	print("script was removed");
	isClicked = false;
	if(target_A){
		 sp_renderer.sprite = target_A_Default;
		 heartObj.SetActive(false);
	}
	else if(target_B){
		sp_renderer.sprite = target_B_Default;
		pawObj.SetActive(false);
	}
}

