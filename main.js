var StopWatch = /** @class */ (function () {
    function StopWatch(wrapper) {
        this.domRef = document.getElementById(wrapper);
        this.duration = 0;
        this.status = 'stopped';
        if (!this.domRef)
            throw new Error('Does not exist');
        this.render();
        this.watch();
    }
    StopWatch.prototype.render = function () {
        var _this = this;
        this.domRef.append(createBtn('start', function () { return _this.start(); }), createBtn('stop', function () { return _this.stop(); }), createBtn('reset', function () { return _this.reset(); }));
    };
    StopWatch.prototype.watch = function () {
        var _this = this;
        var article = document.createElement("article");
        article.id = "article";
        document.body.appendChild(article);
        setInterval(function () {
            document.getElementById("article").innerHTML = _this.stop();
        }, 100);
    };
    StopWatch.prototype.start = function () {
        if (this.status === 'started')
            throw new Error('already started');
        this.currentTime = Date.now();
        this.watch();
        this.status = 'started';
    };
    StopWatch.prototype.stop = function () {
        if (this.status === 'stopped')
            throw new Error('already stopped');
        this.duration = Date.now() - this.currentTime + this.duration;
        console.log(this.duration);
        this.status = 'stopped';
        return this.duration;
    };
    StopWatch.prototype.reset = function () {
        if (this.status === 'started')
            this.stop();
        this.duration = 0;
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
