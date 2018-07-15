var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var debug = document.querySelector(".debug");

canvas.width = innerWidth;
canvas.height = innerHeight;

const velocity_y = 30;
const velocity_x = 0.5
const friction = 0.9;

var limit = 0;
var value_x;
var cloudArr = [];
var treeArr = [];
var bushArr = [];
var cloud_num = 8;
var tree_num = 2;
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
    console.log(images);

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
    "corner_tree": "src/corner-tree.png",
    "default_tree": "src/tree.png",

    /* ground */
    "ground": "src/ground.png",

    /* cloud */
    "cloud0":"src/__resource___cloud_pack_by_bathtoys-danfp8d/Sunset/Sunset (1).png",
    "cloud1":"src/__resource___cloud_pack_by_bathtoys-danfp8d/Sunset/Sunset (10).png",
    "cloud2":"src/__resource___cloud_pack_by_bathtoys-danfp8d/Sunset/Sunset (13).png",
    /* bush */
    "bush0":"src/bush.png",

    /* tiles */
    "tile" : "src/tile1.png"


};
loadImages(sources,function (images){

    drawMap = {
        ratio: undefined,
        buffer:document.createElement("canvas").getContext("2d"),
        context:document.querySelector("canvas").getContext("2d"),
        tile : {
            image: new Image(),
            columns: 3,
            height_t: 60,
            width_t: 90,
        },

        render : function () {
            for(let index = 0; index < map.setup.length; index++) {
                var value = map.setup[index];

                var cut_x = (value % this.tile.columns) * this.tile.width_t;
                var cut_y = Math.floor(value / this.tile.columns) * this.tile.height_t;

                var final_x = (index % map.columns) * this.tile.width_t;
                var final_y = Math.floor(index / map.columns) * this.tile.height_t;
                var current_pos0 = Math.floor(object.x);
                if(value == 8) {
                    if( (final_x > current_pos0 && current_pos0 > final_x - 50) && (object.y >= final_y) && object.flip == 1){
                        object.block = true;
                    } else{
                        object.block = false;
                    }
                    if(object.block == false) {
                        object.x += object.dx;
                    } else {
                        object.x += 0;
                    }
                }
                if(value == 1 || value == 8){
                    value_x = final_y;
                    if(final_x + this.tile.width_t-25 >= current_pos0 && current_pos0 > final_x-35 && object.y <= final_y+60) {
                        limit = final_y-60;
                    }
                    if(object.y > limit) {
                        object.y = limit;
                        object.dy = 0;
                        object.jump = false;
                    }
                }
                this.buffer.drawImage(this.tile.image,cut_x,cut_y,this.tile.width_t,this.tile.height_t,final_x,final_y,this.tile.width_t,this.tile.height_t);
            }

            this.context.drawImage(this.buffer.canvas,0,0,map.width_t,map.height_t,0,0,this.context.canvas.width, this.context.canvas.height)
        },

        resize: function () {
            drawMap.context.canvas.width = document.documentElement.clientWidth - 90;

            if(drawMap.context.canvas.width > document.documentElement.clientHeight - 60) {
                display.context.canvas.width = document.documentElement.clientHeight -60;
            }

            drawMap.context.canvas.height = drawMap.context.canvas.width * drawMap.ratio;

            drawMap.buffer.imageSmoothingEnabled = drawMap.buffer.imageSmoothingEnabled = false;
            drawmap.render();
        }
    },
    map = {
        setup: [
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            6,6,6,6,6,6,6,6,6,8,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,
            4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
            4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
            4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
            4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
            4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
            7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
        ],
        columns: 22,
        height_t: canvas.height,
        width_t: canvas.width,
    },

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
            // c.fillRect(object.x,object.y,object.width,object.height);
            c.drawImage(images[selector],object.x,object.y,object.width,object.height);
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

            if(object.x > innerWidth) {
                object.x = 0;
            }
            if(object.x < -object.width) {
                object.x = innerWidth - object.width;
            }
        },
        control: function () {
            object.second += 1;
            object.draw();
            object.action();
            object.dy += 1.5;
            debugMe();
            object.y += object.dy;
            object.limit();
            object.dx *= friction; // velocity giam dan
            object.dy *= friction; // velocity giam dan

        }

    };
    function debugMe() {
        debug.innerHTML = "object.x: " + object.x + "<br />" + "object.y: " + object.y + "<br />" + "object.dx: " + object.dx + "<br/>" + "object.dy: "+ object.dy +"<br/>"+ "object.block: " + object.block + "<br/>" + "object.jump: " + object.jump + "<br />" + "object.hp: " + object.hp + "<br />" + "object.mode: " + object.mode
        + "<br />" + "object.num: " + object.num + "<br />" + "object.width: " + object.width + "<br />" + "object.height: " + object.height + "<br />" + "object.second: " + object.second
        + "<br />" + "value: " + value_x; ;
    }

    function Tree(width,height,x,y,type) {
        this.width = width;
        this.height = height;
        this.type = type;
        this.x = x;
        this.y = y;
        this.render= function () {
            c.beginPath();
            c.drawImage(images[type],this.x,this.y,this.width,this.height);
        }
    }
    function Cloud(x,y,width,height,dx){
        this.width= width;
        this.height= height;
        this.dx = dx;
        this.x = x;
        this.y = y;
        var randomCloud = Math.floor(Math.random()*3);
        this.limit = function () {
            if(this.x > canvas.width) {
                this.x = -this.width;
            }
        }
        this.draw = function() {
            c.beginPath();
            var name = "cloud" + randomCloud;
            c.drawImage(images[name],this.x,this.y,this.width,this.height);
        }
        this.render = function () {
            this.limit();
            this.draw();
            this.x += this.dx;
        }
    } 
    function Bush(x,y,width,height,type) {
        this.width = width;
        this.height = height;
        this.type = type;
        this.x = x;
        this.y = y;
        this.render= function () {
            c.beginPath();
            c.drawImage(images[type],this.x,this.y,this.width,this.height);
        }
    }
    function init() {
        cloudArr = [];
        treeArr = [];
        bushArr = [];
        for(var i = 0; i < cloud_num; i++) {
            var randomX = Math.random()*canvas.width;
            var randomY = Math.random()*150;
            var randomDX = Math.random()*3;
            cloudArr.push(new Cloud(randomX,randomY,200,102,randomDX));
        };
        treeArr.push(new Tree(230,381,0,300,"corner_tree"));
        treeArr.push(new Tree(1047,878,550,-250,"default_tree"));
        bushArr.push(new Bush(630,570,160,118,"bush0"));
    }

    function objectRender(arr) {
        for(let i = 0; i < arr.length; i++) {
            arr[i].render();
        }
    }

    function animation() {
        c.clearRect(0,0,innerWidth,innerHeight);
        objectRender(cloudArr);
        objectRender(treeArr);
        requestAnimationFrame(animation);
        object.control();
        objectRender(bushArr);
        drawMap.render();
    }
    init();
    window.addEventListener("resize",init,false);
    window.addEventListener("keydown",controller.keyListener,false);
    window.addEventListener("keyup",controller.keyListener,false);
    drawMap.tile.image.addEventListener("load", function (a) {
        drawMap.buffer.canvas.height = map.height_t;
        drawMap.buffer.canvas.width = map.width_t;
        drawMap.ratio = map.height_t/map.width_t;
    });
    drawMap.tile.image.src = images["tile"].src;
    animation();

});
