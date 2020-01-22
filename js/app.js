'use strict';
//---------------------------------Global Declarations---------------------------------//
MallItem.allItems = [];
var itemHistory = [];

var mallParent = document.getElementById('mall');
var leftMall = document.getElementById('left');
var centerMall = document.getElementById('center');
var rightMall = document.getElementById('right');

var leftIndex = null;
var centerIndex = null;
var rightIndex = null;

var mallVotes = 0;
var totalRounds = 25;

// console.log('Array of all items', MallItem.allItems);

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
    //Ensures that there is 3 different images.
    
    historyQuery();
    //if you have made it to this point, should have 3 different images and images will render.
    leftMall.src = MallItem.allItems[leftIndex].source;
    MallItem.allItems[leftIndex].views++;
    
    centerMall.src = MallItem.allItems[centerIndex].source;
    MallItem.allItems[centerIndex].views++;
    
    rightMall.src  = MallItem.allItems[rightIndex].source;
    MallItem.allItems[rightIndex].views++;
    
    //------------------------------Prevent Consecutive Views---------------------------------//
    
    // console.log(itemHistory);
    console.log('mall items.allitems', MallItem.allItems);
};
function historyQuery(){
    do {
        var duplicateFound = false;//Assumption that images are not duplicate or in prior history
        do {// checks if there are any duplicates in current cycle
            leftIndex = randomItem();
            centerIndex = randomItem();
            rightIndex = randomItem();
            }while (leftIndex === rightIndex || centerIndex === leftIndex ||  centerIndex === rightIndex);


        for (var i=0; i<itemHistory.length; i++){// verifys duplicates in next cycle
            if (leftIndex === itemHistory[i] || centerIndex === itemHistory[i] || rightIndex === itemHistory[i]){
                duplicateFound = true;
            }
        }
} while (duplicateFound === true);


itemHistory.unshift(leftIndex,centerIndex,rightIndex);
if (itemHistory.length > 6){
itemHistory.pop();
itemHistory.pop();
itemHistory.pop();
}
}

//------------------------------Creation of Click Function-------------------------------//
var handleClickOnItem = function(event){
    var itemClicked = event.target.id;//left right or center

    if(itemClicked === leftMall.id || itemClicked === centerMall.id || itemClicked === rightMall.id){
        mallVotes++;

        if(itemClicked === 'left'){
            MallItem.allItems[leftIndex].clicked++;
        }
        else if(itemClicked === 'center'){
            MallItem.allItems[centerIndex].clicked++;
        }
        else if(itemClicked === 'right'){
            MallItem.allItems[rightIndex].clicked++;
        }
        else{
            alert('You clicked incorrectly');
        }
    }
// console.log(mallVotes);

    if(mallVotes === totalRounds){
        mallParent.removeEventListener('click', handleClickOnItem);
        alert('Thank you for your votes');
        
        for (var i=0; i<MallItem.allItems.length; i++){
            var item = MallItem.allItems[i];
            console.log(`${item.name} received ${item.clicked} votes with ${item.views} views.`);
        }
    }else {
        renderItems();
    }
    console.log('Item Clicked:', itemClicked);
}
// console.log('Mall Votes:', mallVotes, 'Total Rounds:', totalRounds);



//-------------------------------------Executable Code------------------------------------//
renderItems();
mallParent.addEventListener('click', handleClickOnItem, true);
//----------------------------Chart JS & THML Canvas Lab----------------------------------//

function renderChart() {
    var labelData = [];
    var clickData = [];
    var viewData = [];
    for (var i = 0; i < MallItem.allItems.length; i++) {
      labelData.push(MallItem.allItems[i].name);
      clickData.push(MallItem.allItems[i].clicked);
      viewData.push(MallItem.allItems[i].views);
    }
  
    var ctx = document.getElementById('my-chart').getContext('2d');
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [{
          label: '# of Clicks',
          data: clickData,
          backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        }, {
          label: '# of Views',
          data: viewData,
          backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
  
  renderChart();