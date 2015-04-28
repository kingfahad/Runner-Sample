#pragma strict

public static var count_A:int;	// counter A for record how many times clicked
public static var count_B:int;    //// counter B for record how many times clicked

public static var defaultFontSize:int = 200; 
public static var scaleFactorW:float = Screen.width/1980F;
public static var scaleFactorH:float = Screen.height/1080F;

function Start () {
}

function Update () {

}

// adjust texture according to screen size
static function adjustScreen(renderer_:SpriteRenderer, transform:Transform){
	var width:float = renderer_.sprite.bounds.size.x;
	var height:float = renderer_.sprite.bounds.size.y;
	
	var worldScreenHeight:float = Camera.main.orthographicSize * 2.0F;
	var worldScreenWidth:float = worldScreenHeight / Screen.height * Screen.width;
	
	transform.localScale = Vector3 (worldScreenWidth / width, worldScreenHeight / height, 0.0F);
}

// adjust texture according to screen size
static function adjustScreen(renderer_:UI2DSprite, transform:Transform){
	var width:float = renderer_.sprite2D.bounds.size.x;
	var height:float = renderer_.sprite2D.bounds.size.y;
	
	var worldScreenHeight:float = Camera.main.orthographicSize * 2.0F;
	var worldScreenWidth:float = worldScreenHeight / Screen.height * Screen.width;
	
	transform.localScale = Vector3 (worldScreenWidth / width, worldScreenHeight / height, 0.0F);
}