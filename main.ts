class StopWatch {
   private duration: any;
   private status: string;
   private currentTime: any;
   private domRef: HTMLElement | null;
   private interval: any;
   constructor(wrapper: string) {
      this.domRef = document.getElementById(wrapper);
      this.duration = 0;
      this.status = 'stopped';
      if (!this.domRef) throw new Error('Does not exist');
      this.render();
   }
   private render() {
         this.domRef!.append(
            createBtn('start', () => this.start()),
            createBtn('stop', () => this.stop()),
            createBtn('reset', () => this.reset()),
         )
   }
   watch() {
      const p = document.createElement("p");
      p.id = "p";
      document.body.appendChild(p);
      document.getElementById("p")!.innerHTML = this.currentWatch();
   }
   start() {
      if(this.status === 'started') throw new Error('already started');
      this.currentTime = Date.now();
      this.status = 'started';
      this.interval =  setInterval(() => this.watch(), 100);
   }
   currentWatch() {
      this.duration = Date.now() - this.currentTime + this.duration;
      if(this.status === 'stopped') this.stop();
      return this.duration;
   }
   stop() {
      clearInterval(this.interval);
      if(this.status === 'stopped') throw new Error('already stopped');
      this.duration = Date.now() - this.currentTime + this.duration;
      this.status = 'stopped';
      return this.duration;
   }
   reset(){
      if(this.status === 'started') this.stop();
      this.duration = 0;
      document.getElementById("p")!.innerHTML = this.duration;
   }
}
function createBtn(name: string, listener: () => void) {
   const startBtn = document.createElement('button');
   startBtn.innerText = name;
   startBtn.addEventListener('click', listener);
   return startBtn;
}
(function() {
   const btns = document.getElementsByClassName('add-btn');
   btns[0].addEventListener('click', () => {
      new StopWatch(btns[0].getAttribute('data-idw') as string);
   });
})();