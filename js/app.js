'use strict';
//---------------------------------Global Declarations---------------------------------//
MallItem.allItems = [];

var mallParent = document.getElementById('mall');
var leftMall = document.getElementById('left');
var centerMall = document.getElementById('center');
var rightMall = document.getElementById('right');

var leftIndex = null;
var centerIndex = null;
var rightIndex = null;

var mallVotes = 0;
var totalRounds = 5;

console.log('Array of all items', MallItem.allItems);

//--------------------------------Constructor Function----------------------------------//
function MallItem(name,source){
    this.name = name;
    this.source = source;
    this.clicked  = 0;
    this.views =  0;
//-----------------------------Add new "MallItem" to array------------------------------//
    MallItem.allItems.push(this);
}
//------------------------Instantiating new Mall Items into Array-----------------------//
new MallItem('R2D2 Luggage', '/img/bag.jpg');
new MallItem('Banana Slicer', '/img/banana.jpg');
new MallItem('Tablet TP Holder', '/img/bathroom.jpg');
new MallItem('Open-toe Boots', '/img/boots.jpg');
new MallItem('All-in-1 Appliance','/img/breakfast.jpg');
new MallItem('Meatball Gum', '/img/bubblegum.jpg');
new MallItem('Uncomfortable Chair', '/img/chair.jpg');
new MallItem('Alien Action  Figure', '/img/cthulhu.jpg');
new MallItem('Duck Muzzle', '/img/dog-duck.jpg');
new MallItem('Canned Draggon  Meat', '/img/dragon.jpg');
new MallItem('Pen Utensils', '/img/pen.jpg');
new MallItem('Pet Sweeping Booties', '/img/sweep.png');
new MallItem('Sleeping Bag', '/img/tauntaun.jpg');
new MallItem('Canned Unicorn Meat', '/img/unicorn.jpg');
new MallItem('USB Lizard Tail', '/img/usb.gif');
new MallItem('Reverse Water Can', '/img/water-can.jpg');
new MallItem('Smell It All Wine Glass', '/img/wine-glass.jpg');

//------------------------------Random Number Generator----------------------------------//
function randomItem(){
    var randomNumber = Math.floor(Math.random() * MallItem.allItems.length)
    return randomNumber;
}

console.log('Random Item #:',randomItem());

//------------------------------Render Mall Item Images----------------------------------//
function renderItems(){

var itemArray = [];
itemArray[0] = randomItem();
itemArray[1] = randomItem();

while (itemArray[0] === itemArray[1]){
    itemArray[1] = randomItem();
}
itemArray[2] = randomItem();

while (itemArray[1] === itemArray[2] || itemArray[0] === itemArray[2]){
itemArray[2] = randomItem();
}

leftMall.src = MallItem.allItems[itemArray[0]].source;
centerMall.src = MallItem.allItems[itemArray[1]].source;
rightMall.src = MallItem.allItems[itemArray[2]].source;

leftMall.title = MallItem.allItems[itemArray[0]].name
centerMall.title = MallItem.allItems[itemArray[1]].name
rightMall.title = MallItem.allItems[itemArray[2]].name
}
//------------------------------Creation of Click Function-------------------------------//
var handleClickOnItem = function(event){
    var itemClicked = event.target.id;
    var title = event.target.title;
 
    console.log(leftMall.title)
    console.log(centerMall.title) 
    console.log(rightMall.title)
    
    // if(title)
    
    if(itemClicked === leftMall || itemClicked === centerMall || itemClicked === rightMall){
        mallVotes++;
        if(itemClicked === leftMall){
            MallItem.allItems.clicked++;
        }
        else if(itemClicked === centerMall){
            MallItem.allItems.clicked++;
        }
        else if(itemClicked === rightMall){
            MallItem.allItems.clicked++;
        }
        else{
            alert('You clicked incorrectly');
        }
    }
    if(mallVotes === totalRounds){
        mallParent.removeEventListener('click',handleClickOnItem);
        alert('Thank you for your votes');
        
        for (var i=0; i<MallItem.allItems.length; i++){
            var item = MallItem.allItems[i];
            console.log('${item.name} received ${item.clicked} votes with ${goat.views} views.');
        }
    }else {
        renderItems();
    }
    console.log('Item Clicked:', itemClicked);
}
// console.log('Mall Votes:', mallVotes, 'Total Rounds:', totalRounds);



//----------------------------------Executable Code---------------------------------//
renderItems();
mallParent.addEventListener('click', handleClickOnItem);
