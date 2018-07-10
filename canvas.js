var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var debug = document.querySelector(".debug");

canvas.width = innerWidth;
canvas.height = innerHeight;

const velocity_y = 30;
const velocity_x = 0.5
const friction = 0.9;

var limit = 600;

var cloudArr = [];
var cloud_num = 8;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }
var sources = {
    /* walk */
    "walk1_0_0": "src/walk1_0_0.png",
    "walk1_1_0": "src/walk1_1_0.png",
    "walk1_2_0": "src/walk1_2_0.png",
    "walk1_3_0": "src/walk1_3_0.png",
    "walk1_0_1": "src/walk1_0_1.png",
    "walk1_1_1": "src/walk1_1_1.png",
    "walk1_2_1": "src/walk1_2_1.png",
    "walk1_3_1": "src/walk1_3_1.png",

    /* stand */

    "stand1_0_0": "src/stand1_0_0.png",
    "stand1_1_0": "src/stand1_1_0.png",
    "stand1_2_0": "src/stand1_2_0.png",
    "stand1_0_1": "src/stand1_0_1.png",
    "stand1_1_1": "src/stand1_1_1.png",
    "stand1_2_1": "src/stand1_2_1.png",

    /* jump */
    "jump1_0_0": "src/jump1_0_0.png",
    "jump1_0_1": "src/jump1_0_1.png",

    /* SWINGO1 */
    "swingO1_0_0": "src/swingO1_0_0.png",
    "swingO1_1_0": "src/swingO1_1_0.png",
    "swingO1_2_0": "src/swingO1_2_0.png",
    "swingO1_0_1": "src/swingO1_0_1.png",
    "swingO1_1_1": "src/swingO1_1_1.png",
    "swingO1_2_1": "src/swingO1_2_1.png",

    /* tree*/

    "tree0": "src/tree0.png",
    "tree1": "src/tree1.png",

    /* ground */
    "ground": "src/ground.png",

    /* cloud */
    "cloud": "src/cloud.png",




};
console.log(typeof(sources));
loadImages(sources,function (images){

    controller = {
        left: false,
        up: false,
        right: false,
        attack: false,
        keyListener: function(event) {
            event.preventDefault();
            var status = (event.type == "keydown") ? true : false;
            switch(event.keyCode) {
                case 37: //left key
                    controller.left = status;
                    break;
                case 38: // upkey
                    controller.up = status;
                    break;
                case 39: // right key
                    controller.right = status;
                    break;
                case 68:
                    object.hp -= 1;
                    break;
                case 67:
                    controller.attack = status;
                    break;
                    
            }
        }
    }

    object = {
        height: 77,
        jump: true,
        right: false,
        width:48,
        x: canvas.width/2,
        dx: 0,
        hp: 100,
        y:0,
        dy: 0,
        num: 0,
        second: 0,
        flip:0,
        max:0,
        count: 0,
        block: false,
        mode: 'stand1',
        action: function() {
            if(controller.up && object.jump == false) {
                object.dy -= velocity_y;
                object.jump = true;
            }

            if((controller.left)) {
                object.dx -= velocity_x;
            }

            if((controller.right)){
                object.dx += velocity_x;
            }
        },
        draw: function () {
            c.beginPath();
            // var img = new Image;   
            if(object.second % 15 == 0) {
                object.count += 1;
            }
            if(controller.left) {
                object.flip = 0;
            }
            if(controller.right) {
                object.flip = 1;
            }
            if(controller.attack) {
                object.mode = 'swingO1';
            } else if(object.dx > 1 || object.dx < -1) {
                object.mode = 'walk1';
            } 
            else if((object.dy > 1.5 || object.dy < -1.5) && object.jump) {
                object.mode = 'jump1';}
            else if((object.dx < 1 || object.dx > -1) && (object.dy < 1.5 || object.dy > - 1.5)){
                object.mode = 'stand1';
            }
            switch(object.mode) {
                case 'jump1':
                    object.max = 1;
                    break;
                case 'stand1':
                    object.max = 3;
                    break;
                case 'swing01':
                    object.max = 3;
                    break;
                case 'walk1':
                    object.max = 4;
                    break;
                
            }
            object.num = object.count % object.max;  
            if(object.mode == 'swingO1') {
                object.block = true;
                if (object.num == 0){
                    object.width = 51;
                    object.height = 71;
                }
                if (object.num == 1) {
                    object.width = 48;
                    object.height = 76;
                }
                if (object.num == 2) {
                    object.width = 62;
                    object.height = 70;
                }
                if(object.num == 3) {
                    object.num = 2;
                }
            } else {
                object.width = 48;
                object.height = 76;
            }
            var selector = object.mode + "_" + + object.num.toString() +"_"+object.flip;
            c.drawImage(images[selector],object.x,object.y,object.width,object.height);
            console.log(images[selector]);
            // img.src = "src/"+object.mode+"_" + object.num.toString() +"_"+object.flip+".png";
            // c.fillRect(object.x,object.y,object.width,object.height);
            // c.drawImage(img,object.x,object.y,object.width,object.height);
            c.closePath();
            c.beginPath();
            if(object.hp > 50) {
                c.fillStyle = "green";
            } else {
                c.fillStyle = "red";
            }
            if(object.hp < 0) {
                object.hp = 0;
            }
            c.rect(object.x-25, object.y - 30, object.hp,20);
            c.fill();
            c.beginPath();
            c.strokeStyle = "black";
            c.strokeStyle = 2;
            c.rect(object.x-25, object.y - 30, 100,20);
            c.stroke();
        },
        limit: function () {

            if(object.y > limit) {
                object.y = limit;
                object.dy = 0;
                object.jump = false;
            }
            if(object.x > innerWidth) {
                object.x = 0;
            }
            if(object.x < -object.width) {
                object.x = innerWidth - object.width;
            }
            if(object.x > 780) {
                limit = 542;
            } else {
                limit = 600;
            }
            if( (777 > Math.floor(object.x) && Math.floor(object.x) > 752) && (object.dy == 0) && (object.y == 600) &&object.flip == 1) {
                object.block = true;
            } else{
                object.block = false;
            }

        },
        control: function () {
            c.clearRect(0,0,innerWidth,innerHeight);
            object.second += 1;
            cloudRender(cloudArr);
            tree0.draw();
            tree1.draw();
            ground.draw();
            object.draw();
            object.action();
            object.dy += 1.5;
            debugMe();
            if(object.block == false) {
                object.x += object.dx;
            } else {
                object.x += 0;
            }
            object.y += object.dy;
            object.limit();
            object.dx *= friction; // velocity giam dan
            object.dy *= friction; // velocity giam dan

            requestAnimationFrame(object.control);
        }

    };
    function debugMe() {
        debug.innerHTML = "object.x: " + object.x + "<br />" + "object.y: " + object.y + "<br />" + "object.dx: " + object.dx + "<br/>" + "object.dy: "+ object.dy +"<br/>"+ "object.block: " + object.block + "<br/>" + "object.jump: " + object.jump + "<br />" + "object.hp: " + object.hp + "<br />" + "object.mode: " + object.mode
        + "<br />" + "object.num: " + object.num + "<br />" + "object.width: " + object.width + "<br />" + "object.height: " + object.height + "<br />" + "object.second: " + object.second;
    }

    ground = {
        width: 1792,
        height: 1317,
        draw: function () {
            c.beginPath();
            c.drawImage(images["ground"],0,0,ground.width,ground.height);
        }
    }

    tree0 = {
        width: 407,
        height: 615,
        draw: function() {
            c.beginPath();
            c.drawImage(images["tree0"],500,100,tree0.width,tree0.height);
        }
    }

    tree1 = {
        width: 497,
        height: 641,
        draw: function() {
            var img = new Image;
            c.beginPath();
            c.drawImage(images["tree1"],1400,100,tree0.width,tree0.height);
        }
    }

    function Cloud(x,y,width,height,dx){
        this.width= width;
        this.height= height;
        this.dx = dx;
        this.x = x;
        this.y = y;
        this.limit = function () {
            if(this.x > canvas.width) {
                this.x = -this.width;
            }
        }
        this.draw = function() {
            c.beginPath();
            c.drawImage(images["cloud"],this.x,this.y,this.width,this.height);
        }
        this.render = function () {
            this.limit();
            this.draw();
            this.x += this.dx;
        }
    } 

    function init() {
        for(var i = 0; i < cloud_num; i++) {
            var randomX = Math.random()*canvas.width;
            var randomY = Math.random()*150;
            var randomDX = Math.random()*3;
            cloudArr.push(new Cloud(randomX,randomY,200,102,randomDX));
        }
    }

    function cloudRender(arr) {
        for(let i = 0; i < arr.length; i++) {
            arr[i].render();
        }
    }

    init();
    requestAnimationFrame(object.control);
    window.addEventListener("keydown",controller.keyListener,false);
    window.addEventListener("keyup",controller.keyListener,false);
});
