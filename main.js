var StopWatch = /** @class */ (function () {
    function StopWatch(wrapper) {
        this.duration = 0;
        this.milliSecond = 0;
        this.second = 0;
        this.minute = 0;
        this.domRef = document.getElementById(wrapper);
        this.status = 'stopped';
        if (!this.domRef)
            throw new Error('Does not exist');
        this.render();
    }
    StopWatch.prototype.render = function () {
        var _this = this;
        this.domRef.append(createBtn('start', function () { return _this.start(); }), createBtn('stop', function () { return _this.stop(); }), createBtn('reset', function () { return _this.reset(); }));
    };
    StopWatch.prototype.start = function () {
        var _this = this;
        if (this.status === 'started')
            throw new Error('already started');
        this.currentTime = Date.now();
        this.status = 'started';
        var p = document.createElement("p");
        p.id = "p";
        document.body.appendChild(p);
        this.interval = setInterval(function () {
            var _a;
            _a = _this.currentWatch(), _this.minute = _a[0], _this.second = _a[1], _this.milliSecond = _a[2];
            document.getElementById("p").innerHTML = "".concat(_this.minute, " : ").concat(_this.second, " : ").concat(_this.milliSecond);
        }, 100);
    };
    StopWatch.prototype.currentWatch = function () {
        this.duration = Date.now() - this.currentTime;
        if (this.status === 'stopped')
            this.stop();
        var minutes = Math.floor(this.duration / (1000 * 60));
        var seconds = Math.floor((this.duration % (1000 * 60)) / 1000);
        var milliSeconds = Math.floor(this.duration % 1000);
        this.minute = minutes;
        this.second = seconds;
        this.milliSecond = milliSeconds;
        return [this.minute, this.second, this.milliSecond];
    };
    StopWatch.prototype.stop = function () {
        clearInterval(this.interval);
        if (this.status === 'stopped')
            throw new Error('already stopped');
        this.duration = Date.now() - this.currentTime + this.duration;
        this.status = 'stopped';
        return this.duration;
    };
    StopWatch.prototype.reset = function () {
        if (this.status === 'started')
            this.stop();
        this.duration = 0;
        document.getElementById("p").innerHTML = this.duration.toString();
    };
    return StopWatch;
}());
function createBtn(name, listener) {
    var startBtn = document.createElement('button');
    startBtn.innerText = name;
    startBtn.addEventListener('click', listener);
    return startBtn;
}
(function () {
    var btns = document.getElementsByClassName('add-btn');
    btns[0].addEventListener('click', function () {
        new StopWatch(btns[0].getAttribute('data-idw'));
    });
})();
