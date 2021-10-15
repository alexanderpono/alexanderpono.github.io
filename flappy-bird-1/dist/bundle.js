/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/API.js":
/*!***********************!*\
  !*** ./src/js/API.js ***!
  \***********************/
/*! exports provided: UI_ln, UI_echo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI_ln", function() { return UI_ln; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI_echo", function() { return UI_echo; });
function UI_ln(msg) {
    console.log(msg);
}

function UI_echo(varName, val) {
    UI_ln(varName + "=" + val);
}





/***/ }),

/***/ "./src/js/SIM/SIM.js":
/*!***************************!*\
  !*** ./src/js/SIM/SIM.js ***!
  \***************************/
/*! exports provided: INTRO, PLAY, GAME_OVER, SIM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTRO", function() { return INTRO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAY", function() { return PLAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_OVER", function() { return GAME_OVER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIM", function() { return SIM; });
// (c) Alexander Ponomarenko brain16383@yandex.ru

window.CSIM_simulation = function()
{
    SIM.newTick();
}

const INTRO = 'intro';
const PLAY = 'play';
const GAME_OVER = 'gameOver';


var SIM = {
    SIMTime : null,
    SIMBird : null,
    SIMCollide : null,
    SIMBricks : null,
    UI: null,
    state : INTRO,
    m_tickStep : 0.05,

    init : function()
    {
        this.SIMTime.init(this.m_tickStep);
        this.SIMBird.init(this.m_tickStep);
        this.SIMCollide.init();
        this.SIMBricks.init();
    },

    go : function(gameState)
    {
        if (typeof gameState === "undefined") {
            gameState = INTRO;
        }
        this.setState(gameState);
        this.SIMTime.start();
        this.SIMBird.start();
        this.SIMCollide.start();
        this.SIMBricks.start();
        this.tick();
    },

    tick : function()
    {
        this.SIMBird.calc();
        if (
            this.SIMCollide.collisionWithGround() ||
            this.SIMCollide.collisionWithSky() ||
            this.SIMCollide.collisionWithBrick()
        )
        {
            this.setState(GAME_OVER);
        };

        this.UI.draw();
        if(this.playing())
        {
            var timeToSleep = this.SIMTime.getSleepTime();
            setTimeout("CSIM_simulation()", timeToSleep);

        };
        this.SIMBricks.update();
    },

    newTick : function()
    {
        this.SIMTime.newTick();
        this.tick();
    },

    gameIsOver() {
        return (this.state === GAME_OVER);
    },

    playing() {
        return (this.state === PLAY);
    },

    isIntro() {
        return (this.state === INTRO);
    },

    setState(newState) {
        this.state = newState;

        let body = document.getElementById('body');
        body.className = newState;
    },

    getState() {
        return this.state;
    },

    restartGame() {
        this.SIMBricks.init();
        this.go(PLAY);
    },

    setSIMTime(SIMTime) {
        this.SIMTime = SIMTime;
    }
};



/***/ }),

/***/ "./src/js/SIM/SIMBird.js":
/*!*******************************!*\
  !*** ./src/js/SIM/SIMBird.js ***!
  \*******************************/
/*! exports provided: SIMBird */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIMBird", function() { return SIMBird; });
var SIMBird = {
    m_instanceName : 'SIM.SIMBird',
    m_m : 0.05,
    m_g : 2* 0.98,
    m_aLift : 4*0.98,

    m_dt : 1,

    m_startX : 10.5,
    m_lastX : 0,
    m_vX : 3,
    m_distance : 0,

    m_startY : 10,
    m_lastY : 0,
    m_y : 0,


    m_startVY : 3.0,
    m_lastVY : 3.0,
    m_vY : 0,

    m_a : 0,

    m_r : 0.66,
    UIViewPort: null,
    UIKB: null,

    init : function(dt)
    {
        if (typeof (dt) != "undefined")
        {
            this.m_dt = dt;
        };

    },

    getSimR() {
        return this.m_r;
    },

    start : function()
    {
        this.m_startX = this.UIViewPort.getVPModelW() / 4;

        this.m_x       = this.m_startX;
        this.m_lastX   = this.m_x;

        this.m_y       = this.m_startY;
        this.m_lastY   = this.m_y;
        this.m_vY      = this.m_startVY;
        this.m_lastVY  = this.m_startVY;
    },

    calc : function()
    {
        this.calcX();
        this.calcY();
        this.m_distance = this.m_x - this.m_startX;
    },

    calcX : function()
    {
        this.m_x       = this.m_lastX + (this.m_vX * this.m_dt);

        this.m_lastX   = this.m_x;
    },


    calcY : function()
    {
        var liftEnabled = 0;
        if  (this.UIKB.getKeyPressed())
        {
            liftEnabled = 1.0;
        };

        this.m_a    = -this.m_g + (liftEnabled * this.m_aLift);
        this.m_vY   = this.m_lastVY + (this.m_a * this.m_dt);
        this.m_y    = this.m_lastY + (this.m_vY * this.m_dt);

        this.m_lastVY  = this.m_vY;
        this.m_lastY   = this.m_y;
    },

    getY : function ()
    {
        return this.m_y;
    },

    getX : function ()
    {
        return this.m_x;
    },

    getR : function ()
    {
        return this.m_r;
    },

    getDistance : function ()
    {
        return this.m_distance;
    }

};



/***/ }),

/***/ "./src/js/SIM/SIMBricks.js":
/*!*********************************!*\
  !*** ./src/js/SIM/SIMBricks.js ***!
  \*********************************/
/*! exports provided: SIMBricks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIMBricks", function() { return SIMBricks; });
var SIMBricks = {
    m_instanceName : 'SIM.SIMBricks',
    m_data : [],
    UIViewPort: null,
    UIBricks: null,
    SIMBird: null,

    init() {
        this.build();
    },

    start() {
    },

    build() {
        this.m_data = [[5,0,5], [10,0,4],[15,15,5], [20,0,3], [25,0,8], [30,0,5], [30,10,10]];
        //x,y,h
    },

    getData() {
        return this.m_data;
    },

    update() {
        const distance   = this.SIMBird.getDistance();
        const VPModelW   = this.UIViewPort.getVPModelW();
        const brickSimW  = this.UIBricks.getBrickSimW();
        let bricksCount = this.m_data.length;
        let availableBricks = this.getAvailableBricks();
        for (let i=0; i<this.m_data.length; i++)
        {
            let brickAr = this.m_data[i];

            if (!this.isBrickVisible(brickAr))
            {
                let retries = 20;
                for (let j=0; j<retries; j++) {
                    var newBrick = this.createBrick(bricksCount);
                    const ok = this.isNewBrickOk(newBrick, availableBricks);
                    if (ok) {
                        break;
                    }
                    else {
                    };
                };
                this.m_data[i] = newBrick;
                availableBricks = this.getAvailableBricks();
                bricksCount++;
            };
        };

    },

    getAvailableBricks() {
        let visibleBricks = [];
        for (let i=0; i<this.m_data.length; i++) {
            let brickAr = this.m_data[i];
            if (this.isBrickVisible(brickAr)) {
                visibleBricks[i] = brickAr;
            };
        };
        return visibleBricks;
    },

    isBrickVisible(brickAr) {
        const distance   = this.SIMBird.getDistance();
        const brickSimW  = this.UIBricks.getBrickSimW();
        const simX = brickAr[0];
        const brickIsVisible = !((simX + brickSimW) < distance);
        return brickIsVisible;
    },

    isNewBrickOk(newBrick, availableBricks) {
        let ok = true;
        let [x, y, h] = newBrick;
        var VPModelH   = this.UIViewPort.getVPModelH();
        availableBricks.forEach((brick) => {
            let [brickX, brickY, brickH] = brick;
            let testX = (Math.abs(x - brickX) <= 1);

            const dx = Math.abs(x - brickX);
            const dy = VPModelH - brickH - h;

            if (
                (dx <= 1) ||
                (dx*dy < 6)
            ) {
                ok = false;
            };

        });

        return ok;
    },

    createBrick(bricksCount) {
        let rndTopBottom  = Math.random();
        let simH          = Math.round(Math.random() * 10);
        let top = false;
        if (rndTopBottom < 0.5) {
            top = true;
        };

        const simX = Math.round(this.SIMBird.getDistance() +
            this.UIViewPort.getVPModelW() + Math.random() * bricksCount);

        let simY = 0;

        if (top) {
            simY = this.UIViewPort.getVPModelH() - simH;
        };

        return [simX, simY, simH];
    }


};


/***/ }),

/***/ "./src/js/SIM/SIMCollide.js":
/*!**********************************!*\
  !*** ./src/js/SIM/SIMCollide.js ***!
  \**********************************/
/*! exports provided: SIMCollide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIMCollide", function() { return SIMCollide; });
/* harmony import */ var _SIM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SIM.js */ "./src/js/SIM/SIM.js");
/* harmony import */ var _API_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../API.js */ "./src/js/API.js");




var SIMCollide = {
    m_instanceName : "SIM.SIMCollide",
    m_skyY : 20,
    m_groundY : 0,
    UIViewPort: null,
    SIMBird: null,

    init : function(dt) {
    },

    start : function() {
    },

    collisionWithGround : function()  {
        var birdY = this.SIMBird.getY();
        var r = this.SIMBird.getR();
        var code = false;
        if (birdY - r <= this.m_groundY)
        {
            code = true;
        };

        return code;
    },

    collisionWithSky : function() {
        var birdY = this.SIMBird.getY();
        var r = this.SIMBird.getR();
        var code = false;
        if (birdY + r >= this.m_skyY)
        {
            code = true;
        };

        return code;
    },

    getDistance : function(x0, y0, x1, y1) {
        var dx = x1-x0;
        var dy = y1-y0;

        var d = Math.sqrt(dx*dx + dy*dy);
        return d;
    },

    insideBox : function(x, y, minX, minY, maxX, maxY)
    {
        var insideX = false;
        var insideY = false;

        if ((minX <= x) && (x <= maxX))
        {
            insideX = true;
        };

        if ((minY <= y) && (y <= maxY))
        {
            insideY = true;
        };

        var code = false;
        if (insideX && insideY)
        {
            code = true;
        };

        return code;
    },

    collisionWithBrick : function()
    {
        var brickDataAr   = _SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].SIMBricks.getData();
        var kAr           = this.UIViewPort.getK();
        var kX            = kAr[0];
        var simW          = 20 / kX;
        var birdSimX      = this.SIMBird.getX();
        var birdSimY      = this.SIMBird.getY();
        var birdSimR      = this.SIMBird.getR();

        var bird_xR = birdSimX + birdSimR;
        var bird_yR = birdSimY;
        var bird_xU = birdSimX;
        var bird_yU = birdSimY + birdSimR;
        var bird_xL = birdSimX - birdSimR;
        var bird_yL = birdSimY;
        var bird_xD = birdSimX;
        var bird_yD = birdSimY - birdSimR;



        var i;
        var code = false;
        for (i=0; i<brickDataAr.length; i++)
        {
            var brickAr = brickDataAr[i];
            var simX = brickAr[0];
            var simY = brickAr[1];
            var simH = brickAr[2];

            var xLD  = simX;
            var yLD  = simY;
            var xLU  = xLD;
            var yLU  = yLD + simH;
            var xRD  = simX + simW;
            var yRD  = simY;
            var xRU  = xRD;
            var yRU  = yLU;

            var dLD = this.getDistance(birdSimX, birdSimY, xLD, yLD);
            var dLU = this.getDistance(birdSimX, birdSimY, xLU, yLU);
            var dRD = this.getDistance(birdSimX, birdSimY, xRD, yRD);
            var dRU = this.getDistance(birdSimX, birdSimY, xRU, yRU);
            if (
                (dLD < birdSimR) ||
                (dLU < birdSimR) ||
                (dRD < birdSimR) ||
                (dRU < birdSimR)
            )
            {
                code = true;
                break;
            };


            //circle.L, circle.R, circle.U, circle.D are inside box
            var insideL = this.insideBox(bird_xL, bird_yL, xLD, yLD, xRU, yRU);
            var insideR = this.insideBox(bird_xR, bird_yR, xLD, yLD, xRU, yRU);
            var insideU = this.insideBox(bird_xU, bird_yU, xLD, yLD, xRU, yRU);
            var insideD = this.insideBox(bird_xD, bird_yD, xLD, yLD, xRU, yRU);
            if (
                (insideL) ||
                (insideR) ||
                (insideU) ||
                (insideD)
            )
            {
                code = true;
                break;
            };

        };
        return code;
    }

};



/***/ }),

/***/ "./src/js/SIM/SIMTime.js":
/*!*******************************!*\
  !*** ./src/js/SIM/SIMTime.js ***!
  \*******************************/
/*! exports provided: SIMTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIMTime", function() { return SIMTime; });
var SIMTime = {
    m_instanceName : 'SIM.SIMTime',
    m_startTime : 0,
    m_modelTime : 0,
    m_TICK_STEP : 1000,

    init : function(dtSeconds)
    {
        if (typeof (dtSeconds) != "undefined")
        {
            this.m_TICK_STEP = dtSeconds * 1000;
        };
    },

    getSystemTime : function()
    {
        var time = new Date;
        return time.getTime();
    },

    start : function()
    {
        this.m_startTime = this.getSystemTime();
        this.m_modelTime = 0;
    },

    getSleepTime : function()
    {
        var nextTickTime = this.m_startTime + (this.m_modelTime + this.m_TICK_STEP);
        var curTime = this.getSystemTime();
        var sleepTime = nextTickTime - curTime;
        return sleepTime;
    },

    getModelTime : function()
    {
        return this.m_modelTime;
    },

    newTick : function()
    {
        this.m_modelTime = this.m_modelTime + this.m_TICK_STEP;
    }

};



/***/ }),

/***/ "./src/js/UI/UI.js":
/*!*************************!*\
  !*** ./src/js/UI/UI.js ***!
  \*************************/
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return UI; });
/* harmony import */ var _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SIM/SIM.js */ "./src/js/SIM/SIM.js");



var UI = {
    UITimer : null,
    UIBirdY : null,
    UIBird : null,
    UIBirdXY : null,
    UIKB : null,
    UIBricks : null,
    UIViewPort : null,
    UIMessage : null,

    initiable: [
        'UITimer', 'UIBirdY','UIBirdXY','UIKB','UIViewPort','UIBricks','UIBird'
    ],
    drawable: [
        'UIViewPort', 'UITimer', 'UIBirdY','UIBird','UIBirdXY','UIBricks','UIMessage'
    ],

    init : function(newW, newH)
    {
        let me = this;
        this.initiable.forEach(function(item, i, arr) {
            me[item].init(newW, newH);
        });

    },

    draw : function()
    {
        let me = this;
        switch (_SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].getState()) {
            case _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["INTRO"]:
                this.UIViewPort.draw();
                this.UIMessage.draw(_SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["INTRO"]);
                break;

            case _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["GAME_OVER"]:
                this.drawable.forEach(function(item, i, arr) {
                    me[item].draw(_SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["GAME_OVER"]);
                });
                break;

            default:
                this.drawable.forEach(function(item, i, arr) {
                    if (item !== 'UIMessage') {
                        me[item].draw();
                    };
                });

        }
    }
};






/***/ }),

/***/ "./src/js/UI/UIBird.js":
/*!*****************************!*\
  !*** ./src/js/UI/UIBird.js ***!
  \*****************************/
/*! exports provided: UIBird */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIBird", function() { return UIBird; });
var cycle = 30;
var UIBird = {
    m_instanceName : 'UI.UIBird',
    m_imgW : 20,
    m_imgH : 20,
    m_x : 0,
    m_y : 0,
    m_imgCenterDX : 0,
    m_imgCenterDY : 0,
    m_simW: 0,
    UIViewPort: null,
    SIMBird: null,

    init () {
        this.m_kAr  = this.UIViewPort.getK();
        const kX      = this.m_kAr[0];
        const kY      = this.m_kAr[1];
        this.m_simW = 2 * this.SIMBird.getSimR();
        this.m_imgW = this.m_simW * kX;
        this.m_imgH = this.m_simW * kY;

        this.m_imgCenterDX = -this.m_imgW / 2;
        this.m_imgCenterDY = -this.m_imgH / 2;
    },

    draw() {
        const modelX = this.SIMBird.getX();
        const modelY = this.SIMBird.getY();

        let oldX = this.m_x;
        let oldY = this.m_y;
        this.m_x = this.UIViewPort.modelXToScreenX(modelX);
        this.m_y = this.UIViewPort.modelYToScreenY(modelY);

        let {ctx, canvas} = this.UIViewPort.getRenderContext();

        if (cycle >= 0) {
            ctx.strokeStyle = "rgb(255,0,0)";

            ctx.beginPath();
            ctx.arc(this.m_x, this.m_y, this.m_imgW/2, 0, 2*Math.PI, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    },

    getXY() {
        return [this.m_x, this.m_y];
    }

};



/***/ }),

/***/ "./src/js/UI/UIBirdXY.js":
/*!*******************************!*\
  !*** ./src/js/UI/UIBirdXY.js ***!
  \*******************************/
/*! exports provided: UIBirdXY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIBirdXY", function() { return UIBirdXY; });
var UIBirdXY = {
    m_instanceName : 'UI.UIBird',
    UIBird:null,

    init : function() {
    },

    draw : function() {
        var arXY = this.UIBird.getXY();
    }

};



/***/ }),

/***/ "./src/js/UI/UIBirdY.js":
/*!******************************!*\
  !*** ./src/js/UI/UIBirdY.js ***!
  \******************************/
/*! exports provided: UIBirdY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIBirdY", function() { return UIBirdY; });
var UIBirdY = {
    m_instanceName : 'UI.UIBirdY',
    SIMBird: null,

    init : function() {
    },

    draw : function()
    {
        var birdY = this.SIMBird.getY();
    }

};



/***/ }),

/***/ "./src/js/UI/UIBricks.js":
/*!*******************************!*\
  !*** ./src/js/UI/UIBricks.js ***!
  \*******************************/
/*! exports provided: UIBricks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIBricks", function() { return UIBricks; });
/* harmony import */ var _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SIM/SIM.js */ "./src/js/SIM/SIM.js");


var UIBricks = {
    m_instanceName : "UI.UIBricks",
    m_screenW : 20,
    m_simW : 0,
    m_kAr : "",
    UIViewPort: null,
    SIMBird: null,

    init : function()
    {
        this.m_kAr  = this.UIViewPort.getK();
        var kX      = this.m_kAr[0];
        this.m_simW = 1;
    },

    draw : function()
    {
        var dataAr     = _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].SIMBricks.getData();
        var kY         = this.m_kAr[1];
        let kX          = this.m_kAr[0];
        var distance   = this.SIMBird.getDistance();
        var VPModelW   = this.UIViewPort.getVPModelW();

        var i;
        let {ctx} = this.UIViewPort.getRenderContext();
        ctx.strokeStyle = "rgb(255,255,255)";
        for (i=0; i<dataAr.length; i++)
        {
            var brickAr = dataAr[i];
            var simX = brickAr[0];
            var simY = brickAr[1];
            var simH = brickAr[2];

            if ((simX + this.m_simW) < distance) {
                continue;
            };

            if (simX > (distance + VPModelW))
            {
                continue;
            };

            var screenX = this.UIViewPort.modelXToScreenX(simX);
            var screenY = this.UIViewPort.modelYToScreenY(simY);
            var screenH = simH * kY;

            var screenY2 = screenY - screenH;
            var screenW = this.m_simW * kX;
            var screenW2 = screenW / 2;

            ctx.strokeRect(screenX, screenY2, screenW, screenH);

        };

    },

    getBrickSimW : function()
    {
        return this.m_simW;
    }

};


/***/ }),

/***/ "./src/js/UI/UIKeyBoard.js":
/*!*********************************!*\
  !*** ./src/js/UI/UIKeyBoard.js ***!
  \*********************************/
/*! exports provided: UIKeyBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIKeyBoard", function() { return UIKeyBoard; });
/* harmony import */ var _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SIM/SIM.js */ "./src/js/SIM/SIM.js");



var UIKeyBoard = {
    m_instanceName : 'UI.UIKeyBoard',
    m_esc : false,
    m_keyPressed : false,

    init : function() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (keyName === ' ') {
                event.preventDefault();
            }
            if (keyName === 'Escape') {
                this.m_esc = true;
            }
            else {
                this.m_keyPressed = true;
            }
            if (_SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].gameIsOver() || _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].isIntro()) {
                _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].restartGame();
            }
        });

        document.addEventListener('keyup', (event) => {
            this.m_keyPressed = false;
        });

        let a_canvas = document.getElementById('a_canvas');

        a_canvas.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.m_keyPressed = true;

            if (_SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].gameIsOver() || _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].isIntro()) {
                _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["SIM"].restartGame();
            }
        });

        a_canvas.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.m_keyPressed = false;
        });
    },

    getKeyPressed : function()
    {
        return this.m_keyPressed;
    }

};



/***/ }),

/***/ "./src/js/UI/UIMessage.js":
/*!********************************!*\
  !*** ./src/js/UI/UIMessage.js ***!
  \********************************/
/*! exports provided: UIMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMessage", function() { return UIMessage; });
/* harmony import */ var _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SIM/SIM.js */ "./src/js/SIM/SIM.js");
/* harmony import */ var _API_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../API.js */ "./src/js/API.js");




const atomW = 3;
const atomH = 3;
const LETTER_WIDTH = atomW*3;
const LINE_HEIGHT = atomW*5;

const PRIMITIVES_AR = [
    [0.0,0.0, 0.0,0.0],     //
    [0.0,4*atomH, atomW,4*atomH],    //P_1
    [atomW,4*atomH, 2*atomW,4*atomH],//P_2

    [0.0,3*atomH, atomW,3*atomH],    //P_3
    [atomW,3*atomH, 2*atomW,3*atomH],//P_4

    [0.0,2*atomH, atomW,2*atomH],    //P_5
    [atomW,2*atomH, 2*atomW,2*atomH],//P_6

    [0.0,atomH, atomW,atomH],        //P_7
    [atomW,atomH, 2*atomW,atomH],    //P_8

    [0.0,0.0, atomW,0.0],            //P_9
    [atomW,0.0, 2*atomW,0.0],        //P_10

    [0.0,3*atomH, 0.0,4*atomH],        //P_11
    [atomW,3*atomH, atomW,4*atomH],    //P_12
    [2*atomW,3*atomH, 2*atomW,4*atomH], //P_13

    [0.0,2*atomH, 0.0,3*atomH],        //P_14
    [atomW,2*atomH, atomW,3*atomH],    //P_15
    [2*atomW,2*atomH, 2*atomW,3*atomH],//P_16

    [0.0,atomH, 0.0,2*atomH],        //P_17
    [atomW,atomH, atomW,2*atomH],    //P_18
    [2*atomW,atomH, 2*atomW,2*atomH],//P_19

    [0.0,0.0, 0.0,atomH],            //P_20
    [atomW,0.0, atomW,atomH],        //P_21
    [2*atomW,0.0, 2*atomW,atomH],    //P_22

    [0.0,0.0, 0.0,0.0],     //23
    [0.0,0.0, 0.0,0.0],     //24
    [0.0,0.0, 0.0,0.0],     //25
    [0.0,0.0, 0.0,0.0],     //26
    [0.0,0.0, 0.0,0.0],     //27
    [0.0,0.0, 0.0,0.0],     //28
    [0.0,0.0, 0.0,0.0],     //29
    [0.0,0.0, 0.0,0.0],     //30

    [0.0,4*atomH, atomW,2*atomH],       //P_31
    [atomW,2*atomH, 2*atomW,4*atomH],   //P_32
    [0.0,0.0, atomW,2*atomH],           //P_33
    [ atomW,2*atomH, 2*atomW,0.0],      //P_34
    [0.0,4*atomH, atomW,0.0],           //P_35
    [atomW,0.0, 2*atomW,4*atomH],       //P_36
    [0.0,3*atomH, atomW,4*atomH],       //P_37
    [atomW,4*atomH, 2*atomW,3*atomH],   //P_38
    [2*atomW,atomH, atomW,0.0],         //P_39
    [0.0,atomH, atomW,0.0],             //P_40
    [0.0,0.0, atomW,4*atomH],           //P_41
    [atomW,4*atomH, 2*atomW,0.0],       //P_42
    [2*atomW,3*atomH, atomW,2*atomH],   //P_43
    [atomW,2*atomH, 2*atomW,atomH]      //P_44
];

const LETTERS_AR = [
    [13, 2, 1, 11, 14, 17, 20, 9, 10, 22, 19, 6], //G
    [20, 17, 14, 11, 1, 2, 13, 16, 19, 22, 5, 6], //A
    [11, 14, 17, 20, 13, 16, 19, 22, 31, 32, 0, 0], //M
    [2, 1, 11, 14, 17, 20, 9, 10, 5, 6, 0, 0], //E
    [1, 2, 13, 16, 19, 22, 9, 10, 20, 17, 14, 11], //O
    [35, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //V
    [1, 2, 13, 16, 6, 5, 14, 11, 17, 20, 34, 0], //R
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //SPACE
    [1, 2, 12, 15, 18, 21, 0, 0, 0, 0, 0, 0], //T
    [1, 38, 16, 19, 39, 9, 20, 17, 14, 11, 0, 0], //D
    [1, 2, 12, 15, 18, 21, 9, 10, 0, 0, 0, 0], //I
    [2, 1, 11, 14, 17, 20, 23, 24, 9, 10, 0, 0], //C
    [1, 2, 13, 16, 6, 5, 14, 11, 17, 20, 0, 0], //P
    [11, 14, 17, 20, 9, 10, 0, 0, 0, 0, 0, 0],  //L
    [31, 32, 18, 21, 0, 0, 0, 0, 0, 0, 0, 0],  //Y
    [2, 1, 11, 14, 5, 6, 19, 22, 9, 10, 0, 0],  //S
    [20, 17, 14, 11, 31, 34, 22, 19, 16, 13, 0, 0],  //N
    [2, 1, 11, 14, 17, 20, 5, 6],  //F
    [11, 14, 17, 20, 9, 10, 22, 19, 16, 13, 0, 0],  //F
    [11, 14, 17, 20, 1, 38, 43, 44, 39, 9, 5, 0]  //B
];

const L_G = 0, L_A=1, L_M=2, L_E=3, L_O=4, L_V=5, L_R=6, L_SPACE=7, L_T=8, L_D=9, L_I=10,
    L_C=11, L_P=12, L_L=13, L_Y=14, L_S=15, L_N=16, L_F=17, L_U=18, L_B=19;
const letterToCode = {
    'G' : 0,
    'A' : 1,
    'M' : 2,
    'E' : 3,
    'O' : 4,
    'V' : 5,
    'R' : 6,
    ' ' : 7,
    'T' : 8,
    'D' : 9,
    'I' : 10,
    'C' : 11,
    'P' : 12,
    'L' : 13,
    'Y' : 14,
    'S' : 15,
    'N' : 16,
    'F' : 17,
    'U' : 18,
    'B' : 19
};

var UIMessage = {
    GAME_OVER: 1,
    GAME_ABOUT: 2,
    UIViewPort: null,
    color: "rgb(255,255,0)",
    bgColor: "rgb(0,0,0)",
    init(msgType) {
        if (msgType === _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["GAME_OVER"]) {

        }
    },

    draw(state) {
        let message = '';
        let isMobileOrTablet = window.isMobileOrTablet();
        let task = 'PRESS A BUTTON';
        if (isMobileOrTablet) {
            task = 'TAP SCREEN';
        };
        switch (state) {
            case _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["INTRO"]:
                message = `FLYING BALL\n${task}\nTO PLAY`;

                break;
            case _SIM_SIM_js__WEBPACK_IMPORTED_MODULE_0__["GAME_OVER"]:
                message = `GAME OVER\n${task}\nTO PLAY`;
                break;
            default:
                message = '';
        }

        this.renderText(message);
    },

    renderText(text) {
        let lettersAr = text.split('');
        let [lettersNumber, linesNumber] = this.getMaxLettersNumberInLine(lettersAr);

        let viewPortW = this.UIViewPort.m_viewPortW;
        let viewPortH = this.UIViewPort.m_viewPortH;
        let kX = this.getKX(lettersNumber, linesNumber);

        let messageSize = {
            x: lettersNumber * LETTER_WIDTH * kX,
            y: linesNumber * LINE_HEIGHT * kX};
        let messagePos = {
            x: (viewPortW - messageSize.x) / 2.0,
            y: (viewPortH - messageSize.y) / 2.0
        };

        this.renderBox(messagePos, messageSize);
        this.zoomSocial(kX);

        const lettersDX = 2*kX;
        const lettersDY = -2*kX;

        let lineNo = 0;
        let letterNo = 0;
        for (let i=0; i<lettersAr.length; i++) {
            let letter = lettersAr[i];
            if (letter === '\n') {
                letterNo = 0;
                lineNo++;
                continue;
            };
            let letterPos = {
                x: messagePos.x + lettersDX + (LETTER_WIDTH * letterNo * kX),
                y: messagePos.y + lettersDY + lineNo * LINE_HEIGHT * kX
            }

            this.renderLetter(letterPos, letter, kX);
            letterNo++;
        }
    },

    zoomSocial(kX) {
        let newSize = 10 * kX;
        let newSizeS = '' + newSize + 'px';

        let sh = document.getElementsByClassName('sh')[0];
        sh.style.width = newSizeS;
        sh.style.height = newSizeS;

        let fb = document.getElementsByClassName('fb')[0];
        fb.style.width = newSizeS;
        fb.style.height = newSizeS;

        let ig = document.getElementsByClassName('ig')[0];
        ig.style.width = newSizeS;
        ig.style.height = newSizeS;

    },

    getKX(lettersNumber, linesNumber) {
        let viewPortW = this.UIViewPort.m_viewPortW;
        let viewPortH = this.UIViewPort.m_viewPortH;
        let kX = Math.floor(viewPortW / lettersNumber / LETTER_WIDTH);
        if (kX < 0.1) {
            kX = viewPortW / lettersNumber / LETTER_WIDTH;
        }
        let kY = Math.floor(viewPortH / linesNumber / LINE_HEIGHT);
        if (kY < 0.1) {
            kY = viewPortH / linesNumber / LINE_HEIGHT;
        }
        if (kY < kX) {
            kX = kY;
        };
        const maxKX = 6;
        if (kX > maxKX) {
            kX = maxKX;
        };
        return kX;
    },

    getMaxLettersNumberInLine(lettersAr) {
        let linesLettersCount = [];
        let lineNo = 0;
        let letterNo = 0;
        for (let i=0; i<lettersAr.length; i++) {
            let letter = lettersAr[i];
            if (letter === '\n') {
                letterNo = 0;
                lineNo++;
                continue;
            };
            letterNo++;
            linesLettersCount[lineNo] = letterNo;
        };

        let maxLength = -1;
        linesLettersCount.forEach((count) => {
            if (count > maxLength) {
                maxLength = count;
            };
        });
        return [maxLength, linesLettersCount.length];
    },

    renderLetter(letterPos, letter, kX) {
        let letterCode = letterToCode[letter];
        let letterPrimitivesAr = LETTERS_AR[letterCode];

        for (let j=0; j<letterPrimitivesAr.length; j++) {
            let primitiveCode = letterPrimitivesAr[j];
            if (primitiveCode === 0) {
                continue;
            };

            let primitiveAr = PRIMITIVES_AR[primitiveCode];

            this.renderPrimitive (primitiveAr, kX, letterPos);
        }

    },

    renderPrimitive (primitiveAr, kX, letterPos) {
        let primitiveX0 = primitiveAr[0];
        let primitiveY0 = primitiveAr[1];
        let primitiveX1 = primitiveAr[2];
        let primitiveY1 = primitiveAr[3];
        let viewPortH = this.UIViewPort.m_viewPortH;


        let x0 = Math.floor(letterPos.x + primitiveX0 * kX);
        let y0 = Math.floor(letterPos.y + (LINE_HEIGHT - primitiveY0) * kX);
        if (y0 > viewPortH) {
            y0 = viewPortH - 1;
        };

        let x1 = Math.floor(letterPos.x + primitiveX1 * kX);
        let y1 = Math.floor(letterPos.y + (LINE_HEIGHT - primitiveY1) * kX);
        if (y1 > viewPortH) {
            y1 = viewPortH - 1;
        };

        let {ctx} = this.UIViewPort.getRenderContext();
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        ctx.stroke();

    },

    renderBox(messagePos, messageSize) {
        let {ctx} = this.UIViewPort.getRenderContext();
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(messagePos.x, messagePos.y, messageSize.x, messageSize.y);
    }
};



/***/ }),

/***/ "./src/js/UI/UITimer.js":
/*!******************************!*\
  !*** ./src/js/UI/UITimer.js ***!
  \******************************/
/*! exports provided: UITimer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UITimer", function() { return UITimer; });
var UITimer = {
    m_instanceName : 'UI.UITimer',
    SIMTime: null,

    init : function() {
    },

    draw : function()
    {
        var modelTime = this.SIMTime.getModelTime();
        var timeSec = Math.round(modelTime / 1000);
    }

};




/***/ }),

/***/ "./src/js/UI/UIViewPort.js":
/*!*********************************!*\
  !*** ./src/js/UI/UIViewPort.js ***!
  \*********************************/
/*! exports provided: UIViewPort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIViewPort", function() { return UIViewPort; });
/* harmony import */ var _API_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../API.js */ "./src/js/API.js");


let canvas = null;
let ctx = null;
var UIViewPort = {
    m_instanceName : 'UI.UIViewPort',
    m_viewPortH : 300,
    m_viewPortW : 500,
    m_viewPortModelH : 20,
    m_viewPortModelW : 0,
    m_kX : 0,
    m_kY : 0,
    m_scrollViewPort : true,
    SIMBird: null,

    init : function(newW, newH) {
        this.resize(newW, newH);
    },

    draw : function()  {
        let {ctx, canvas} = this.getRenderContext();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },

    modelYToScreenY : function(modelY)
    {
        var screenY = this.m_viewPortH - Math.round(this.m_kY * modelY);
        return screenY;
    },

    modelXToScreenX : function(modelX)
    {
        var distance = this.SIMBird.getDistance();
        if (!this.m_scrollViewPort)
        {
            distance = 0;
        };
        var screenX = Math.round(this.m_kX * (modelX - distance));
        return screenX;
    },

    getK : function ()
    {
        return new Array(this.m_kX, this.m_kY);
    },

    getVPModelW : function ()
    {
        return this.m_viewPortModelW;
    },

    getVPModelH : function ()
    {
        return this.m_viewPortModelH;
    },

    resize(newW, newH) {
        this.m_viewPortW = newW;
        this.m_viewPortH = newH;

        this.m_viewPortModelW = this.m_viewPortModelH / this.m_viewPortH * this.m_viewPortW;

        this.m_kX = this.m_viewPortW / this.m_viewPortModelW;

        this.m_kY = this.m_viewPortH / this.m_viewPortModelH;
    },

    getRenderContext() {
        if (ctx === null) {
            canvas = document.getElementById('a_canvas');
            ctx = canvas.getContext("2d");
        };
        return {ctx, canvas};
    }

};



/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! exports provided: app */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return app; });
/* harmony import */ var _UI_UIBirdXY__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/UIBirdXY */ "./src/js/UI/UIBirdXY.js");
/* harmony import */ var _UI_UIBricks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/UIBricks */ "./src/js/UI/UIBricks.js");
/* harmony import */ var _SIM_SIMCollide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SIM/SIMCollide */ "./src/js/SIM/SIMCollide.js");
/* harmony import */ var _UI_UIBird__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/UIBird */ "./src/js/UI/UIBird.js");
/* harmony import */ var _UI_UIViewPort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI/UIViewPort */ "./src/js/UI/UIViewPort.js");
/* harmony import */ var _SIM_SIMTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SIM/SIMTime */ "./src/js/SIM/SIMTime.js");
/* harmony import */ var _UI_UIBirdY__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UI/UIBirdY */ "./src/js/UI/UIBirdY.js");
/* harmony import */ var _UI_UITimer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UI/UITimer */ "./src/js/UI/UITimer.js");
/* harmony import */ var _UI_UIKeyBoard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UI/UIKeyBoard */ "./src/js/UI/UIKeyBoard.js");
/* harmony import */ var _UI_UIMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./UI/UIMessage */ "./src/js/UI/UIMessage.js");
/* harmony import */ var _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SIM/SIM */ "./src/js/SIM/SIM.js");
/* harmony import */ var _SIM_SIMBricks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SIM/SIMBricks */ "./src/js/SIM/SIMBricks.js");
/* harmony import */ var _UI_UI__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./UI/UI */ "./src/js/UI/UI.js");
/* harmony import */ var _SIM_SIMBird__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./SIM/SIMBird */ "./src/js/SIM/SIMBird.js");















var app = {
    state : _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["INTRO"],

    onResize() {
        this.build();
        this.init();

        switch (this.state) {
            case _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["INTRO"]:
                this.intro();
                break;

            case _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["PLAY"]:
                this.intro();
                break;

            case _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["GAME_OVER"]:
                this.intro();
                break;

        }
    },

    intro() {
        this.build();
        this.init();
        this.state = _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["INTRO"];

        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].go(_SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["INTRO"]);
    },

    build() {
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMTime = _SIM_SIMTime__WEBPACK_IMPORTED_MODULE_5__["SIMTime"];
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird = _SIM_SIMBird__WEBPACK_IMPORTED_MODULE_13__["SIMBird"];
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMCollide = _SIM_SIMCollide__WEBPACK_IMPORTED_MODULE_2__["SIMCollide"];
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBricks = _SIM_SIMBricks__WEBPACK_IMPORTED_MODULE_11__["SIMBricks"];

        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].UI = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UITimer    = _UI_UITimer__WEBPACK_IMPORTED_MODULE_7__["UITimer"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBirdY    = _UI_UIBirdY__WEBPACK_IMPORTED_MODULE_6__["UIBirdY"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBird     = _UI_UIBird__WEBPACK_IMPORTED_MODULE_3__["UIBird"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBirdXY   = _UI_UIBirdXY__WEBPACK_IMPORTED_MODULE_0__["UIBirdXY"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIKB       = _UI_UIKeyBoard__WEBPACK_IMPORTED_MODULE_8__["UIKeyBoard"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIViewPort   = _UI_UIViewPort__WEBPACK_IMPORTED_MODULE_4__["UIViewPort"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBricks   = _UI_UIBricks__WEBPACK_IMPORTED_MODULE_1__["UIBricks"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIMessage   = _UI_UIMessage__WEBPACK_IMPORTED_MODULE_9__["UIMessage"];
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBird.UIViewPort     = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIViewPort;
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBricks.UIViewPort     = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIViewPort;
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIMessage.UIViewPort     = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIViewPort;
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird.UIViewPort     = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIViewPort;
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird.UIKB     = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIKB;
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMCollide.UIViewPort     = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIViewPort;
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBirdXY.UIBird = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBird;
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBricks.UIViewPort     = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIViewPort;
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBricks.UIBricks     = _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBricks;
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UITimer.SIMTime = _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMTime;
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMCollide.SIMBird = _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird;
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBirdY.SIMBird = _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird;
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBird.SIMBird = _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird;
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIViewPort.SIMBird = _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird;
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].UIBricks.SIMBird = _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird;
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBricks.SIMBird     = _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].SIMBird;
    },

    init() {
        _SIM_SIM__WEBPACK_IMPORTED_MODULE_10__["SIM"].init();
        _UI_UI__WEBPACK_IMPORTED_MODULE_12__["UI"].init(a_canvas.width, a_canvas.height);
    }
}



/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ "./src/js/app.js");



function onResize(){
    function onResize1() {
        var h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        let a_canvas = document.getElementById('a_canvas');
        a_canvas.width = document.body.clientWidth-2;
        a_canvas.height = h-3;

        _app_js__WEBPACK_IMPORTED_MODULE_0__["app"].onResize();

    }

    onResize1();

    if (isMobileOrTablet()) {
        console.log('isMobileOrTablet onResize()');
        window.setTimeout(function() {
            onResize1();
        }, 200);
    }
}


window.addEventListener('resize', onResize, true);

window.onload = function() {
    _app_js__WEBPACK_IMPORTED_MODULE_0__["app"].intro();
};





/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map