var database ,dog,dog1,dog2
var position
//var form
var feed,add;
var foodobject;
var Feedtime;
var Lastfeed;
var gameState=0;
var bedroom1,washroom1,garden1;

//Create variables here

function preload(){
bedroom1=loadImage("dogimage/BedRoom.png");
garden1=loadImage("dogimage/Garden.png");
washroom1=loadImage("dogimage/washRoom.png")
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
 
 
  foodobject=new Food();
  
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
   
  var readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DOG")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 
 
if(gameState !="Hungry"){
feed.hide();
add.hide();
} else{
 feed.show();
 add.show();
 dog.addImage(dogimg1);

}
 fill(255,255,254);
 textSize(15);
 currentTime=hour();
 if (currenTime=(Lastfeed+1)) {

update("Playing");
foodobject.garden();
   
 } 
   else if(currenTime==(Lastfeed+2)){
     update("Sleeping");
     foodobject.bedroom();
   } 
   else if(currenTime>(Lastfeed+2)&& currenTime<=(Lastfeed+4)){
     update("Bathing");
     foodobject.washroom();
   } else{
     update("Hungry")
     foodobject.display();
   }

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
function update(state){
  
  database.ref('/').update({
    gameState:state
  })
}
