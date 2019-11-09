
function buttonAction(action,nr){
 	var buttonFunc;
 	switch (action){
 		case "move": buttonFunc=ba_move(); break;
 		case "taUppSak": buttonFunc=taUppSak(nr); break;
		case "eat": break;
		case "dice": break;
 		break;

 	}
 	
 	return buttonFunc;
}

function ba_taUppsak(nr){


}
function ba_move(){
	gameStatus="move";
}